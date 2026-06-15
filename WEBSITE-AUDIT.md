# Rockwall Fence & Deck Website Audit

Date: 2026-06-14

Scope: full repo review of the static marketing site, quote funnel, API handler, SEO files, schema, accessibility, visual hierarchy, lead generation, copy, performance, and maintainability.

## Verification Performed

- Reviewed all root HTML pages: `index.html`, service pages, `service-area.html`, `quote.html`, `privacy.html`, `thank-you.html`, and `404.html`.
- Reviewed shared assets and support files: `styles.css`, `form-enhance.js`, `track.js`, `api/send-quote.js`, `robots.txt`, `sitemap.xml`, `vercel.json`, `README.md`, and `LAUNCH-CHECKLIST.md`.
- Ran internal link/file existence check: no missing local href/src/action targets found among 216 local references.
- Parsed JSON-LD blocks: all detected JSON-LD blocks parse successfully.
- Ran `npx --yes html-validate "*.html"`: 232 HTML validation errors.
- Ran `npx --yes prettier --check "*.html" "*.css" "*.js" "api/*.js"`: formatting issues in 14 files.
- Ran `npm audit --omit=dev`: 0 known production dependency vulnerabilities.
- Captured rendered desktop/mobile screenshots with Playwright for the homepage, quote page, and service-area page.
- Ran partial Pa11y accessibility checks: quote page returned 10 color-contrast errors; index check timed out; service-area run failed due a transient npx dependency issue.

## Executive Summary

The site has a solid local-service funnel foundation: clear phone-first CTA, service-specific pages, real project imagery on the homepage, sitemap/robots files, JSON-LD, thank-you conversion tracking, and a working serverless form path. The largest gaps are not one catastrophic failure but a stack of issues that can hurt conversion, trust, local SEO, accessibility, and long-term maintainability.

Highest-impact gaps:

- Mobile navigation disappears entirely under 860px, leaving users with no service-area/service-page navigation unless they scroll to the footer or use sticky CTAs.
- Quote form marks service as required visually, but checkbox selection is not actually required by browser validation or server validation.
- The form handler redirects to thank-you even when email delivery is impossible or Resend returns an error, so broken lead delivery looks successful to the visitor and to analytics.
- CTA orange fails WCAG AA contrast in automated testing.
- Most service pages have titles over recommended length.
- Local SEO is thin beyond one service-area list; there are no individual town/service landing pages or deeper neighborhood proof.
- Business trust is borrowed from i30 Builders rather than Rockwall Fence & Deck-specific reviews, photos, address signals, team/process proof, or Google Business Profile proof.
- Schema is present but shallow and inconsistent; quote page, breadcrumbs, reviews, images, and offers are missing.
- A large unused `fences/` folder contains multi-megabyte original assets that should not ship if deployed.
- The site is highly duplicated across pages, making updates to navigation, footer, schema, phone, and CTAs error-prone.

## Critical Lead-Generation Issues

- The visitor can submit the quote form without selecting any service even though the UI shows `What do you need? *`.
  - Seen in `index.html` and `quote.html`.
  - Checkbox groups do not support native `required` on the group the way the current markup is written.
  - Server accepts empty `service` and simply omits the row.
- The API silently redirects to `/thank-you.html` when `RESEND_API_KEY` is missing.
  - This prevents visitor abandonment, but it hides a broken lead pipeline.
  - The thank-you page then fires `generate_lead`, creating false conversion data.
- The API logs Resend errors but still redirects to thank-you.
  - A failed email send can be counted as a successful lead.
  - There is no durable fallback storage, retry queue, backup notification, or admin alert.
- There is no server-side validation for required fields.
  - The browser enforces `name`, `phone`, `email`, and `city`, but the API trusts submitted data.
  - Bot/scripted submissions can send incomplete or malformed leads.
- There is no rate limiting or abuse protection on `/api/send-quote`.
  - Honeypot helps low-effort spam only.
  - No IP throttling, Turnstile/reCAPTCHA, per-field sanity check, or attachment MIME validation beyond browser-side `accept`.
- The API attaches files using user-provided filenames without sanitizing them.
  - This is not necessarily exploitable through Resend, but it is poor hygiene.
- File validation is weak server-side.
  - Busboy limits count and size, but the server does not verify MIME type, extension, or content signature before forwarding attachments.
- The form does not include consent language near the submit button for calls/texts.
  - If SMS follow-up is used, TCPA-friendly wording should be added.
