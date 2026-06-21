// Severance pay calculator (Korea) — runs on pages that render #severance-calc.
// Simplified: severance = (annual salary / 12) × years of service.
(function () {
  var root = document.getElementById('severance-calc');
  if (!root) return;
  var cur = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
  function fmt(v) { return cur.format(Math.round(v || 0)); }
  var q = function (s) { return root.querySelector(s); };
  var salaryEl = q('[data-sev-salary]');
  var startEl = q('[data-sev-start]');
  var endEl = q('[data-sev-end]');
  var MS = 86400000;
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  function compute() {
    var salary = parseFloat(salaryEl.value) || 0;
    var start = startEl.value ? new Date(startEl.value + 'T00:00:00') : null;
    var end = endEl.value ? new Date(endEl.value + 'T00:00:00') : null;
    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      q('[data-sev-amount]').textContent = '—';
      return;
    }
    var days = Math.max(0, Math.round((end.getTime() - start.getTime()) / MS));
    var years = days / 365;
    var monthly = salary / 12;
    var amount = monthly * years;

    q('[data-sev-amount]').textContent = fmt(amount);
    q('[data-sev-monthly]').textContent = fmt(monthly);

    var fullY = Math.floor(days / 365);
    var remDays = days - fullY * 365;
    var fullM = Math.floor(remDays / 30);
    q('[data-sev-years]').textContent = fullY + '년 ' + fullM + '개월';
  }

  // Defaults: start ~5 years ago, end today
  if (!startEl.value) { var t0 = new Date(); startEl.value = (t0.getFullYear() - 5) + '-' + pad(t0.getMonth() + 1) + '-' + pad(t0.getDate()); }
  if (!endEl.value) { var t1 = new Date(); endEl.value = ymd(t1); }

  root.addEventListener('input', compute);
  compute();
})();
