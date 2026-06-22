// Jeonse-wolse conversion calculator — runs on pages that render #jeonse-calc.
(function () {
  var root = document.getElementById('jeonse-calc');
  if (!root) return;
  var cur = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
  function money(v) { return cur.format(Math.round(v || 0)); }
  var q = function (s) { return root.querySelector(s); };
  function num(s) { return parseFloat(q(s).value) || 0; }

  function computeRate() {
    var dep = num('[data-je-dep1]'), rent = num('[data-je-rent1]');
    var rate = dep > 0 ? (rent * 12 / dep * 100) : 0;
    q('[data-je-rate]').textContent = rate.toFixed(2) + '%';
  }
  function computeDep2Rent() {
    var dep = num('[data-je-dep2]'), rate = num('[data-je-rate2]');
    q('[data-je-rent2]').textContent = money(dep * (rate / 100) / 12);
  }
  function computeRent2Dep() {
    var rent = num('[data-je-rent3]'), rate = num('[data-je-rate3]');
    var dep = rate > 0 ? rent * 12 * 100 / rate : 0;
    q('[data-je-dep3]').textContent = money(dep);
  }

  root.addEventListener('input', function () { computeRate(); computeDep2Rent(); computeRent2Dep(); });
  computeRate(); computeDep2Rent(); computeRent2Dep();
})();
