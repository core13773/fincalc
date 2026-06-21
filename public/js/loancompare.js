// Loan repayment method comparison — runs on pages that render #loancompare-calc.
(function () {
  var root = document.getElementById('loancompare-calc');
  if (!root) return;
  var locale = root.dataset.locale || 'en-US';
  function nf(v) { return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(v || 0)); }
  var q = function (s) { return root.querySelector(s); };
  function num(s) { return parseFloat(q(s).value) || 0; }

  function compute() {
    var P = num('[data-lc-amount]');
    var annual = num('[data-lc-rate]');
    var years = num('[data-lc-years]');
    var n = Math.max(0, years) * 12;
    var r = annual / 100 / 12;

    // Equal P&I (원리금균등)
    var eqiM = n > 0 ? (r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0;
    var eqiTotal = eqiM * n;
    var eqiInterest = Math.max(0, eqiTotal - P);

    // Equal principal (원금균등): first-month payment + total interest
    var eqpFirst = n > 0 ? P / n + P * r : 0;
    var eqpInterest = P * r * (n + 1) / 2;

    // Bullet (만기일시): interest only each month, principal at maturity
    var bulletM = P * r;
    var bulletInterest = P * r * n;

    q('[data-lc-eqi-m]').textContent = nf(eqiM);
    q('[data-lc-eqi-i]').textContent = nf(eqiInterest);
    q('[data-lc-eqi-t]').textContent = nf(eqiTotal);

    q('[data-lc-eqp-m]').textContent = nf(eqpFirst);
    q('[data-lc-eqp-i]').textContent = nf(eqpInterest);
    q('[data-lc-eqp-t]').textContent = nf(P + eqpInterest);

    q('[data-lc-bullet-m]').textContent = nf(bulletM);
    q('[data-lc-bullet-i]').textContent = nf(bulletInterest);
    q('[data-lc-bullet-t]').textContent = nf(P + bulletInterest);
  }

  root.addEventListener('input', compute);
  compute();
})();
