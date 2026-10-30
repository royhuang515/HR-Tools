// 以本地時間解析 YYYY-MM-DD，避免 UTC 時區誤差
export function pd(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
export function fmt(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}
export function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r }
export function addMonths(d, n) { const r = new Date(d); r.setMonth(r.getMonth() + n); return r }
export function dayDiff(a, b) { return Math.round((b - a) / 86400000) }
