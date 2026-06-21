// Income tax calculator — runs on pages that render #income-tax-calc.
// Exact progressive (marginal) computation on a taxable amount.
(function () {
  var root = document.getElementById('income-tax-calc');
  if (!root) return;

  var dataEl = document.getElementById('tax-data');
  var config = dataEl ? JSON.parse(dataEl.textContent || '{}') : {};
  var table = config.table || { currency: 'USD', surtax: false, bands: [] };
  var locale = config.locale || 'en-US';

  var amountEl = root.querySelector('[data-tax-amount]');
  var totalEl = root.querySelector('[data-tax-total]');
  var incomeEl = root.querySelector('[data-tax-income]');
  var localEl = root.querySelector('[data-tax-local]');
  var afterEl = root.querySelector('[data-tax-after]');
  var rateEl = root.querySelector('[data-tax-rate]');

  function compute() {
    var taxable = Math.max(0, parseFloat(amountEl.value) || 0);
    var tax = 0;
    var prev = 0;
    for (var i = 0; i < table.bands.length; i++) {
      var b = table.bands[i];
      if (taxable > prev) {
        var portion = Math.min(taxable, b.up) - prev;
        tax += portion * b.rate;
        prev = b.up;
      } else {
        break;
      }
    }
    var localTax = table.surtax ? tax * 0.1 : 0;
    var totalTax = tax + localTax;
    var effectiveRate = taxable > 0 ? totalTax / taxable : 0;
    var afterTax = Math.max(0, taxable - totalTax);

    var cur = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: table.currency,
      maximumFractionDigits: 0,
    });
    totalEl.textContent = cur.format(totalTax);
    incomeEl.textContent = cur.format(tax);
    if (localEl) localEl.textContent = cur.format(localTax);
    afterEl.textContent = cur.format(afterTax);
    rateEl.textContent = (effectiveRate * 100).toFixed(1) + '%';
  }

  root.addEventListener('input', compute);
  compute();
})();
