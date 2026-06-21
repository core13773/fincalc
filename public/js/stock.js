// Stock average-cost & ROI calculator — runs on pages that render #stock-calc.
(function () {
  var root = document.getElementById('stock-calc');
  if (!root) return;
  var locale = root.dataset.locale || 'en-US';
  function nf(v, dec) { return new Intl.NumberFormat(locale, { maximumFractionDigits: dec == null ? 0 : dec }).format(v || 0); }
  var q = function (s) { return root.querySelector(s); };
  function num(sel) { return parseFloat(q(sel).value) || 0; }

  function computeAvg() {
    var held = num('[data-st-held]');
    var heldAvg = num('[data-st-heldavg]');
    var buy = num('[data-st-buy]');
    var buyPrice = num('[data-st-buyprice]');
    var totalCost = held * heldAvg + buy * buyPrice;
    var totalSh = held + buy;
    var newAvg = totalSh > 0 ? totalCost / totalSh : 0;
    q('[data-st-newavg]').textContent = nf(newAvg, 2);
    q('[data-st-totalsh]').textContent = nf(totalSh, 0);
    q('[data-st-totalcost]').textContent = nf(totalCost, 0);
  }

  function computeRoi() {
    var bp = num('[data-st-bp]');
    var sp = num('[data-st-sp]');
    var sh = num('[data-st-sh]');
    var invested = bp * sh;
    var profit = (sp - bp) * sh;
    var roi = invested > 0 ? (profit / invested) * 100 : 0;
    var sign = profit > 0 ? '+' : '';
    q('[data-st-roi]').textContent = sign + nf(roi, 2) + '%';
    q('[data-st-profit]').textContent = (profit < 0 ? '-' : '') + nf(Math.abs(profit), 0);
  }

  root.addEventListener('input', function () { computeAvg(); computeRoi(); });
  computeAvg();
  computeRoi();
})();
