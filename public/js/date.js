// Date / D-day calculator — runs on pages that render #date-calc.
(function () {
  var root = document.getElementById('date-calc');
  if (!root) return;

  var dataEl = document.getElementById('date-data');
  var config = dataEl ? JSON.parse(dataEl.textContent || '{}') : {};
  var locale = config.locale || 'en-US';
  var labels = config.labels || {};
  var MS = 86400000;

  var q = function (s) { return root.querySelector(s); };
  var targetEl = q('[data-date-target]');
  var ddayLabel = q('[data-dday-label]');
  var ddayDays = q('[data-dday-days]');
  var fromEl = q('[data-date-from]');
  var toEl = q('[data-date-to]');
  var diffDays = q('[data-diff-days]');
  var diffWeeks = q('[data-diff-weeks]');
  var diffYmd = q('[data-diff-ymd]');
  var baseEl = q('[data-add-base]');
  var amountEl = q('[data-add-amount]');
  var unitEl = q('[data-add-unit]');
  var addResult = q('[data-add-result]');

  var fullFmt = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  function parse(s) { if (!s) return null; var d = new Date(s + 'T00:00:00'); return isNaN(d.getTime()) ? null : d; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function todayStr() { var t = new Date(); return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); }
  function offsetStr(days) { var t = new Date(); t.setDate(t.getDate() + days); return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); }
  function sub(tmpl, y, mo, da) { return tmpl.replace('{y}', y).replace('{mo}', mo).replace('{da}', da); }

  function computeDday() {
    var t = parse(targetEl.value);
    if (!t) { ddayLabel.textContent = '—'; ddayDays.textContent = ''; return; }
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var days = Math.round((t.getTime() - today.getTime()) / MS);
    if (days === 0) { ddayLabel.textContent = 'D-day'; ddayDays.textContent = ''; }
    else if (days > 0) { ddayLabel.textContent = 'D-' + days; ddayDays.textContent = days + ' ' + (labels.daysUntil || ''); }
    else { ddayLabel.textContent = 'D+' + -days; ddayDays.textContent = -days + ' ' + (labels.daysAgo || ''); }
  }

  function ymdBetween(a, b) {
    var from = a <= b ? a : b;
    var to = a <= b ? b : a;
    var y = to.getFullYear() - from.getFullYear();
    var mo = to.getMonth() - from.getMonth();
    var da = to.getDate() - from.getDate();
    if (da < 0) { mo--; da += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); }
    if (mo < 0) { y--; mo += 12; }
    return sub(labels.ymd || '{y}y {mo}mo {da}d', y, mo, da);
  }

  function computeDiff() {
    var a = parse(fromEl.value), b = parse(toEl.value);
    if (!a || !b) { diffDays.textContent = '—'; diffWeeks.textContent = '—'; diffYmd.textContent = '—'; return; }
    var days = Math.abs(Math.round((b.getTime() - a.getTime()) / MS));
    diffDays.textContent = days;
    diffWeeks.textContent = Math.floor(days / 7) + ' + ' + (days % 7);
    diffYmd.textContent = ymdBetween(a, b);
  }

  function addDate(base, amount, unit) {
    var d = new Date(base.getTime());
    if (unit === 'day') d.setDate(d.getDate() + amount);
    else if (unit === 'week') d.setDate(d.getDate() + amount * 7);
    else if (unit === 'month' || unit === 'year') {
      var day = d.getDate();
      d.setDate(1);
      if (unit === 'month') d.setMonth(d.getMonth() + amount); else d.setFullYear(d.getFullYear() + amount);
      var last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, last));
    }
    return d;
  }

  function computeAdd() {
    var b = parse(baseEl.value);
    var amount = parseInt(amountEl.value, 10) || 0;
    if (!b) { addResult.textContent = '—'; return; }
    var r = addDate(b, amount, unitEl.value);
    addResult.textContent = fullFmt.format(r);
  }

  // Defaults (user's actual today)
  if (!targetEl.value) targetEl.value = offsetStr(100);
  if (!fromEl.value) fromEl.value = todayStr();
  if (!toEl.value) toEl.value = offsetStr(30);
  if (!baseEl.value) baseEl.value = todayStr();

  root.addEventListener('input', function () {
    computeDday(); computeDiff(); computeAdd();
  });
  unitEl.addEventListener('change', computeAdd);

  computeDday(); computeDiff(); computeAdd();
})();
