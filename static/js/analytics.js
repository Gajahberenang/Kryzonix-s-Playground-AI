/* Consent-gated, first-party analytics. No identifiers or cookies are sent. */
(function () {
  function sendPageview() {
    if (localStorage.getItem('kryzonix-analytics-consent') !== 'accepted') return;
    var payload = JSON.stringify({ path: location.pathname, referrer: document.referrer || '' });
    try {
      if (navigator.sendBeacon) navigator.sendBeacon('/api/analytics', new Blob([payload], { type: 'application/json' }));
      else fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true });
    } catch (_) {}
  }
  function decide(value) {
    localStorage.setItem('kryzonix-analytics-consent', value);
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.hidden = true;
    if (value === 'accepted') sendPageview();
  }
  window.kryzonixAnalytics = { start: sendPageview };
  var banner = document.getElementById('cookie-banner');
  if (banner && !localStorage.getItem('kryzonix-analytics-consent')) banner.hidden = false;
  var accept = document.getElementById('cookie-accept');
  var reject = document.getElementById('cookie-reject');
  if (accept) accept.addEventListener('click', function (event) { event.preventDefault(); event.stopPropagation(); decide('accepted'); });
  if (reject) reject.addEventListener('click', function (event) { event.preventDefault(); event.stopPropagation(); decide('rejected'); });
  if (localStorage.getItem('kryzonix-analytics-consent') === 'accepted') sendPageview();
})();
