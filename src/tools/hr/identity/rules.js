import { pd } from '../../../shared/dateUtils.js'
import { classifyBreak, BREAK_TEXT } from '../_shared/breakRules.js'

const KEY = { over6: 'new', within3: 'return3', within6: 'return6' }

// 依前次離職日(D1)與本次到職日(D2)判定中斷期間，回傳對應的結果代碼
export function resolveBreak(v1, v2) {
  if (!v1 || !v2) return { ok: false, error: '請完整填寫離職日期與預計到職日期！' }
  const d1 = pd(v1), d2 = pd(v2)
  if (d2 <= d1) return { ok: false, error: '到職日期必須晚於離職日期！' }
  const category = classifyBreak(d1, d2)
  return { ok: true, category, resultKey: KEY[category], text: BREAK_TEXT[category] }
}