- There is no explicit "text us" link despite thank-you copy saying "Call or text us anytime."
  - Phone links are `tel:` only; no `sms:` option.
- The phone-first strategy depends on a monitored line.
  - Launch checklist notes this, but the site itself has no after-hours expectation or response-time fallback.
- There is no persistent desktop sticky CTA after the hero.
  - Mobile has sticky CTAs; desktop relies on header and repeated section CTAs.
- The homepage embedded form asks for less project detail than the dedicated quote page.
  - This lowers friction, but creates lower-quality leads and can force follow-up.
  - Consider whether the embedded form should capture timeline/size/address or intentionally remain short.
- No lead source or page attribution is submitted with the form.
  - The email does not tell whether the lead came from the homepage form or quote page.
  - Add hidden `source_page`, UTM fields, landing page, and referrer capture.
- No call-tracking number or dynamic call source attribution is configured.
  - GA4 tracks tel clicks, but actual calls are not tied to booked jobs.
- No thank-you page next-step funnel beyond call/back-home.
  - Could add "send more photos", "what happens next", "save our number", or "expect a call from..." without adding much friction.
- No clear emergency/storm-damage CTA on fence repair.
  - Fence repair page mentions storms but does not create a faster path for urgent post-storm leads.

## Visual Design and UI Gaps

- The homepage desktop first screen is strong overall, but the quote card's bottom form note is extremely low contrast and nearly invisible on white.
  - In screenshot, `We only use your info to send your estimate.` appears faint enough to look disabled.
- Native file input styling looks unfinished compared with the rest of the polished form.
  - The `Choose Files` control breaks the custom UI language.
- Mobile header hides all navigation below 860px.
  - Users cannot access service pages or service area from the top nav on phones.
  - Only brand remains, plus bottom sticky call/free-estimate CTAs.
- There is no mobile menu/hamburger.
  - This is the most obvious mobile UX omission.
- Mobile homepage places a long hero before the embedded form.
  - The form is present, but users must scroll past headline, trust bullets, two CTAs, and the fastline.
  - This may be acceptable for phone-first conversion but weaker for users who prefer forms.
- The mobile sticky CTA overlaps the visual bottom area and consumes vertical space.
  - This is expected for sticky CTA patterns but should be tested against all pages and form fields.
- On the quote page mobile sticky CTA only shows call, not "Free estimate."
  - Since the user is already on the quote page, this is logical, but it removes a secondary action like "Submit" or "Start form."
- The service pages use hero background images but no inline project visuals below the fold.
  - Compared with the homepage gallery, service pages feel text/table heavy.
- Service pages have repetitive layouts and weak visual differentiation.
  - Fence install, fence repair, deck build, and staining all follow almost the same sections.
  - This can make the brand feel templated.
- The "How We Build It" heading is inaccurate on the deck staining page.
  - Staining/restoration is not built; "How We Restore It" or "Our Restoration Process" would fit.
- The brand mark is simple and recognizable but generic.
  - It does not strongly distinguish Rockwall Fence & Deck from any other green contractor brand.
- Color palette is functional but narrow.
  - Green/navy/orange works for construction/local service, but the site leans heavily on the same colors and could use more material texture, wood tones, or project-photo-led sections.
- Button border radius is very pill-shaped.
  - This is a brand choice, but it can feel more SaaS-like than contractor-like.
- Homepage trust strip is visually slim and easy to miss.
  - Important social proof is present but not strongly integrated into the hero.
- The star characters are text glyphs, not a review widget or richer proof.
  - This can appear less credible.
- Several sections use inline styles for layout adjustments instead of reusable classes.
  - This is a code issue but also creates visual consistency risk.
- Footer is functional but generic.
  - No service area map, hours, license/insurance detail, Google profile link, or stronger local proof.
- No map or geographic visual on service-area page.
  - A town list is useful for SEO but less persuasive visually.
- No before/after comparisons.
  - For fences, deck restoration, and repairs, before/after images would likely improve trust and conversion.
- No close-up craftsmanship shots.
  - The copy claims posts, fasteners, flashing, concrete, etc., but the visuals do not show these details.
- No "real crew / truck / jobsite" visual proof.
  - The site relies on project photos and i30 trust, but not operational legitimacy cues.
- No visible financing/payment options if offered.
  - If not offered, no issue; if offered, it is a missing conversion lever.

