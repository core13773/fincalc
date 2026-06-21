// Unit converter — runs on pages that render #unit-calc.
(function () {
  var root = document.getElementById('unit-calc');
  if (!root) return;

  var dataEl = document.getElementById('unit-data');
  var raw = dataEl ? JSON.parse(dataEl.textContent || '{}') : { categories: [] };
  var locale = root.dataset.locale || 'en-US';

  // Build category lookup with unit maps.
  var cats = {};
  (raw.categories || []).forEach(function (c) {
    var byCode = {};
    c.units.forEach(function (u) { byCode[u.code] = u; });
    cats[c.code] = { special: c.special, units: c.units, byCode: byCode };
  });

  var amountEl = root.querySelector('[data-unit-amount]');
  var categoryEl = root.querySelector('[data-unit-category]');
  var fromEl = root.querySelector('[data-unit-from]');
  var toEl = root.querySelector('[data-unit-to]');
  var resultEl = root.querySelector('[data-unit-result]');
  var rateEl = root.querySelector('[data-unit-rate]');
  var rateLabelEl = root.querySelector('[data-unit-rate-label]');

  function tempToC(code, v) {
    if (code === 'F') return ((v - 32) * 5) / 9;
    if (code === 'K') return v - 273.15;
    return v;
  }
  function tempFromC(code, c) {
    if (code === 'F') return (c * 9) / 5 + 32;
    if (code === 'K') return c + 273.15;
    return c;
  }

  function convert(catCode, value, from, to) {
    var c = cats[catCode];
    if (!c) return NaN;
    if (c.special === 'temperature') {
      return tempFromC(to, tempToC(from, value));
    }
    var f = c.byCode[from] && c.byCode[from].factor;
    var t = c.byCode[to] && c.byCode[to].factor;
    if (f == null || t == null || t === 0) return NaN;
    return (value * f) / t;
  }

  function fmt(val) {
    if (!isFinite(val)) return '—';
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 6 }).format(val);
  }

  function fillUnits(selectEl, c, keep) {
    selectEl.innerHTML = '';
    c.units.forEach(function (u) {
      var opt = document.createElement('option');
      opt.value = u.code;
      opt.textContent = u.name + ' (' + u.code + ')';
      if (u.code === keep) opt.selected = true;
      selectEl.appendChild(opt);
    });
  }

  function compute() {
    var catCode = categoryEl.value;
    var amount = parseFloat(amountEl.value) || 0;
    var from = fromEl.value;
    var to = toEl.value;
    var result = convert(catCode, amount, from, to);
    var rate = convert(catCode, 1, from, to);

    resultEl.textContent = fmt(result);
    rateLabelEl.textContent = '1 ' + from + ' =';
    rateEl.textContent = fmt(rate) + ' ' + to;
  }

  categoryEl.addEventListener('change', function () {
    var c = cats[categoryEl.value];
    if (!c) return;
    // repopulate from/to with the new category's units (first two by default)
    var newFrom = c.units[0].code;
    var newTo = c.units[1] ? c.units[1].code : c.units[0].code;
    fillUnits(fromEl, c, newFrom);
    fillUnits(toEl, c, newTo);
    compute();
  });

  root.addEventListener('input', compute);
  fromEl.addEventListener('change', compute);
  toEl.addEventListener('change', compute);

  root.querySelector('[data-unit-swap]').addEventListener('click', function () {
    var f = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = f;
    compute();
  });

  compute();
})();
