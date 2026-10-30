import test from 'node:test'
import assert from 'node:assert/strict'
import { pd } from '../../../shared/dateUtils.js'
import { classifyBreak } from './breakRules.js'

const c = (b, d) => classifyBreak(pd(b), pd(d))

test('剛好 6 個月（不在職期間 1/16~7/15）算回任', () => assert.equal(c('2026-01-15', '2026-07-16'), 'within6'))
test('多一天即超過 6 個月', () => assert.equal(c('2026-01-15', '2026-07-17'), 'over6'))
test('中斷約半個月為 3 個月內', () => assert.equal(c('2026-01-31', '2026-02-15'), 'within3'))
test('剛好 3 個月為 3 個月內', () => assert.equal(c('2026-01-15', '2026-04-16'), 'within3'))
test('3 個月多一天進入大於 3 個月', () => assert.equal(c('2026-01-15', '2026-04-17'), 'within6'))
test('月底離職不溢位：8/31 離職，3/1 到職為 6 個月內', () => assert.equal(c('2026-08-31', '2027-03-01'), 'within6'))