## UX and Information Architecture Gaps

- Mobile users lose top-level navigation.
  - Add a compact menu or expose at least Services and Service Area.
- Header nav has no active state.
  - Users cannot tell what page they are on from the nav.
- Service pages do not cross-link deeply enough.
  - Example: fence installation mentions staining extends life but does not strongly route to deck/fence staining.
- No breadcrumbs.
  - Helpful for users and schema.
- No page-level "related services" sections on service pages except the footer.
  - Good for SEO and internal linking.
- Quote page form could be more progressive.
  - A long single form on mobile creates vertical fatigue.
  - Consider grouped steps or visual grouping if conversion drops.
- Select placeholder text uses `Select...`, but city is required.
  - Works technically, but could be more action-oriented: "Choose your city".
- City dropdown includes many towns but no text input fallback besides "Other nearby."
  - If "Other nearby" is selected, there is no required field to say where.
- ZIP is optional.
  - For service validation and routing, ZIP may be more useful than city.
- Property address is optional.
  - This is lower friction but limits accurate estimates.
- No FAQ search or "not sure?" option.
  - For fence repair/restoration, homeowners may not know which service to choose.
- No "repair vs replace" decision aid beyond copy.
  - A simple section could reduce hesitation.
- No pricing caveat around tear-out, permits, terrain, utilities, HOA, staining, steel posts, or material volatility beyond broad notes.
- No "what we do not do" boundaries.
  - Helps avoid poor-fit leads.
- No hours of operation.
- No response time specificity beyond "usually same day."
  - Good promise, but not anchored to business hours.
- No direct Google Business Profile link.
- No reviews page or review modal/source link.
- No clickable project gallery/lightbox.
  - Homepage images are static and do not lead to proof/detail pages.
- No individual project pages/case studies.
  - Missed SEO and trust opportunity.
- No visible accessibility affordances for skip navigation.
- No sitemap link in footer.
  - Not essential, but useful for users and crawl discovery.

## Copy and Messaging Gaps

- The brand name says Rockwall, but the hero leads with Royse City.
  - This may be intentional because business is based in Royse City, but it creates a small positioning tension.
  - Consider clarifying "based in Royse City, serving Rockwall County."
- Repeated "usually the same day" appears across many pages.
  - Strong promise, but repetition can feel templated.
  - Needs operational confidence and possibly a business-hours qualifier.
- "Most jobs start the next week" is a strong promise.
  - If scheduling varies seasonally, the claim could become risky.
- "Insured" and "written warranty" are repeated but not substantiated.
  - No insurance certificate language, warranty length, warranty exclusions, or what is covered.
- Reviews are for i30 Builders, not Rockwall Fence & Deck.
  - The site discloses this, but it is weaker than service-specific reviews.
- One review names "Karson."
  - If the brand strategy is company-first, this brings individual/founder dependency back into the copy.
- "5.0 on Google · 7 reviews for i30 Builders" is low review volume.
  - It is still proof, but it should not carry too much trust weight alone.
- No unique value proposition beyond common contractor claims.
  - Quality materials, insured, local, written estimates, posts in concrete are good but expected.
- No sharper proof of craftsmanship.
  - Examples: post depth, steel-post option, fastener type, gate bracing detail, cleanup standards.
- No customer objections section.
  - Common objections: price uncertainty, HOA, property lines, permits, mess, timeline, warranties, old fence disposal.
- No seasonal urgency messaging.
  - Texas storm season, summer deck use, spring fence replacement, pre-sale curb appeal.
- No "why not hire the cheapest fence crew" section beyond brief phrasing.
  - Could be persuasive if kept professional.
- Deck staining page copy says "How We Build It."
  - Terminology mismatch.
- Service pages do not include enough local place names in body copy beyond broad area.
  - Local SEO could benefit from natural mentions by page.
- No guarantee details.
  - "Written warranty" is strong but vague.
- No mention of materials brands, stain brands, or options.
  - If true and defensible, this can improve trust.
- No financing, deposits, payment methods, or scheduling expectations.
- No "free estimate" qualifier.
  - Does free estimate require site visit? Is it always free within service area?
- Privacy policy is simple and readable, but not legal-grade.
  - It may be fine for a small local business, but should be reviewed if using ads, SMS, or remarketing.

## SEO Gaps

