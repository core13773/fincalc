// DSR (Debt-Service Ratio) calculator — runs on pages that render #dsr-calc.
// DSR = (monthly P&I × 12) / annual income × 100.
(function () {
  var root = document.getElementById('dsr-calc');
  if (!root) return;
  var q = function (s) { return root.querySelector(s); };

  function compute() {
    var income = parseFloat(q('[data-dsr-income]').value) || 0;
    var repay = parseFloat(q('[data-dsr-repay]').value) || 0;
    var dsr = income > 0 ? (repay * 12 / income) * 100 : 0;
    q('[data-dsr-val]').textContent = dsr.toFixed(1) + '%';

    var assess;
    if (income <= 0) assess = '—';
    else if (dsr < 30) assess = '안정';
    else if (dsr < 40) assess = '보통';
    else if (dsr < 50) assess = '주의';
    else assess = '과도 (대출 제한 가능)';
    q('[data-dsr-assess]').textContent = assess;
  }

  root.addEventListener('input', compute);
  compute();
})();
