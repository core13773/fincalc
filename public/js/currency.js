// Currency converter — runs on pages that render #currency-calc.
// Live rates from open.er-api.com (no key). Auto-refreshes every 60s while the
// tab is visible, shows the source's last-update time, and keeps the last good
// rate on a temporary fetch error. Bundled reference rates are the SSR/fallback.
(function () {
  var root = document.getElementById('currency-calc');
  if (!root) return;

  var dataEl = document.getElementById('cc-data');
  var config = dataEl ? JSON.parse(dataEl.textContent || '{}') : {};
  var locale = config.locale || 'en-US';
  var fallback = config.fallback || {};
  var labels = config.labels || {};

  var q = function (sel) { return root.querySelector(sel); };
  var amountEl = q('[data-amount]');
  var fromEl = q('[data-from]');
  var toEl = q('[data-to]');
  var symbolEl = q('[data-symbol]');
  var resultEl = q('[data-result]');
  var rateEl = q('[data-rate]');
  var inverseEl = q('[data-inverse]');
  var statusEl = q('[data-status]');

  var SYMBOLS = {
    USD: '$', KRW: '₩', EUR: '€', JPY: '¥', CNY: '¥', GBP: '£',
    AUD: 'A$', CAD: 'C$', CHF: 'CHF', HKD: 'HK$', SGD: 'S$', INR: '₹',
  };

  function rateValue(rates, from, to) {
    var f = rates[from] || fallback[from];
    var t = rates[to] || fallback[to];
    if (!f || !t) return NaN;
    return (1 / f) * t;
  }

  function fmtCur(val, code, max) {
    if (!isFinite(val)) return '—';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: max == null ? 2 : max,
    }).format(val);
  }

  var timeFmt;
  try {
    timeFmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });
  } catch (e) {
    timeFmt = new Intl.DateTimeFormat(locale);
  }
  function fmtTime(s) {
    if (!s) return '';
    var d = new Date(s);
    if (isNaN(d.getTime())) return '';
    return timeFmt.format(d);
  }

  function setStatus(text, live) {
    statusEl.textContent = text;
    statusEl.setAttribute('data-live', live ? '1' : '0');
  }

  var currentRates = fallback;
  var liveOk = false; // have we ever received live rates?

  function render(rates) {
    var from = fromEl.value;
    var to = toEl.value;
    var amount = parseFloat(amountEl.value) || 0;

    symbolEl.textContent = SYMBOLS[from] || from;

    var rate = rateValue(rates, from, to);
    var inverse = rate ? 1 / rate : NaN;
    var result = amount * rate;

    resultEl.textContent = fmtCur(result, to, to === 'JPY' ? 0 : 2);
    rateEl.textContent = '1 ' + from + ' = ' + fmtCur(rate, to, 4);
    inverseEl.textContent = '1 ' + to + ' = ' + fmtCur(inverse, from, 4);
  }

  function loadLive() {
    // Only show a "refreshing" state before the very first successful load
    // (avoids flicker on silent background refreshes).
    if (!liveOk && labels.loading) setStatus(labels.loading, false);

    return fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.rates) {
          currentRates = data.rates;
          liveOk = true;
          render(currentRates);
          var t = fmtTime(data.time_last_update_utc);
          setStatus((labels.livePrefix || '') + (t || '') + (labels.liveSuffix || ''), true);
        } else {
          onLiveFail();
        }
      })
      .catch(onLiveFail);
  }

  function onLiveFail() {
    if (liveOk) {
      // Keep showing the last good live rate; flag a temporary issue.
      render(currentRates);
      setStatus(labels.stale || '', true);
    } else {
      // Never received live rates — show bundled reference rates.
      render(fallback);
      setStatus(labels.fallback || '', false);
    }
  }

  // Input handlers
  root.addEventListener('input', function () { render(currentRates); });
  var swapBtn = q('[data-swap]');
  if (swapBtn) swapBtn.addEventListener('click', function () {
    var f = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = f;
    render(currentRates);
  });

  // Remember last-used currencies (localStorage)
  try {
    var saved = JSON.parse(localStorage.getItem('fincalc:cc') || '{}');
    if (saved.from && Array.from(fromEl.options).some(function (o) { return o.value === saved.from; })) fromEl.value = saved.from;
    if (saved.to && Array.from(toEl.options).some(function (o) { return o.value === saved.to; })) toEl.value = saved.to;
  } catch (e) {}
  function saveCc() { try { localStorage.setItem('fincalc:cc', JSON.stringify({ from: fromEl.value, to: toEl.value })); } catch (e2) {} }
  fromEl.addEventListener('change', saveCc);
  toEl.addEventListener('change', saveCc);

  // Initial render (reference rates) + first live fetch
  render(fallback);
  loadLive();

  // Auto-refresh every 60s, paused while the tab is hidden.
  var REFRESH_MS = 60000;
  var timer = null;
  function startTimer() { stopTimer(); timer = setInterval(loadLive, REFRESH_MS); }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopTimer();
    } else {
      loadLive();
      startTimer();
    }
  });
  startTimer();
})();