- Several page titles exceed common SERP display guidance.
  - `deck-building.html`: 95 characters.
  - `deck-staining-restoration.html`: 77 characters.
  - `fence-installation.html`: 81 characters.
  - `fence-repair.html`: 99 characters.
  - `service-area.html`: 99 characters.
- Several meta descriptions are long.
  - `index.html`: 167 characters.
  - `quote.html`: 170 characters.
  - `fence-installation.html`: 161 characters.
  - These may truncate in search results.
- No clean URLs.
  - `vercel.json` has `"cleanUrls": false`, so public URLs use `.html`.
  - This is not fatal, but `/fence-installation` reads cleaner and is easier to share.
- Service-area SEO is a single town list, not a structured local landing strategy.
  - No pages for `fence company Rockwall TX`, `fence builder Fate TX`, `deck builder Royse City TX`, etc.
- No blog/resource content.
  - Missed long-tail searches: fence cost, HOA rules, cedar vs pine, steel posts, deck permits, stain timing.
- No project/case-study pages.
  - Missed image SEO, local proof, and long-tail content.
- No image sitemap.
  - Useful because project photos are a trust/SEO asset.
- No `robots` allowance issue found, but `thank-you.html` is disallowed and also noindexed.
  - That is fine; redundant but acceptable.
- `privacy.html` is noindexed.
  - This is acceptable, but some businesses prefer indexed legal pages for trust.
- `404.html` and `thank-you.html` lack meta descriptions.
  - Not important for indexing because they are noindex/non-content pages.
- No `sitemap.xml` entries for `privacy.html`, `404.html`, or `thank-you.html`.
  - Fine for thank-you/404; privacy exclusion is a choice.
- `lastmod` values are all the same date.
  - Fine now, but they need maintenance after content changes.
- No hreflang.
  - Not needed unless adding Spanish pages.
- No Spanish-language landing pages.
  - Potential missed local market opportunity in DFW-area home services.
- No canonical root redirect strategy visible beyond canonical tags.
  - Need deployed verification for non-www, http, trailing slash, and `.html`/clean variants.
- No Open Graph per-page imagery.
  - All pages use `og.png`; service-specific social sharing would be stronger with relevant job photos.
- No Twitter title/description tags.
  - `twitter:card` and image are present, but title/description fall back.
- No `meta name="robots"` on normal pages.
  - Not required; default index/follow is fine.
- No `author`, `publisher`, or `article` content.
  - Not necessary for core local-service pages.
- Internal linking anchor text is basic.
  - "Learn more" and "See..." links could be more keyword-rich in some contexts.
- The homepage H1 targets Royse City; title targets Royse City; domain/brand targets Rockwall.
  - This can be okay, but keyword strategy should be deliberate.
- No embedded Google Map or NAP-rich contact section.
  - Helpful for local trust and NAP consistency.
- No explicit business hours in HTML or schema.
- No `sameAs` for Google Business Profile, Facebook, Instagram, Yelp, Angi, Nextdoor, or BBB if those exist.
- No review schema.
  - Only add if reviews are first-party and comply with Google structured data rules; do not fake aggregate ratings.
- FAQ schema exists on pages.
  - Google shows FAQ rich results less often now, but it is still structured content.
- FAQ content duplicates price claims across pages.
  - If pricing changes, multiple snippets must be updated.

## Schema and Structured Data Gaps

- Home page has `GeneralContractor` and `FAQPage`, which is a good start.
- Service pages use `Service` and `FAQPage`, but service providers are embedded minimal objects instead of consistently referencing the home `@id`.
- Service page provider objects lack `@id`.
  - Use `"@id": "https://www.rockwallfenceanddeck.com/#business"` consistently.
- Quote page has no JSON-LD.
  - Could include `ContactPage` or `WebPage` with `potentialAction`.
- Privacy, thank-you, and 404 have no JSON-LD.
  - Not critical.
- No `WebSite` schema.
  - Could identify site name, URL, publisher, and potential search action if relevant.
- No `LocalBusiness`-style opening hours.
  - `GeneralContractor` can include `openingHoursSpecification`.
- No `hasMap`.
- No `paymentAccepted`.
- No `foundingDate` or business history.
  - Only add if real.
- No `makesOffer` / `OfferCatalog` for services.
- No `ServiceChannel` or contact point data.
- No `ContactPoint` for sales/quotes.
- No `BreadcrumbList`.
- No `ImageObject` metadata for gallery images.
- No `VideoObject`; there are no videos.
- No `AggregateRating` or `Review` schema.
  - Do not add unless review source and policy compliance are confirmed.
