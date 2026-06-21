// Currency converter — runs on pages that render #currency-calc.
// Live rates from open.er-api.com with bundled fallback for SSR/offline.
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

  var currentRates = fallback;

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

  root.addEventListener('input', function () { render(currentRates); });
  var swapBtn = q('[data-swap]');
  if (swapBtn) swapBtn.addEventListener('click', function () {
    var f = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = f;
    render(currentRates);
  });

  function loadLive() {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.rates) {
          currentRates = data.rates;
          render(currentRates);
          statusEl.textContent = labels.live || '';
          statusEl.setAttribute('data-live', '1');
        } else {
          statusEl.textContent = labels.fallback || '';
          statusEl.setAttribute('data-live', '0');
        }
      })
      .catch(function () {
        statusEl.textContent = labels.fallback || '';
        statusEl.setAttribute('data-live', '0');
      });
  }

  render(fallback);
  loadLive();
})();
