// Savings (적금) calculator — runs on pages that render #savings-calc.
// Month-end deposits (ordinary annuity), monthly compounding, optional interest tax.
(function () {
  var root = document.getElementById('savings-calc');
  if (!root) return;
  var locale = root.dataset.locale || 'en-US';
  function nf(v) { return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v || 0); }
  var q = function (s) { return root.querySelector(s); };
  function num(s) { return parseFloat(q(s).value) || 0; }

  function compute() {
    var pmt = num('[data-sav-monthly]');
    var rate = num('[data-sav-rate]');
    var n = num('[data-sav-months]');
    var tax = num('[data-sav-tax]');
    var r = rate / 100 / 12;

    var fv = r === 0 ? pmt * n : pmt * ((Math.pow(1 + r, n) - 1) / r);
    var principal = pmt * n;
    var interest = fv - principal;
    var afterTax = principal + interest * (1 - tax / 100);

    q('[data-sav-principal]').textContent = nf(principal);
    q('[data-sav-interest]').textContent = nf(interest);
    q('[data-sav-maturity]').textContent = nf(afterTax);
  }

  root.addEventListener('input', compute);
  compute();
})();