- `priceRange` is `"$$$"`, which may imply premium.
  - That may be intentional, but it should align with positioning.
- Home schema `legalName` and `alternateName` are both `i30 Builders`.
  - This could confuse entity identity if Rockwall Fence & Deck is a DBA/service brand.
- The visible site says "Rockwall Fence & Deck is a service of i30 Builders"; schema says `legalName: i30 Builders`.
  - This is probably truthful, but entity strategy should be deliberate for Google Business Profile consistency.
- `areaServed` is an array of strings.
  - Better structured as `City` or `Place` objects for important locations.
- Geo coordinates are provided for Royse City generally, not necessarily a public business address.
  - If there is no storefront, be careful with exact geo/location claims.
- No `address.streetAddress`.
  - Fine for service-area business if hiding address, but GBP consistency matters.
- No `@graph` structure.
  - Current isolated scripts work, but `@graph` would reduce duplication and strengthen entity links.

## Accessibility Gaps

- Pa11y found 10 contrast errors on `quote.html`.
  - Orange CTA background `#c1632a` with white text is about 4.13:1, below WCAG AA's 4.5:1 for normal text.
  - Required asterisks using the same orange also fail contrast.
- The form note on the homepage quote card is visibly too low contrast.
  - It may be caused by white text inherited in the hero context or insufficient override.
- No skip-to-content link.
- Mobile navigation is hidden rather than converted to an accessible menu.
- Labels are present visually, but most controls also use `aria-label`.
  - This is not harmful, but redundant; ensure accessible names match visible labels.
- Checkbox group lacks `fieldset` and `legend`.
  - This would improve screen-reader grouping for "What do you need?"
- Required checkbox group is not programmatically required.
- Native file input is accessible but visually inconsistent.
- Focus-visible styling exists, which is good.
- `summary` focus is covered, which is good.
- Inline SVG icons generally use `aria-hidden="true"`, which is good.
- The favicon SVG has `role="img"` and `aria-label`; fine for the standalone SVG file.
- Color is used for required asterisks and status-like trust ticks.
  - Text also communicates meaning, so this is mostly acceptable.
- No reduced-motion media query.
  - Hover transforms are small, but adding `prefers-reduced-motion` is easy.
- No explicit language alternatives.
  - English-only is declared with `lang="en"`.
- The mobile sticky CTA can interfere with users zooming or navigating form fields on small screens.
  - Needs manual keyboard/mobile testing.
- Some headings may create repetitive structure but one H1 per page is correct.
- Tables use plain `<table>` with header cells, but validator recommends adding `<tbody>`.
- Phone number non-breaking formatting fails html-validate.
  - This is not a screen-reader blocker, but line breaks in phone numbers can hurt readability.

## Performance Gaps

- The site is static and likely fast, but several optimization gaps remain.
- Homepage gallery uses JPGs instead of WebP versions where WebP exists.
  - Example: `cedar-board-on-board-privacy-fence.jpg` is 421.9 KB while WebP exists at 255.2 KB.
  - `horizontal-cedar-fence-gate.jpg` is 428.1 KB while WebP exists at 252.5 KB.
  - `cedar-privacy-fence-steel-posts.jpg` is 319.9 KB while WebP exists at 164.5 KB.
  - `composite-deck-cable-rail.jpg` is 314.2 KB while WebP exists at 159 KB.
- Hero background images use CSS background images.
  - CSS backgrounds cannot expose `alt` text and are harder to optimize with `srcset`.
  - Preload helps, but responsive image selection is limited.
- No responsive image `srcset`/`sizes`.
  - Mobile users may download larger images than needed.
- No AVIF assets.
  - WebP is good, AVIF could reduce size further.
- Google Fonts add external render dependency.
  - Preconnect is present, but self-hosting or system fallback could improve resilience.
- Google Analytics loads on every page.
  - Expected, but it adds third-party JS.
- No lazy loading issue found on homepage gallery; images use `loading="lazy"`.
- Hero image preloads are present, which is good.
- `fences/` folder contains very large original images.
  - Examples: `fences/fences (1).jpeg` is 5.9 MB; `fences/fences (1).png` is 3.0 MB.
  - If deployed, these waste storage and can be accidentally linked/crawled.
- Generated screenshots should not be committed or deployed.
  - Temporary audit screenshots were created during review and should be removed after audit.
