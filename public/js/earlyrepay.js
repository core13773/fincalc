// Early repayment fee calculator — runs on pages that render #earlyrepay-calc.
// Fee = principal × rate × (remaining term / total term).
(function () {
  var root = document.getElementById('earlyrepay-calc');
  if (!root) return;
  var cur = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
  var q = function (s) { return root.querySelector(s); };
  function num(s) { return parseFloat(q(s).value) || 0; }

  function compute() {
    var p = num('[data-er-principal]');
    var term = num('[data-er-term]');
    var elapsed = num('[data-er-elapsed]');
    var rate = num('[data-er-rate]');
    var remaining = Math.max(0, term - elapsed);
    var ratio = term > 0 ? remaining / term : 0;
    var fee = p * (rate / 100) * ratio;
    q('[data-er-fee]').textContent = cur.format(Math.round(fee));
  }

  root.addEventListener('input', compute);
  compute();
})();
