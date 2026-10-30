// 身份判斷流程資料：新增或調整題目只改這個檔
const NEW_FLOW = '請登載入新人報到系統，並依據報到規定收繳新進員工到職資料、及相關合約。'

export const STEPS = {
  A: { title: '請問員工是否曾經於公司任職過?', hint: '曾經任職過直營體系，僅任職過加盟店請選“否”',
    options: [{ label: '是', next: 'B' }, { label: '否', result: 'new' }] },
  B: { title: '員工本次異動是否為身份(PT/FT)或加盟直營之間轉換?', hint: '若非上述情況請選否',
    options: [{ label: '是', next: 'C' }, { label: '否', next: 'D' }] },
  C: { title: '員工本次轉換之間是否有中斷在職的情況?', hint: '例如工讀離職1個月後，以正職回任則有中斷在職',
    options: [{ label: '是', next: 'D' }, { label: '否', result: 'existing' }] },
  D: { title: '員工距離前次任職，中斷期間是否超過6個月?',
    hint: '離職日、到職日當天皆視同在職，僅計算「不在職」期間。例如1/15離職、7/16到職，不在職期間為1/16~7/15，剛好6個月，不算超過',
    type: 'dates' }
}

export const RESULTS = {
  new: { badge: '新進員工', tone: 'blue', flow: NEW_FLOW, docs: '錄取核薪單', seniority: '自到職日期起算' },
  existing: { badge: '在職員工', tone: 'purple',
    flow: '適用人事異動流程，請核對員工薪資資料並填寫職務異動單於生效日期前繳回薪酬單位。',
    docs: '職務異動單', seniority: '合併前一身份計算。' },
  return3: { badge: '回任員工', tone: 'green', flow: NEW_FLOW, docs: '錄取核薪單',
    seniority: '中斷年資3個月內：合併前一身份完整年資' },
  return6: { badge: '回任員工', tone: 'green', flow: NEW_FLOW, docs: '錄取核薪單',
    seniority: '中斷年資大於3個月、小於6個月：合併前一身份年資 ×0.5' }
}
