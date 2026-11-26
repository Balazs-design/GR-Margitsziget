{
  const P = window.GR_PRICES, PK = window.GR_PACKS, MAIL = window.GR_MAIL;
  const $ = id => document.getElementById(id);
  const ft = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
  const SIZE = { kicsi: 'Kicsi', kozepes: 'Közepes', nagy: 'Nagy' };
  const price = () => P[$('f-size').value][$('f-kind').value][Number($('f-pack').value)];
  const upd = () => { $('f-price').textContent = ft(price()); };
  ['f-size', 'f-kind', 'f-pack'].forEach(id => $(id).addEventListener('change', upd));

  /* a link like kapcsolat.html#csomag-extra picks that package */
  const m = location.hash.match(/^#csomag-(standard|plusz|extra)$/);
  if (m) $('f-pack').value = String(PK.findIndex(p => p.toLowerCase() === m[1]));
  upd();

  $('booking').addEventListener('submit', e => {
    e.preventDefault();
    let first = null;
    [['f-name', 'e-name', v => v.trim().length > 1], ['f-tel', 'e-tel', v => v.replace(/\D/g, '').length >= 9]].forEach(([f, er, ok]) => {
      const bad = !ok($(f).value); $(f).setAttribute('aria-invalid', bad ? 'true' : 'false'); $(er).hidden = !bad; if (bad && !first) first = $(f);
    });
    if (first) { first.focus(); return; }
    const body = [
      'Kedves GR Margitsziget!', '',
      'Időpontot szeretnék kérni:',
      '- Csomag: ' + PK[Number($('f-pack').value)] + ', ' + $('f-kind').value.toLowerCase(),
      '- Autó mérete: ' + SIZE[$('f-size').value] + ' (listaár: ' + String(price()).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft)',
      '- Mikor lenne jó: ' + ($('f-when').value.trim() || 'egyeztetés szerint'),
      $('f-msg').value.trim() ? '- Megjegyzés: ' + $('f-msg').value.trim() : '',
      '', 'Név: ' + $('f-name').value.trim(), 'Telefon: ' + $('f-tel').value.trim()
    ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
    location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Időpontkérés: ' + PK[Number($('f-pack').value)] + ' csomag') + '&body=' + encodeURIComponent(body);
  });
}
