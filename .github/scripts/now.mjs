// Draws dist/now.svg: a KalashSoft overlay window with live numbers from kalashas.lt and mczeme.lt.
// Runs in GitHub Actions (Node 20+, no dependencies).
import fs from 'node:fs';

const get = async (url) => {
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'kalashas-profile' }, signal: AbortSignal.timeout(10000) });
    if (!r.ok) console.log(url, r.status, r.headers.get("server"));
    return r.ok ? await r.json() : null;
  } catch (e) { console.log(url, String(e)); return null; }
};
const [tw, ir, st, mc] = await Promise.all([
  get('https://kalashas.lt/api/twitch'), get('https://kalashas.lt/api/iracing'),
  get('https://kalashas.lt/api/steam'), get('https://mczeme.lt/stats.json'),
]);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cut = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const num = (n) => (n == null ? '—' : Number(n).toLocaleString('en-US'));
const top = st?.recent?.length ? [...st.recent].sort((a, b) => b.hours2w - a.hours2w)[0] : null;
const live = !!tw?.live;

const cells = [
  { label: live ? 'TWITCH · LIVE' : 'TWITCH', hot: live, big: num(tw?.followers), sub: live ? cut(`live: ${tw.game || tw.title}`, 30) : 'followers, offline now' },
  { label: 'IRACING', big: num(ir?.ir), sub: 'iRating' },
  { label: 'STEAM · 2 WEEKS', big: top ? `${top.hours2w} h` : '—', sub: top ? cut(top.name, 30) : 'no recent games' },
  { label: 'MC ŽEMĖ', big: num(mc?.zaideju_is_viso), sub: mc ? `players, season ${mc.sezonas} day ${mc.diena}` : 'players this season' },
];

const W = 830, H = 168, BH = 36, CW = (W - 4) / cells.length;
const font = fs.readFileSync(new URL('../../assets/ks-pixel.woff2', import.meta.url)).toString('base64');
const emote = fs.readFileSync(new URL('../../assets/emote-labas-28.png', import.meta.url)).toString('base64');
const PX = "KSPixel, 'Courier New', monospace", UI = "Bahnschrift, 'Segoe UI', Inter, -apple-system, Helvetica, Arial, sans-serif";
const t = new Date(), upd = `upd ${String(t.getUTCHours()).padStart(2, '0')}:${String(t.getUTCMinutes()).padStart(2, '0')} UTC`;

let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`
  + `<style>@font-face{font-family:KSPixel;src:url(data:font/woff2;base64,${font}) format('woff2')}</style><defs>`
  + `<linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="#131723"/><stop offset=".25" stop-color="#102a54"/><stop offset=".5" stop-color="#1a458e"/><stop offset=".75" stop-color="#235dc0"/><stop offset="1" stop-color="#2b73ec"/></linearGradient>`
  + `<linearGradient id="panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0D1018"/><stop offset="1" stop-color="#0A0C12"/></linearGradient>`
  + `<linearGradient id="prog" x1="0" x2="1"><stop offset="0" stop-color="#2F7CFF"/><stop offset="1" stop-color="#7FD0FF"/></linearGradient>`
  + `<linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`
  + `<clipPath id="b"><rect x="2" y="2" width="${W - 4}" height="${BH}"/></clipPath></defs>`
  + `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="url(#panel)" stroke="#050505" stroke-width="2"/>`
  + `<g clip-path="url(#b)"><rect x="2" y="2" width="${W - 4}" height="${BH}" fill="url(#bar)"/><rect x="2" y="2" width="${W - 4}" height="1" fill="#fff" opacity=".1"/><rect x="2" y="${BH + 1}" width="${W - 4}" height="1" fill="#000"/>`
  + `<rect x="-120" y="2" width="120" height="${BH}" fill="url(#sh)"><animate attributeName="x" values="-120;-120;${W}" keyTimes="0;.6;1" dur="6s" repeatCount="indefinite"/></rect></g>`
  + `<image x="8" y="6" width="28" height="28" style="image-rendering:pixelated" href="data:image/png;base64,${emote}"/>`
  + `<text x="44" y="25" font-family="${PX}" font-size="16" fill="#F2F6FF">now.exe</text>`
  + `<text x="${W - 12}" y="25" text-anchor="end" font-family="${PX}" font-size="16" fill="#B4C0D4">${upd}</text>`;
cells.forEach((c, i) => {
  const x = 2 + i * CW;
  if (i) s += `<rect x="${x}" y="${BH + 14}" width="1" height="${H - BH - 32}" fill="#fff" opacity=".08"/>`;
  s += `<text x="${x + 20}" y="${BH + 34}" font-family="${PX}" font-size="16" fill="${c.hot ? '#FF3B5C' : '#5AA2FF'}">${esc(c.label)}</text>`;
  if (c.hot) s += `<rect x="${x + 20 + c.label.length * 8 + 6}" y="${BH + 23}" width="8" height="8" fill="#FF3B5C"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></rect>`;
  s += `<text x="${x + 20}" y="${BH + 80}" font-family="${UI}" font-size="40" font-weight="700" fill="#F2F6FF">${esc(c.big)}</text>`;
  s += `<text x="${x + 20}" y="${BH + 104}" font-family="${UI}" font-size="12" fill="#8A95AA">${esc(c.sub)}</text>`;
});
s += `<rect x="2" y="${H - 4}" width="${W - 4}" height="2" fill="url(#prog)" opacity=".7"/></svg>`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/now.svg', s);
console.log(JSON.stringify({ twitch: !!tw, iracing: !!ir, steam: !!st, mc: !!mc, live }));
