import { pd, fmt, addDays, dayDiff } from '../../../shared/dateUtils.js'
import { classifyBreak, BREAK_RULES } from '../_shared/breakRules.js'

const err = (error) => ({ ok: false, error })

// segments: [{ a:'到職日', b:'離職日', c:留停天數 }]，valD: 新身份到職日
// 可併計年資 = 各段(任職天數 − 留停天數)加總；3個月內完整併計，大於3個月 ×0.5
// 新特休起算日 = 新到職日 − 可併計年資天數
export function calcSeniority(segments, valD) {
  if (!valD) return err('請填寫新身份到職日 (D)！')
  const dateD = pd(valD)
  const segs = []
  for (let i = 0; i < segments.length; i++) {
    const n = i + 1, { a, b } = segments[i]
    const c = parseInt(segments[i].c) || 0
    if (!a || !b) return err(`請完整填寫第 ${n} 段的到職與離職日期！`)
    const A = pd(a), B = pd(b)
    if (B < A) return err(`第 ${n} 段：離職日期不得早於到職日期！`)
    const span = dayDiff(A, B) + 1
    if (c > span) return err(`第 ${n} 段：留停天數（${c}）不得大於該段任職天數（${span}）！`)
    segs.push({ n, A, B, c, span })
  }
  segs.sort((x, y) => x.A - y.A)
  for (let i = 1; i < segs.length; i++) {
    if (segs[i].A <= segs[i - 1].B) return err(`第 ${segs[i - 1].n} 段與第 ${segs[i].n} 段的任職期間重疊，請檢查日期！`)
  }
  const last = segs[segs.length - 1]
  if (dateD <= last.B) return err('新身份到職日必須晚於最後一段離職日！')

  const category = classifyBreak(last.B, dateD)
  if (category === 'over6') return { ok: true, category, start: fmt(dateD) }
  const base = segs.reduce((s, g) => s + g.span - g.c, 0)
  const counted = category === 'within3' ? base : Math.round(base * BREAK_RULES.halfFactor)
  return { ok: true, category, base, counted, start: fmt(addDays(dateD, -counted)) }
}
