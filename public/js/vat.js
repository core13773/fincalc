// VAT / sales tax calculator — runs on pages that render #vat-calc.
(function () {
  var root = document.getElementById('vat-calc');
  if (!root) return;

  var locale = root.dataset.locale || 'en-US';
  function nf(v) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v);
  }
  function q(sel) { return root.querySelector(sel); }

  function compute() {
    var amount = parseFloat(q('[data-vat-amount]').value) || 0;
    var rate = parseFloat(q('[data-vat-rate]').value) || 0;

    var checked = root.querySelector('[data-vat-type]:checked');
    var inclusive = checked && checked.value === 'inclusive';

    var supply, vat, total;
    if (inclusive) {
      // amount is the tax-inclusive total
      total = amount;
      supply = total / (1 + rate / 100);
      vat = total - supply;
    } else {
      // amount is the net (tax-exclusive) supply
      supply = amount;
      vat = (supply * rate) / 100;
      total = supply + vat;
    }

    q('[data-vat-supply]').textContent = nf(supply);
    q('[data-vat-vat]').textContent = nf(vat);
    q('[data-vat-total]').textContent = nf(total);
  }

  root.addEventListener('input', compute);
  root.addEventListener('change', compute);
  compute();
})();
