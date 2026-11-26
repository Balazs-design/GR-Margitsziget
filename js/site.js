{
  const t = document.querySelector('.nav__toggle'), m = document.getElementById('menu');
  if (t && m) {
    const set = o => { m.classList.toggle('is-open', o); t.setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.style.overflow = o ? 'hidden' : ''; };
    t.addEventListener('click', () => set(!m.classList.contains('is-open')));
    m.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }
  /* the header turns solid once the page has scrolled */
  const nav = document.querySelector('.nav');
  const solid = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', solid, { passive: true }); solid();
}
