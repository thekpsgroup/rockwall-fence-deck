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
thank-you.html                     Post-submit confirmation
styles.css                         Shared styles
sitemap.xml / robots.txt           SEO crawl files
PLAN.md                            Business + funnel strategy
```

## 15-minute go-live checklist

1. **Set your business name, phone & email.** Find/replace across all files:
   - `Rockwall Fence & Deck` → your business name
   - `(469) 887-1100` and `+14698871100` → your phone
   - `quotes@rockwallfenceanddeck.com` → your email
   - `rockwallfenceanddeck.com` → your real domain

2. **Connect the quote form (this is what makes it work).**
   The form needs a handler to email you submissions. Easiest free option:
   - Create a free account at **Formspree.io** (or **Web3Forms.com**) — both support file/photo uploads.
   - Copy your form endpoint and replace `https://formspree.io/f/YOUR_FORM_ID` in
     `index.html` and `quote.html` (marked with a `▼ SET YOUR FORM ENDPOINT ▼` comment).
   - Submissions, including photos, will land in your inbox; the visitor is sent to `thank-you.html`.

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
