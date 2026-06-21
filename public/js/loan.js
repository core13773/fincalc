// Loan calculator — runs on pages that render #loan-calc.
// Plain JS (no bundling) so it always ships to the browser.
(function () {
  var root = document.getElementById('loan-calc');
  if (!root) return;

  var locale = root.dataset.locale || 'en-US';
  function fmt(cur) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: cur,
      maximumFractionDigits: 0,
    });
  }

  var q = function (sel) { return root.querySelector(sel); };
  var amountEl = q('[data-amount]');
  var rateEl = q('[data-rate]');
  var yearsEl = q('[data-years]');
  var currencyEl = q('[data-currency]');
  var symbolEl = q('[data-symbol]');
  var monthlyEl = q('[data-monthly]');
  var totalEl = q('[data-total]');
  var interestEl = q('[data-interest]');
  var barPrincipal = q('[data-bar-principal]');
  var barInterest = q('[data-bar-interest]');
  var pctPrincipal = q('[data-pct-principal]');
  var pctInterest = q('[data-pct-interest]');

  var SYMBOLS = {
    USD: '$', KRW: '₩', EUR: '€', JPY: '¥', CNY: '¥', GBP: '£',
    AUD: 'A$', CAD: 'C$', CHF: 'CHF', HKD: 'HK$', SGD: 'S$', INR: '₹',
  };

  function compute() {
    var cur = currencyEl.value;
    symbolEl.textContent = SYMBOLS[cur] || cur;
    var f = fmt(cur);

    var P = parseFloat(amountEl.value) || 0;
    var annual = parseFloat(rateEl.value) || 0;
    var years = parseFloat(yearsEl.value) || 0;
    var n = Math.max(0, years) * 12;
    var r = annual / 100 / 12;

    var monthly = 0;
    if (n > 0) monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    var total = monthly * n;
    var interest = Math.max(0, total - P);

    monthlyEl.textContent = isFinite(monthly) && monthly > 0 ? f.format(monthly) : '—';
    totalEl.textContent = f.format(isFinite(total) ? total : 0);
    interestEl.textContent = f.format(isFinite(interest) ? interest : 0);

    var pPct = total > 0 ? (P / total) * 100 : 0;
    var iPct = Math.max(0, 100 - pPct);
    barPrincipal.style.width = pPct + '%';
    barInterest.style.width = iPct + '%';
    pctPrincipal.textContent = pPct.toFixed(0) + '%';
    pctInterest.textContent = iPct.toFixed(0) + '%';
  }

  root.addEventListener('input', compute);
  root.addEventListener('submit', function (e) { e.preventDefault(); compute(); });
  var resetBtn = q('[data-reset]');
  if (resetBtn) resetBtn.addEventListener('click', function () { root.reset(); compute(); });

  compute();
})();
