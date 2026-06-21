// Percentage calculator — runs on pages that render #percentage-calc.
(function () {
  var root = document.getElementById('percentage-calc');
  if (!root) return;

  var locale = root.dataset.locale || 'en-US';
  var inc = root.dataset.inc || '';
  var dec = root.dataset.dec || '';

  function nf(v) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(v);
  }

  function q(sel) { return root.querySelector(sel); }

  function compute() {
    // 1) percent of a value
    var whole = parseFloat(q('[data-pct-of-whole]').value) || 0;
    var percent = parseFloat(q('[data-pct-of-percent]').value) || 0;
    q('[data-pct-of-result]').textContent = nf(whole * percent / 100);

    // 2) ratio: A is what % of B
    var a = parseFloat(q('[data-pct-ratio-a]').value) || 0;
    var b = parseFloat(q('[data-pct-ratio-b]').value) || 0;
    var ratio = b !== 0 ? (a / b) * 100 : NaN;
    q('[data-pct-ratio-result]').textContent = isFinite(ratio) ? nf(ratio) + '%' : '—';

    // 3) change from prev -> next
    var prev = parseFloat(q('[data-pct-chg-prev]').value) || 0;
    var next = parseFloat(q('[data-pct-chg-next]').value) || 0;
    var out = q('[data-pct-chg-result]');
    if (prev === 0) {
      out.textContent = '—';
    } else {
      var chg = ((next - prev) / prev) * 100;
      var sign = chg >= 0 ? inc : dec;
      var str = (chg > 0 ? '+' : '') + nf(chg) + '%';
      out.innerHTML = str + ' <span class="muted">' + sign + '</span>';
    }
  }

  root.addEventListener('input', compute);
  compute();
})();