- No build step means no minification.
  - Fine for a small site, but CSS/HTML/JS are unminified.
- No compression config visible.
  - Vercel handles gzip/brotli for static assets, but this is host-dependent if moved.
- No cache busting for `styles.css`, `form-enhance.js`, or `track.js`.
  - Long cache headers only target extensions including CSS, but without hashed filenames, immutable CSS can cause stale styling after updates.
  - `vercel.json` sets `Cache-Control: immutable` for CSS and images.
  - This is risky for `styles.css` unless filenames are versioned.
- Cache header regex does not include `.js`.
  - JS may not receive the same long caching as CSS/images.
- Cache header applies immutable to SVG and CSS.
  - Fine for fingerprinted assets, risky for mutable root assets.
- No `Content-Security-Policy`.
  - Security/performance issue more than speed.

## Code Quality and Maintainability Gaps

- Heavy duplication across every HTML file.
  - Header, footer, GA script, font links, icons, nav, mobile CTA, schema patterns, and CTAs are repeated.
  - This makes global updates error-prone.
- No templating/build system.
  - This keeps deployment simple but increases maintenance cost as pages grow.
- Many inline styles.
  - html-validate reports inline-style errors across all pages.
  - Inline styles make consistency and responsive tuning harder.
- Prettier formatting check fails in all HTML files, CSS, JS, and API JS.
  - Formatting is inconsistent and hard to diff.
- No npm scripts.
  - `package.json` lacks `lint`, `format`, `validate`, `test`, or local server scripts.
- No automated tests.
  - No form handler unit tests, schema validation tests, link tests, or smoke tests.
- No CI configuration.
  - Formatting, HTML validation, and link checks can regress silently.
- API handler is CommonJS, which is fine for Vercel Node functions but should match project conventions if expanded.
- No environment variable example file.
  - README documents env vars, but `.env.example` would reduce setup mistakes.
- No shared constants for phone/email/domain.
  - Changing phone/domain requires global search/replace.
- No shared city/service list.
  - City dropdown duplicated in `index.html` and `quote.html`; service area list exists separately.
- Homepage and quote forms differ.
  - This may be intentional, but keeping field names and validation aligned matters.
- HTML comments still say `SET YOUR FORM ENDPOINT`.
  - The endpoint is already set to `/api/send-quote`; comment reads like unfinished setup.
- Documentation references images that do not appear to exist.
  - Launch checklist mentions `images/cedar-deck-railing-sunset.jpg` and `images/modern-composite-deck.jpg`, but current files use `composite-deck-cable-rail` and `stained-cedar-deck-tree`.
- README says "including up to 4 photos"; UI/API allow up to 2 photos.
  - `form-enhance.js` uses `MAX_FILES = 2`; Busboy limit is `files: 2`.
- API comment says "up to 4 photos" in README, conflicting with implementation.
- No explicit Node engine in `package.json`.
  - Current local Node is v24; Vercel runtime may differ.
- No lockfile issue found; `package-lock.json` exists.
- `node_modules/` exists locally and is ignored.
- `.vercel/` exists locally; should remain ignored if not already.
- No TypeScript or static typing for API.
  - Acceptable for small handler, but validation would matter more.
- No server-side logging strategy beyond `console.error`.
- No durable audit trail for leads.
- No spam classification.
- No tests for photo downscaling fallback.

## HTML Validation Findings

`html-validate` reported 232 errors. Main categories:

- Long title tags on five pages.
- Inline styles across all pages.
- Phone numbers should use non-breaking spaces/hyphens to avoid awkward wrapping.
- Repeated checkbox `name="service"` flagged as duplicate form control names.
  - For checkbox groups this can be intentional, but should be reviewed and potentially configured/structured.
- Tables should wrap rows in `<tbody>`.

Specific title-length findings:

- `deck-building.html`: 95 characters.
- `deck-staining-restoration.html`: 77 characters.
- `fence-installation.html`: 81 characters.
- `fence-repair.html`: 99 characters.
- `service-area.html`: 99 characters.

## Security and Privacy Gaps

- No Content Security Policy.
  - Site includes inline scripts and third-party GA, so CSP requires care, but adding one would reduce XSS risk.
- Inline scripts make CSP harder.
  - GA snippets and thank-you lead event are inline.
- No Permissions-Policy header.
- No Strict-Transport-Security header in `vercel.json`.
  - Add only after HTTPS is confirmed for all domains.
