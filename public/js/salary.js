// Korean net-salary calculator — runs on pages that render #salary-calc.
// 2024/2025 rates. Estimates take-home after 근로소득세·지방소득세·4대보험.
(function () {
  var root = document.getElementById('salary-calc');
  if (!root) return;

  var dataEl = document.getElementById('salary-data');
  var config = dataEl ? JSON.parse(dataEl.textContent || '{}') : {};
  var C = config.const || {};
  var bands = config.bands || [];
  var cur = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
  function fmt(v) { return cur.format(Math.round(v || 0)); }

  var q = function (s) { return root.querySelector(s); };
  var grossEl = q('[data-sal-gross]');
  var nontaxEl = q('[data-sal-nontax]');
  var depEl = q('[data-sal-dep]');

  function earnedIncomeDeduction(g) {
    g = Math.max(0, g);
    if (g <= 5000000) return g * 0.7;
    if (g <= 15000000) return 3500000 + (g - 5000000) * 0.4;
    if (g <= 45000000) return 7500000 + (g - 15000000) * 0.15;
    if (g <= 100000000) return 12000000 + (g - 45000000) * 0.05;
    if (g <= 200000000) return 14750000 + (g - 100000000) * 0.02;
    return Math.min(16750000, 20000000);
  }

  function taxCredit(t) {
    if (t <= 700000) return t * 0.55;
    return 385000 + (t - 700000) * 0.3;
  }

  function progressiveTax(base) {
    var tax = 0, prev = 0;
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i];
      if (base > prev) { tax += (Math.min(base, b.up) - prev) * b.rate; prev = b.up; }
      else break;
    }
    return tax;
  }

  function compute() {
    var gross = Math.max(0, parseFloat(grossEl.value) || 0);
    var nontax = Math.max(0, parseFloat(nontaxEl.value) || 0);
    var dep = Math.max(1, parseInt(depEl.value, 10) || 1);

    var totalGross = Math.max(0, gross - nontax);
    var deduction = earnedIncomeDeduction(totalGross);
    var earnedIncome = Math.max(0, totalGross - deduction);
    var personal = (C.personalDeduction || 1500000) * dep;
    var taxBase = Math.max(0, earnedIncome - personal);

    var computedTax = progressiveTax(taxBase);
    var credit = taxCredit(computedTax);
    var incomeTax = Math.max(0, computedTax - credit);
    var localTax = incomeTax * (C.localTaxRate || 0.1);

    var monthly = totalGross / 12;
    var npensionBase = Math.min(monthly, C.npensionMonthlyCap || 6170000);
    var npension = npensionBase * (C.npensionRate || 0.045) * 12;
    var health = monthly * (C.healthRate || 0.03545) * 12;
    var longterm = health * (C.longtermRate || 0.1295);
    var employment = monthly * (C.empRate || 0.009) * 12;
    var insurance = npension + health + longterm + employment;

    var totalDeduction = incomeTax + localTax + insurance;
    var netAnnual = gross - incomeTax - localTax - insurance;
    var netMonthly = netAnnual / 12;

    q('[data-sal-net]').textContent = fmt(netAnnual);
    q('[data-sal-monthly]').textContent = fmt(netMonthly);
    q('[data-sal-ded]').textContent = fmt(totalDeduction);
    q('[data-sal-income]').textContent = fmt(incomeTax);
    q('[data-sal-local]').textContent = fmt(localTax);
    q('[data-sal-npension]').textContent = fmt(npension);
    q('[data-sal-health]').textContent = fmt(health);
    q('[data-sal-longterm]').textContent = fmt(longterm);
    q('[data-sal-emp]').textContent = fmt(employment);
  }

  root.addEventListener('input', compute);
  compute();
})();
