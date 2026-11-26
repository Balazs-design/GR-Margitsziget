/* before/after sliders: the range input under the picture moves the cut; one gentle nudge the first time each comes into view */
document.querySelectorAll('[data-ba]').forEach(ba => {
  const r = ba.querySelector('input');
  const set = v => { ba.style.setProperty('--pos', v + '%'); r.value = v; };
  r.addEventListener('input', () => set(r.value));
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    let t0 = null;
    const step = ts => { t0 ??= ts; const k = Math.min((ts - t0) / 1400, 1); set(50 + Math.sin(k * Math.PI * 2) * 18 * (1 - k)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, { threshold: .6 });
  io.observe(ba);
});
