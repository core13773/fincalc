// Korean year-end tax settlement estimator — runs on pages that render #yeartax-calc.
// Simplified: refund = tax paid - tax due. Reuses the 근로소득공제 / progressive / credit model.
(function () {
  var root = document.getElementById('yeartax-calc');
  if (!root) return;
  var dataEl = document.getElementById('yt-data');
  var config = dataEl ? JSON.parse(dataEl.textContent || '{}') : {};
  var bands = config.bands || [];
  var cur = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
  function fmt(v) { return cur.format(Math.round(v || 0)); }
  var q = function (s) { return root.querySelector(s); };
  function num(s) { return parseFloat(q(s).value) || 0; }

  function eid(g) {
    g = Math.max(0, g);
    if (g <= 5e6) return g * 0.7;
    if (g <= 15e6) return 3.5e6 + (g - 5e6) * 0.4;
    if (g <= 45e6) return 7.5e6 + (g - 15e6) * 0.15;
    if (g <= 100e6) return 12e6 + (g - 45e6) * 0.05;
    if (g <= 200e6) return 14.75e6 + (g - 100e6) * 0.02;
    return Math.min(16.75e6, 20e6);
  }
  function taxCredit(t) { return t <= 7e5 ? t * 0.55 : 385000 + (t - 7e5) * 0.3; }
  function progressive(base) {
    var tax = 0, prev = 0;
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i];
      if (base > prev) { tax += (Math.min(base, b.up) - prev) * b.rate; prev = b.up; }
      else break;
    }
    return tax;
  }

  function compute() {
    var gross = num('[data-yt-gross]');
    var dep = Math.max(1, Math.round(num('[data-yt-dep]')));
    var pension = num('[data-yt-pension]');
    var paid = num('[data-yt-paid]');

    var earned = Math.max(0, gross - eid(gross));
    var personal = 1500000 * dep;
    var taxBase = Math.max(0, earned - personal - pension);
    var computed = progressive(taxBase);
    var due = Math.max(0, computed - taxCredit(computed));
    var refund = paid - due;

    q('[data-yt-due]').textContent = fmt(due);
    var r = q('[data-yt-refund]');
    if (refund >= 0) r.textContent = fmt(refund) + ' (환급)';
    else r.textContent = fmt(-refund) + ' (추징)';
  }

  root.addEventListener('input', compute);
  compute();
})();
