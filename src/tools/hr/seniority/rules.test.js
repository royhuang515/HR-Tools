import test from 'node:test'
import assert from 'node:assert/strict'
import { calcSeniority } from './rules.js'

const seg = (a, b, c = 0) => ({ a, b, c })

test('3 個月內完整併計', () => {
  const r = calcSeniority([seg('2025-01-01', '2025-12-31')], '2026-01-20')
  assert.deepEqual([r.category, r.counted, r.start], ['within3', 365, '2025-01-20'])
})
test('大於 3 個月折半', () => {
  const r = calcSeniority([seg('2025-01-01', '2025-01-10')], '2025-05-01')
  assert.deepEqual([r.category, r.base, r.counted, r.start], ['within6', 10, 5, '2025-04-26'])
})
test('留停天數會扣除', () => {
  const r = calcSeniority([seg('2025-01-01', '2025-01-10', 4)], '2025-01-20')
  assert.equal(r.counted, 6)
})
test('超過 6 個月視同新進', () => {
  const r = calcSeniority([seg('2025-01-01', '2025-01-15')], '2025-07-17')
  assert.deepEqual([r.category, r.start], ['over6', '2025-07-17'])
})
test('多段順序不影響結果', () => {
  const r = calcSeniority([seg('2025-03-01', '2025-03-10'), seg('2025-01-01', '2025-01-10')], '2025-03-20')
  assert.equal(r.base, 20)
})
test('段落重疊、留停過大、到職日早於離職日皆回報錯誤', () => {
  assert.equal(calcSeniority([seg('2025-01-01', '2025-01-10'), seg('2025-01-10', '2025-01-20')], '2025-02-01').ok, false)
  assert.equal(calcSeniority([seg('2025-01-01', '2025-01-10', 11)], '2025-02-01').ok, false)
  assert.equal(calcSeniority([seg('2025-01-01', '2025-01-10')], '2025-01-10').ok, false)
})
