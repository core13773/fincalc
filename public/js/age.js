// Age calculator — runs on pages that render #age-calc.
(function () {
  var root = document.getElementById('age-calc');
  if (!root) return;

  var dataEl = document.getElementById('age-data');
  var config = dataEl ? JSON.parse(dataEl.textContent || '{}') : {};
  var locale = config.locale || 'en-US';
  var labels = config.labels || {};

  var q = function (sel) { return root.querySelector(sel); };
  var birthEl = q('[data-age-birth]');
  var asofEl = q('[data-age-asof]');
  var intlEl = q('[data-age-intl]');
  var koreanEl = q('[data-age-korean]');
  var countingEl = q('[data-age-counting]');
  var daysEl = q('[data-age-days]');
  var nextEl = q('[data-age-next]');

  function nf(v) { return new Intl.NumberFormat(locale).format(v); }

  function compute() {
    var birth = birthEl.value ? new Date(birthEl.value + 'T00:00:00') : null;
    var asOf = asofEl.value ? new Date(asofEl.value + 'T00:00:00') : new Date();
    if (!birth || isNaN(birth.getTime()) || isNaN(asOf.getTime())) {
      intlEl.textContent = '—';
      return;
    }

    // International (만 나이)
    var intl = asOf.getFullYear() - birth.getFullYear();
    var dm = asOf.getMonth() - birth.getMonth();
    if (dm < 0 || (dm === 0 && asOf.getDate() < birth.getDate())) intl--;
    if (intl < 0) intl = 0;

    // Korean year age (연 나이) and counting age (세는 나이)
    var korean = Math.max(0, asOf.getFullYear() - birth.getFullYear() + 1);
    var counting = intl + 1;

    var MS_DAY = 86400000;
    var days = Math.max(0, Math.floor((asOf.getTime() - birth.getTime()) / MS_DAY));

    // Next birthday
    var nb = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
    if (nb.getTime() < asOf.getTime()) nb = new Date(asOf.getFullYear() + 1, birth.getMonth(), birth.getDate());
    var ndays = Math.max(0, Math.round((nb.getTime() - asOf.getTime()) / MS_DAY));

    intlEl.textContent = nf(intl) + ' ' + (labels.years || '');
    koreanEl.textContent = nf(korean) + ' ' + (labels.years || '');
    countingEl.textContent = nf(counting) + ' ' + (labels.years || '');
    daysEl.textContent = nf(days) + ' ' + (labels.days || '');
    nextEl.textContent = nf(ndays) + ' ' + (labels.days || '');
  }

  // Default "as of" to today if empty
  if (!asofEl.value) {
    var now = new Date();
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var dd = String(now.getDate()).padStart(2, '0');
    asofEl.value = now.getFullYear() + '-' + mm + '-' + dd;
  }

  root.addEventListener('input', compute);
  compute();
})();
