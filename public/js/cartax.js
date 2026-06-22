// Car acquisition tax calculator — runs on pages that render #cartax-calc.
(function () {
  var root = document.getElementById('cartax-calc');
  if (!root) return;
  var cur = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
  var q = function (s) { return root.querySelector(s); };

  function compute() {
    var price = parseFloat(q('[data-ct-price]').value) || 0;
    var rate = parseFloat(q('[data-ct-type]').value) || 0;
    var tax = (price * rate) / 100;
    q('[data-ct-tax]').textContent = cur.format(Math.round(tax));
    q('[data-ct-rate]').textContent = rate === 0 ? '면세' : rate + '%';
  }

  root.addEventListener('input', compute);
  root.addEventListener('change', compute);
  compute();
})();
