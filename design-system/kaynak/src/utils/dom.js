export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const cx = (...parts) => parts.flat().filter(Boolean).join(' ');

/** state prop'unu sınıfa çevirir: 'hover' → 'is-hover'. Gerçek :hover/:active/:focus-visible de aynı stilleri kullanır. */
export const stateClass = (state) => (state && state !== 'default' ? `is-${state}` : '');

export const lines = (txt) => String(txt ?? '').split('\n').map((s) => s.trim()).filter(Boolean);

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch { /* yok */ } ta.remove(); return ok;
  }
}

export const store = {
  get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* gizli pencere */ } },
};
