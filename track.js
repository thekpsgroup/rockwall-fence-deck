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

/* Mobile menu toggle */
(function () {
  var btn = document.querySelector('.navtoggle');
  if (!btn) return;
  var header = btn.closest('header.site');
  if (!header) return;
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  header.querySelectorAll('.menu-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