- `X-Frame-Options: SAMEORIGIN` is present.
- `X-Content-Type-Options: nosniff` is present.
- `Referrer-Policy: strict-origin-when-cross-origin` is present.
- No CSRF protection on the form endpoint.
  - For a lead form, risk is mostly spam/abuse, but origin checks can help.
- No origin/referrer validation.
- No bot rate limiting.
- No server-side HTML email escaping issue found for field values; `escapeHtml` is used.
- Email subject includes `fields.name` without escaping.
  - Email subject header injection is unlikely through Resend's API, but sanitize/control characters anyway.
- Attachments are forwarded to email without content scanning.
- Privacy policy mentions Google Analytics cookies but no cookie banner/consent management.
  - In Texas/US local service context this may be acceptable, but ads/remarketing or broader compliance needs review.
- No data retention period specifics beyond "as long as we need."
- No mention of uploaded photo handling/security.

## Analytics and Measurement Gaps

- GA4 is installed on every page.
- Phone click tracking is present through `track.js`.
- Thank-you page fires `generate_lead`, but this can overcount because API redirects there even on backend failure.
- No form-start, form-submit-attempt, form-validation-error, or upload events.
- No page source/UTM persistence into lead emails.
- No scroll/depth tracking.
- No click tracking for quote CTA buttons besides phone calls.
- No call outcome tracking.
- No Google Ads conversion snippet, enhanced conversions, or consent mode visible.
- No Search Console verification tag in HTML.
  - Search Console can be verified another way, so this is only a gap if not configured.
- No analytics environment guard.
  - Local/dev visits can hit production GA if pages are opened in browser.
- `track.js` assumes `gtag` exists.
  - It checks `typeof window.gtag === 'function'`, which is good.
- Thank-you inline script calls `gtag` without checking that it exists.
  - If GA fails to load, this can throw a JS error.

## Local Trust and Proof Gaps

- No Google Business Profile embed/link.
- No Rockwall Fence & Deck-specific review count.
- Reviews are not linked to source.
- No review dates.
- No customer city/project context tied to reviews.
- No proof of insurance beyond claim.
- No warranty terms.
- No photos of crew, trucks, signage, or in-progress work.
- No "locally owned" story beyond a phrase.
- No physical address beyond Royse City, TX 75189.
  - This may be intentional for a service-area business.
- No business hours.
- No service radius map.
- No contractor registration/license explanation.
  - Checklist says "Licensed" intentionally never mentioned; site should still avoid implying licensed where not applicable.
- No affiliations, supplier brands, or material certifications.
- No project count or years of experience claim.
  - Only add if accurate.

## Page-Specific Findings

### `index.html`

- Strong hero and CTA hierarchy.
- Embedded quote form is useful.
- Form service checkbox group is visually required but not programmatically required.
- Form note is nearly invisible in rendered desktop screenshot.
- Native file input looks unpolished.
- Trust bar relies on i30 Builders reviews, not Rockwall Fence & Deck reviews.
- Review section contains a personal-name review that may dilute company-first branding.
- Recent-work gallery is good, but images are not linked to case studies or larger views.
- Gallery uses JPGs despite available WebP alternatives.
- FAQ schema is present and parses.
- Long meta description may truncate.
- The homepage duplicates quote-page form logic without centralization.

### `quote.html`

- Good dedicated conversion page.
- Pa11y found 10 contrast failures, mostly orange CTAs and required asterisks.
- Long form on mobile may create friction.
- No programmatic requirement for service checkbox group.
- No consent language for SMS/calls.
- No source attribution hidden fields.
- No schema.
- Meta description is long.
- Sticky mobile CTA only calls; this is fine but should be intentional.

### `fence-installation.html`

- Title is too long.
- Good pricing table and FAQ coverage.
- Could better distinguish cedar grades, steel posts, rot board, cap/trim, HOA handling, property lines, and utility marking.
- No inline gallery or install-detail photos.
- Service schema provider should reference business `@id`.
- "How We Build It" fits this page.

### `fence-repair.html`

- Title is too long.
- Storm-damage positioning is present but not urgent enough for a high-intent repair search.
- Could include "send photos for fast quote" more prominently above the fold.
- Could include before/after repair photos.
- Could include repair-vs-replace checklist.
- Service schema provider should reference business `@id`.

### `deck-building.html`

