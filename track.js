/* Track phone-call clicks (the primary lead channel) as a GA4 event.
   Loaded site-wide so the header, hero, call bar, footer and mobile bar
   tel: links are all captured. Mark "call_click" as a key event in GA4. */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href^="tel:"]');
  if (a && typeof window.gtag === 'function') {
    gtag('event', 'call_click', {
      event_category: 'engagement',
      event_label: a.getAttribute('href')
    });
  }
}, true);
