# Launch checklist — Rockwall Fence & Deck

Work top to bottom. The **Before you go live** items can silently break leads or make
claims that aren't true, so don't skip them.

## Before you go live

- [ ] **Connect the lead form (Resend).** In Vercel → Project → Settings → Environment
      Variables, add `RESEND_API_KEY`. Optional: `LEAD_TO_EMAIL` (defaults to
      Karson@thekpsgroup.com) and `LEAD_FROM_EMAIL`. Redeploy after adding.
- [ ] **Test the form end-to-end.** Submit a real quote on the deployed site (with a photo)
      and confirm the email lands in your inbox. ⚠️ If `RESEND_API_KEY` is missing the
      visitor still sees the thank-you page — a broken form looks identical to a working one,
      so you must test it.
- [ ] **Phone is answered.** The whole site pushes "call us." Make sure (469) 887-1100 rings
      to a real, monitored line.
- [x] **Claims verified.** "Insured" and "written warranty" are accurate and shown on the
      site. "Licensed" is intentionally never mentioned (not licensed).
      Confirm they're accurate before publishing.
- [ ] **Prices match your costs.** The displayed ranges are set slightly above budget crews —
      confirm they're profitable and match what you'll actually quote. (Edit the price tables
      on each service page and the FAQ numbers if needed.)
- [ ] **Domain + DNS.** Register/point `rockwallfenceanddeck.com` at Vercel (use the `www`
      host — canonicals, sitemap and OG tags all use `https://www.rockwallfenceanddeck.com`).
- [ ] **Branded sender email.** In Resend, verify `rockwallfenceanddeck.com`, then set
      `LEAD_FROM_EMAIL` to `Rockwall Fence & Deck <quotes@rockwallfenceanddeck.com>`
      (otherwise leads come from `onboarding@resend.dev`).

## Right after launch

- [ ] **Google Business Profile.** Highest-impact move for "fence company near me" / Maps.
      Create/claim it, add photos, set the service area. (Free.)
- [ ] **Google Search Console.** Add the property and submit `sitemap.xml`.
- [ ] **Confirm Google Analytics is recording.** GA4 tag `G-FR49CR66EB` is installed on every
      page; the thank-you page fires a `generate_lead` event. In GA4 → Admin → Events, mark
      `generate_lead` as a **key event (conversion)** so you can measure leads.
- [ ] **Replace the stock deck photos.** `images/cedar-deck-railing-sunset.jpg` and
      `images/modern-composite-deck.jpg` are licensed stock used only as deck-page hero
      backgrounds. Swap in your own deck jobs when you have them, and you can promote real
      photos into the homepage "Recent Work" gallery. (See `images/README.md`.)

## Good to know

- **Photo uploads** are auto-shrunk in the browser (`form-enhance.js`) to stay under Vercel's
  ~4.5 MB request limit; the form accepts up to 2 photos. If anything fails it submits anyway,
  so a lead is never lost.
- **Privacy policy** lives at `privacy.html` (linked in the footer). Required if you run
  Google Ads.
- The site is plain static HTML/CSS — edit any text directly, no build step.
