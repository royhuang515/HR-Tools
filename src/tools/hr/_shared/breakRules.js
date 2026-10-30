import { addDays, addMonths } from '../../../shared/dateUtils.js'

// 公司規定常數集中於此，規定異動只改這裡
export const BREAK_RULES = { shortMonths: 3, longMonths: 6, halfFactor: 0.5 }

/* 統一判定標準（身份判斷、年資計算共用）：
   離職日、到職日當天皆視同在職，不在職期間 = (離職日+1) ~ (到職日-1)，以「月」為單位。
   回傳 within3（3個月內）/ within6（大於3個月、含6個月）/ over6（超過6個月） */
export function classifyBreak(dateB, dateD) {
  const start = addDays(dateB, 1)
  if (dateD <= addMonths(start, BREAK_RULES.shortMonths)) return 'within3'
  if (dateD <= addMonths(start, BREAK_RULES.longMonths)) return 'within6'
  return 'over6'
}

export const BREAK_TEXT = {
  within3: '中斷未超過3個月',
  within6: '中斷大於3個月、未超過6個月',
  over6: '中斷超過6個月'
}
