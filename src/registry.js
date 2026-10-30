// 工具註冊表：三層畫面皆由此檔自動產生。
// 新增工具：建立 src/tools/... 資料夾，再於對應類別的 tools 加一筆。
export const categories = [
  {
    id: 'hr', code: 'A', title: '人事作業',
    tools: [
      { id: 'identity', code: 'A1', title: '到職身分判定', desc: '判定新進、在職或回任員工',
        component: () => import('./tools/hr/identity/Index.vue') },
      { id: 'seniority', code: 'A2', title: '回任年資計算', desc: '回任年資折算與特休起算日',
        component: () => import('./tools/hr/seniority/Index.vue') }
    ]
  },
  { id: 'insurance', code: 'B', title: '保險及考勤', tools: [] },
  { id: 'payroll', code: 'C', title: '薪資作業', tools: [] }
]

export const findCategory = (id) => categories.find((c) => c.id === id)
export const findTool = (cat, toolId) => cat?.tools.find((t) => t.id === toolId)
