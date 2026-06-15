# Rockwall Fence & Deck — Go-Live Guide

A complete, deployable lead-funnel website for a fence & deck business.
No build step, no framework — just static HTML/CSS you can host free.

## Files

```
index.html                         Home (offer + embedded quote form)
fence-installation.html            Flagship service page
fence-repair.html                  Service page
deck-building.html                 Service page
deck-staining-restoration.html     Service page
service-area.html                  Local-SEO town list
quote.html                         Dedicated quote form
thank-you.html                     Post-submit confirmation (fires GA4 generate_lead event)
404.html                           Friendly not-found page
privacy.html                       Privacy policy (linked in footer)
styles.css                         Shared styles
form-enhance.js                    Shrinks photos in-browser before upload
favicon.svg / og.png               Browser icon + social-share image (+ icon-*.png, apple-touch-icon.png)
images/                            "Recent Work" project photos (web-optimized)
api/send-quote.js                  Serverless quote-form handler (emails leads via Resend)
sitemap.xml / robots.txt           SEO crawl files
vercel.json                        Caching & security-header config
.gitignore                         Ignores node_modules, .env, original photo drops
LAUNCH-CHECKLIST.md                Step-by-step go-live checklist
PLAN.md                            Business + funnel strategy
```

Google Analytics (GA4 `G-FR49CR66EB`) is installed on every page. See **LAUNCH-CHECKLIST.md**
for the full go-live steps.

## 15-minute go-live checklist

1. **Set your business name, phone & email.** Find/replace across all files:
   - `Rockwall Fence & Deck` → your business name
   - `(469) 887-1100` and `+14698871100` → your phone
   - `quotes@rockwallfenceanddeck.com` → your email
   - `rockwallfenceanddeck.com` → your real domain

2. **Connect the quote form (Resend).**
   The forms POST to a serverless function at `api/send-quote.js`, which emails leads via Resend.
   - Create an account at **resend.com** and generate an **API key**.
   - In Vercel → your project → **Settings → Environment Variables**, add:
     - `RESEND_API_KEY` = your Resend key (required)
     - `LEAD_TO_EMAIL` = inbox for leads (optional; defaults to sales@i30builders.com)
     - `LEAD_FROM_EMAIL` = verified sender (optional; defaults to Resend's onboarding sender)
   - Redeploy so the env vars take effect.
   - For a branded "from" address, verify `rockwallfenceanddeck.com` in Resend (add the DNS records
     in Vercel → Domains), then set `LEAD_FROM_EMAIL` to
     `Rockwall Fence & Deck <quotes@rockwallfenceanddeck.com>`.
   - Submissions (including up to 2 photos) are emailed to you; the visitor is sent to `thank-you.html`.

3. **Edit the prices.** The price tables on each service page use DFW-area ranges as placeholders.
   Update them once you've priced local lumber suppliers and your first few jobs.

4. **Deploy (drag-and-drop, free).**
   - **Netlify:** drag this folder onto app.netlify.com/drop → live in seconds.
   - or **Cloudflare Pages** / **Vercel** — same idea.
   - Point your domain at it in the host's dashboard.

5. **Tell Google you exist.** Add the site to **Google Search Console** and submit `sitemap.xml`.

## Notes

- Add real **before/after project photos** as you complete jobs — on a no-reviews/no-social funnel,
  your photos are the trust. Drop them into the service pages where you like.
- The site is mobile-first and fast by design (good for local SEO Core Web Vitals).
- Everything is plain HTML — edit any text directly, no tools needed.
- This is a fresh, clean folder; the earlier `royse-city-pro-wash` folder from prior directions
  can be deleted.
