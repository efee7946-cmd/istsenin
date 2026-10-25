// Sayfadaki görünür metinlerin kontrastını ölçer, 4.5:1 altındakileri ve 24px'ten küçük etkileşimli öğeleri döndürür.
// Tarayıcıda javascript_tool ile çalıştır; temayı değiştirip tekrar çalıştır.
(() => {
  const rgb = s => s.match(/[\d.]+/g).map(Number);
  const lum = c => {
    const [r, g, b] = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const bgOf = el => {
    while (el) {
      const a = rgb(getComputedStyle(el).backgroundColor);
      if (a.length < 4 || a[3] > 0.9) return a.slice(0, 3);
      el = el.parentElement;
    }
    return [255, 255, 255];
  };
  const lowContrast = [];
  const seen = new Set();
  document.querySelectorAll('body *').forEach(el => {
    if (!el.offsetParent) return;
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) return;
    const cs = getComputedStyle(el);
    const fg = rgb(cs.color);
    const bg = bgOf(el);
    const f = fg.length > 3 && fg[3] < 1 ? fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3])) : fg.slice(0, 3);
    const L1 = lum(f), L2 = lum(bg);
    const ratio = +((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2);
    const px = parseFloat(cs.fontSize), w = +cs.fontWeight;
    const large = px >= 24 || (px >= 18.66 && w >= 700);
    const key = ratio + '|' + el.className + '|' + cs.fontSize;
    if (seen.has(key)) return;
    seen.add(key);
    if (ratio < (large ? 3 : 4.5)) {
      lowContrast.push({
        text: el.textContent.trim().slice(0, 30), ratio, size: cs.fontSize, weight: cs.fontWeight,
        disabled: !!el.closest('[disabled],[aria-disabled="true"]'), cls: String(el.className).slice(0, 40),
      });
    }
  });
  const smallTargets = [...document.querySelectorAll('button,a,input,select,textarea,[role=button],[role=radio],[role=switch],[role=tab],[role=checkbox]')]
    .filter(e => e.offsetParent)
    .map(e => { const b = (e.closest('label') || e).getBoundingClientRect(); return { name: (e.getAttribute('aria-label') || e.textContent).trim().slice(0, 25), w: Math.round(b.width), h: Math.round(b.height) }; })
    .filter(x => x.w < 24 || x.h < 24);
  const unnamed = [...document.querySelectorAll('button,[role=button],a[href]')]
    .filter(e => e.offsetParent && !(e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.textContent.trim() || e.title))
    .map(e => e.outerHTML.slice(0, 120));
  return { theme: document.documentElement.dataset.theme || null, viewport: [innerWidth, innerHeight], lowContrast, smallTargets, unnamed };
})()
