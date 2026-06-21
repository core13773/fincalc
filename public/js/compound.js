// Compound interest calculator — runs on pages that render #compound-calc.
(function () {
  var root = document.getElementById('compound-calc');
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
  var principalEl = q('[data-principal]');
  var monthlyEl = q('[data-monthly]');
  var rateEl = q('[data-rate]');
  var yearsEl = q('[data-years]');
  var currencyEl = q('[data-currency]');
  var symbolEl = q('[data-symbol]');
  var symbolMonthlyEl = q('[data-symbol-monthly]');
  var balanceOut = q('[data-balance]');
  var contributedOut = q('[data-contributed]');
  var interestOut = q('[data-interest]');
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
    var sym = SYMBOLS[cur] || cur;
    symbolEl.textContent = sym;
    symbolMonthlyEl.textContent = sym;
    var f = fmt(cur);

    var P = parseFloat(principalEl.value) || 0;
    var PMT = parseFloat(monthlyEl.value) || 0;
    var annual = parseFloat(rateEl.value) || 0;
    var years = parseFloat(yearsEl.value) || 0;
    var n = Math.max(0, years) * 12;
    var r = annual / 100 / 12;

    var fvPrincipal = P * Math.pow(1 + r, n);
    var fvContrib = r === 0 ? PMT * n : PMT * ((Math.pow(1 + r, n) - 1) / r);
    var balance = fvPrincipal + fvContrib;
    var contributed = P + PMT * n;
    var interest = balance - contributed;

    balanceOut.textContent = isFinite(balance) ? f.format(balance) : '—';
    contributedOut.textContent = f.format(isFinite(contributed) ? contributed : 0);
    interestOut.textContent = f.format(isFinite(interest) ? interest : 0);

    var pPct = balance > 0 ? (contributed / balance) * 100 : 0;
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
