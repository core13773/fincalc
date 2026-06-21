// Dividend & yield calculator — runs on pages that render #dividend-calc.
(function () {
  var root = document.getElementById('dividend-calc');
  if (!root) return;
  var locale = root.dataset.locale || 'en-US';
  function nf(v, dec) { return new Intl.NumberFormat(locale, { maximumFractionDigits: dec == null ? 0 : dec }).format(v || 0); }
  var q = function (s) { return root.querySelector(s); };
  function num(s) { return parseFloat(q(s).value) || 0; }

  function compute() {
    var price = num('[data-div-price]');
    var per = num('[data-div-pershare]');
    var shares = num('[data-div-shares]');
    var yld = price > 0 ? (per / price) * 100 : 0;
    var total = per * shares;
    q('[data-div-yield]').textContent = nf(yld, 2) + '%';
    q('[data-div-total]').textContent = nf(total, 0);
  }

  root.addEventListener('input', compute);
  compute();
})();
