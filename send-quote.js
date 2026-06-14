// Serverless function: receives the quote form and emails the lead via Resend.
// Required env var (set in Vercel → Settings → Environment Variables):
//   RESEND_API_KEY   - your Resend API key (secret)
// Optional env vars:
//   LEAD_TO_EMAIL    - where leads are sent (default below)
//   LEAD_FROM_EMAIL  - verified Resend sender (default: Resend onboarding sender)

const Busboy = require("busboy");
const { Resend } = require("resend");

const TO_DEFAULT = "Karson@thekpsgroup.com";
// Until you verify your domain in Resend, this onboarding sender works to your own account email.
// After verifying rockwallfenceanddeck.com in Resend, set LEAD_FROM_EMAIL to e.g.
//   "Rockwall Fence & Deck <quotes@rockwallfenceanddeck.com>"
const FROM_DEFAULT = "Rockwall Fence & Deck <onboarding@resend.dev>";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }

  try {
    const { fields, files } = await parseMultipart(req);

    // Honeypot — if a bot filled the hidden field, pretend success and drop it.
    if (fields._gotcha) return redirect(res, "/thank-you.html");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("send-quote: RESEND_API_KEY is not set");
      return redirect(res, "/thank-you.html");
    }

    const to = process.env.LEAD_TO_EMAIL || TO_DEFAULT;
    const from = process.env.LEAD_FROM_EMAIL || FROM_DEFAULT;
    const resend = new Resend(apiKey);

    const services = []
      .concat(fields.service || [])
      .filter(Boolean)
      .join(", ");

    const rows = [
      ["Name", fields.name],
      ["Phone", fields.phone],
      ["Email", fields.email],
      ["Address", fields.address],
      ["City", fields.city],
      ["ZIP", fields.zip],
      ["Service(s)", services],
      ["Approx. size", fields.size],
      ["Timeline", fields.timeline],
      ["Notes", fields.notes],
    ].filter(([, v]) => v && String(v).trim());

    const html =
      '<h2 style="font-family:Arial,sans-serif">New quote request — Rockwall Fence &amp; Deck</h2>' +
      '<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">' +
      rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold;border-bottom:1px solid #eee">${k}</td>` +
            `<td style="border-bottom:1px solid #eee">${escapeHtml(String(v))}</td></tr>`
        )
        .join("") +
      "</table>" +
      (files.length
        ? `<p style="font-family:Arial,sans-serif;color:#555">${files.length} photo(s) attached.</p>`
        : "");

    const attachments = files.slice(0, 4).map((f) => ({
      filename: f.filename,
      content: f.content.toString("base64"),
    }));

    const payload = {
      from,
      to,
      subject: `New quote request${fields.name ? " — " + fields.name : ""}`,
      html,
    };
    if (fields.email) payload.replyTo = fields.email;
    if (attachments.length) payload.attachments = attachments;

    const { error } = await resend.emails.send(payload);
    if (error) console.error("send-quote: Resend error", error);

    return redirect(res, "/thank-you.html");
  } catch (err) {
    console.error("send-quote: handler error", err);
    // Never strand the visitor — send them to the thank-you page either way.
    return redirect(res, "/thank-you.html");
  }
};

function redirect(res, location) {
  res.statusCode = 303;
  res.setHeader("Location", location);
  res.end();
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    let bb;
    try {
      bb = Busboy({
        headers: req.headers,
        limits: { fileSize: 4 * 1024 * 1024, files: 4 }, // 4 MB/file, up to 4 files
      });
    } catch (e) {
      return reject(e);
    }

    const fields = {};
    const files = [];

    bb.on("field", (name, val) => {
      if (fields[name] !== undefined) {
        fields[name] = [].concat(fields[name], val);
      } else {
        fields[name] = val;
      }
    });

    bb.on("file", (_name, stream, info) => {
      const chunks = [];
      let tooBig = false;
      stream.on("data", (d) => chunks.push(d));
      stream.on("limit", () => {
        tooBig = true;
      });
      stream.on("end", () => {
        if (!tooBig && chunks.length) {
          files.push({
            filename: (info && info.filename) || "photo",
            content: Buffer.concat(chunks),
          });
        }
      });
    });

    bb.on("close", () => resolve({ fields, files }));
    bb.on("error", reject);

    req.pipe(bb);
  });
}
