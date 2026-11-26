{
  const P = window.GR_PRICES || {};
  const ft = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
  const btns = document.querySelectorAll('[data-size]');
  const show = size => {
    btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.size === size ? 'true' : 'false'));
    document.querySelectorAll('[data-p]').forEach(td => { const [kind, k] = td.dataset.p.split('|'); td.textContent = ft(P[size][kind][Number(k)]); });
  };
  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.size)));
  show('kicsi');
}
