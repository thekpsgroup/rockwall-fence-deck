# Rockwall Fence & Deck — Business + Lead-Funnel Build

A real, buildable local company: buy the tools, buy the lumber, learn the craft, and build
high-ticket fences and decks. Paired with a no-reviews, no-social, SEO-first website whose only
job is: homeowner searches → lands on a fast page → requests a quote → you book the build.

---

## 1. Why fence & deck (it checks every box you set)

| Your requirement | How fence & deck delivers |
|---|---|
| Real service a homeowner needs | Every house with a yard eventually needs a fence or deck — new, repaired, or restained |
| Higher margin | Cedar fence **$35–$55/linear ft** (a 150-ft yard = **$5k–$8k**); decks **$30–$60/sq ft** |
| Buy the materials | Cedar pickets, posts, rails, concrete, deck boards, stain — from any lumberyard |
| Buy the machinery | Saws, post-hole auger, drills/impacts, levels — a few thousand to start |
| Teachable | Carpentry-level skills you can learn by building, plus a recurring restain line |
| You can do it | 1–2 person crew; most fences go up in 1–3 days, decks in a few days to a week |

**The market fit is strong for 75189.** Royse City / Rockwall County is a fast-growing exurb of
newer homes on bigger lots (median household income ~$75k) — lots of new backyards needing fences,
lots of bare patios wanting decks, and an endless stream of older fences hit by Texas storms.

---

## 2. The business — what it actually takes to start

### Equipment (start lean, ~$2,500–$6,000)

Circular saw + miter saw, a gas or hydraulic **post-hole auger** (or rent at first), cordless
drill/impact drivers, post level, string line, wheelbarrow + mixing tub, a generator if needed,
hand tools and safety gear. A used trailer to haul it. None of it is exotic — it's standard
carpentry kit you can buy at any home center.

### Materials per job (bought per project)

Cedar pickets, posts, rails, concrete mix and fasteners for fences; pressure-treated/cedar/composite
boards, joists, footings and flashing for decks; quality stain/sealer for restorations. You buy to
the job and mark up materials plus labor.

### The skill (what "teachable" means here)

This is learnable carpentry, not a trade school requirement. Build your own fence and a small deck
first, watch the build sequence a few times, and you'll have the core skills: setting plumb posts in
concrete, keeping a straight line, framing square and to code, hanging a gate that swings true, and
prepping/staining wood so the finish lasts. The staining/restoration line is the easiest entry point
and builds repeat customers.

### The four revenue lines (and why the mix works)

1. **Fence installation** — your flagship: highest volume of high-intent searches, $5k–$8k tickets.
2. **Fence repair** — fast, frequent, storm-driven cash jobs that fill gaps between big builds.
3. **Deck building** — biggest tickets, fewer jobs, great margin.
4. **Deck & fence staining/restoration** — low equipment, recurring every few years, keeps customers.

### Unit economics (illustrative, 150-ft cedar fence)

| Line | Amount |
|---|---|
| Revenue @ ~$45/linear ft | **~$6,750** |
| Materials (cedar, posts, concrete, fasteners) | –$2,400 |
| Equipment/consumables/haul-off | –$350 |
| **Gross before your labor** | **~$4,000 (≈60%)** |

> Numbers above are illustrative DFW-area ranges. Set your own once you price local lumber suppliers
> and your first few jobs. The website is built so prices are easy to edit.

---

## 3. The funnel logic

```
Google search ("cedar fence installation royse city")
        │
        ▼
SEO-optimized service page  ─►  every section ends in one CTA: "Get My Free Quote"
        │
        ▼
Quote request form  (name • address • service • size • photo)
        │
        ▼
Thank-you page  +  lead hits your inbox  ─►  you confirm price & book the build
```

The **form submission is the conversion event.** With address + service + size + photo, the homeowner
has self-qualified before you ever talk to them — so you quote fast and book.

**Trust without reviews/social** is carried on every page by: before/after-style project photos,
"Licensed & Insured," a written warranty, locally owned + the actual town names, transparent price
ranges, and the "posts set in concrete / built to code" quality promise.

---

## 4. Page map ("a few very good pages")

| Page | URL | Job it does | Primary keyword |
|------|-----|-------------|-----------------|
| Home | `index.html` | Frame the offer, route + embed the quote form | fence and deck builder Royse City TX |
| Fence Installation | `fence-installation.html` | Flagship, highest intent | cedar fence installation Royse City |
| Fence Repair | `fence-repair.html` | Fast storm/repair cash jobs | fence repair Rockwall County |
| Deck Building | `deck-building.html` | Biggest tickets | deck builder Royse City TX |
| Deck Staining & Restoration | `deck-staining-restoration.html` | Recurring, low-equipment line | deck staining Fate TX |
| Service Area | `service-area.html` | Capture every nearby town's "near me" search | fence company near me |
| Get a Quote | `quote.html` | Dedicated conversion page | free fence quote Royse City |
| Thank You | `thank-you.html` | Confirm + set response expectation | — |

---

## 5. SEO that moves local rankings

Geo-loaded titles & meta descriptions on every page; one clear H1; **GeneralContractor + Service
JSON-LD schema** so Google reads you as a local builder; a **service-area page** listing all
~20-mile towns as crawlable text (how you rank for "near me" across Fate, Rockwall, Heath, Wylie,
Caddo Mills, etc.); fast, mobile-first, lightweight CSS for good Core Web Vitals; plus `sitemap.xml`
+ `robots.txt`.

---

## 6. The quote form (conversion mechanics)

Fields, easy → committing: name, phone, email, address, city (service-area dropdown), service
(checkboxes), approx. size, how soon, **photo upload**, notes. Photos let you ballpark before the
visit. Honeypot anti-spam, required-field validation, mobile-friendly. Submits to a no-backend
handler (Formspree / Web3Forms free tier) → lands in your email → redirects to the thank-you page.

---

## 7. What's in this build

Deployable static site (host free on Netlify, Vercel, or Cloudflare Pages — drag-and-drop): all 8
pages above + `styles.css`, `sitemap.xml`, `robots.txt`, and a `README.md` with the 15-minute
go-live checklist. **Placeholders to replace before launch:** business name, phone, email, prices,
and the form endpoint — all marked and listed in the README.