- Title is too long.
- Good code/framing message.
- Needs more permit/process detail for deck builds.
- Needs deck material comparison section if targeting composite/wood searches.
- Needs stronger project visuals beyond hero.
- Service schema provider should reference business `@id`.

### `deck-staining-restoration.html`

- Title is too long.
- Section heading "How We Build It" is wrong for staining/restoration.
- Strong opportunity for before/after photos is missing.
- Could mention stain brands/products if accurate.
- Could explain weather windows, drying time, and prep limits.
- Service schema provider should reference business `@id`.

### `service-area.html`

- Title is too long.
- Town list is useful but thin.
- No map, county grouping, driving radius visual, or local proof by town.
- No individual town landing pages.
- No FAQ addressing whether towns outside radius are covered.
- Schema is present but could use structured `Place` objects.

### `privacy.html`

- Clear and readable.
- Noindexed; acceptable but a strategic choice.
- Mentions GA cookies but no consent mode/cookie preference mechanism.
- Does not deeply cover uploaded photos, SMS/call consent, or data deletion specifics.

### `thank-you.html`

- Noindex is correct.
- Fires `generate_lead`, but script does not check whether `gtag` exists.
- Conversion can be false-positive because API redirects to thank-you on failure.
- Good call CTA.
- Could add "send additional photos" or "save our number."

### `404.html`

- Noindex is correct.
- Useful recovery links.
- No mobile sticky CTA.
- Inline styles and validator errors.

## Asset and Repository Hygiene Gaps

- `fences/` appears to contain original or unused image drops.
  - These are large and not referenced by current pages.
  - If not needed, remove from deployable repo or move outside public root.
- Temporary audit screenshots should not be deployed or committed.
- `images/README.md` is useful, but documentation should be kept aligned with real assets.
- `og.png` is present and correctly sized at 1200x630.
- Icons are present.
- No favicon `.ico`.
  - SVG/PNG coverage is usually fine.
- No `site.webmanifest`.
  - Not required, but useful for installable/mobile polish.

## Deployment and Infrastructure Gaps

- `vercel.json` sets `cleanUrls: false`.
  - Reconsider if cleaner public URLs are desired.
- Cache policy marks CSS immutable without filename hashing.
  - This can make style changes appear stale after deploys.
- JS files are not included in the long-cache header pattern.
- No explicit redirects from non-www to www in repo.
  - May be configured in Vercel domain settings; verify live.
- No explicit redirects from `/index.html` to `/`.
- No explicit redirects from clean paths to `.html` or vice versa.
- No HSTS header.
- No CSP header.
- No custom 404 routing verification in Vercel config.
  - Static `404.html` often works, but verify live.
- `.vercelignore` exists but was not fully audited in this pass.
- `.vercel/` local directory exists; ensure it is not committed.

## Documentation Gaps

- README says "including up to 4 photos"; implementation allows 2.
- Launch checklist references deck stock images that do not match current filenames.
- README still includes generic setup language for replacing the business name/domain even though this appears to be the actual project.
- Launch checklist has checked items that still need live verification by the business.
- No troubleshooting section for missing Resend env vars.
- No documented test command because no npm scripts exist.
- No documented local dev server command in `package.json`.
- No documented deployment verification checklist for live canonical/redirect/schema checks.

## Recommended Priority Order

1. Fix lead integrity:
   - Make service selection truly required.
   - Add server-side validation.
   - Stop counting/email failures as successful leads without an alert or fallback.
   - Add lead source/UTM/referrer fields.

2. Fix accessibility and visible polish:
   - Darken CTA orange or adjust text size/weight to pass contrast.
   - Fix invisible form note.
   - Add mobile nav.
   - Style file input.
   - Add fieldset/legend for checkbox groups.

3. Fix SEO basics:
   - Shorten titles/descriptions.
   - Add breadcrumbs and schema.
   - Clean up entity schema and business identity.
   - Add stronger local proof and GBP links.

4. Improve conversion proof:
   - Replace borrowed trust with Rockwall-specific reviews over time.
   - Add before/after photos, project details, warranty terms, hours, and service-area map.

5. Improve maintainability:
   - Remove inline styles.
   - Add `npm` scripts for format, validate, link check, and smoke checks.
   - Consider a lightweight static generator/template partials if the site will keep growing.

6. Clean deployment hygiene:
   - Remove unused large assets from deploy path.
   - Revisit immutable caching for mutable CSS.
   - Add security headers after testing.

