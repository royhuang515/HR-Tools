<script setup>
import { ref, computed } from 'vue'
import { STEPS, RESULTS } from './steps.js'
import { resolveBreak } from './rules.js'

const stepId = ref('A')
const history = ref([])
const resultKey = ref(null)
const d1 = ref('')
const d2 = ref('')
const trial = ref('')
const error = ref('')

const step = computed(() => STEPS[stepId.value])
const result = computed(() => resultKey.value && RESULTS[resultKey.value])

function choose(o) {
  if (o.result) { resultKey.value = o.result; return }
  history.value.push(stepId.value)
  stepId.value = o.next
}
function back() {
  error.value = ''; trial.value = ''
  if (resultKey.value) { resultKey.value = null; return }
  stepId.value = history.value.pop() || 'A'
}
function runTrial() {
  const r = resolveBreak(d1.value, d2.value)
  error.value = r.ok ? '' : r.error
  trial.value = r.ok ? `試算結果：${r.text} ➔ 判定為「${r.category === 'over6' ? '是 (超過6個月)' : '否 (未超過6個月)'}」` : ''
}
function confirm() {
  const r = resolveBreak(d1.value, d2.value)
  if (!r.ok) { error.value = r.error; return }
  error.value = ''
  resultKey.value = r.resultKey
}
function reset() {
  stepId.value = 'A'; history.value = []; resultKey.value = null
  d1.value = d2.value = trial.value = error.value = ''
}
</script>

<template>
  <div class="card">
    <template v-if="result">
      <div class="result-box"><h4>身份判定</h4>
        <div><span class="badge" :class="'badge-' + result.tone">{{ result.badge }}</span></div></div>
      <div class="result-box"><h4>適用流程</h4><div>{{ result.flow }}</div></div>
      <div class="result-box"><h4>應備資料</h4><div>{{ result.docs }}</div></div>
      <div class="result-box"><h4>特休年資計算</h4><div>{{ result.seniority }}</div></div>
      <div class="btn-row">
        <button class="btn btn-ghost" @click="back">< 返回上一頁</button>
        <button class="btn btn-primary" @click="reset">重新判定身份</button>
      </div>
    </template>

    <template v-else>
      <h3 class="q-title">{{ step.title }}</h3>
      <p class="q-hint">{{ step.hint }}</p>

      <div v-if="step.type === 'dates'">
        <label class="field"><span>前一身份離職日期 (D1)</span><input type="date" v-model="d1"></label>
        <label class="field"><span>本次預計到職日期 (D2)</span><input type="date" v-model="d2"></label>
        <div v-if="error" class="notice notice-error">{{ error }}</div>
        <div v-if="trial" class="notice">{{ trial }}</div>
        <div class="btn-row">
          <button class="btn" @click="runTrial">試算中斷期間</button>
          <button class="btn btn-primary" @click="confirm">確認送出</button>
        </div>
      </div>
      <div v-else class="opts">
        <button v-for="o in step.options" :key="o.label" class="opt" @click="choose(o)">
          {{ o.label }}
        </button>
      </div>

      <div class="btn-row" v-if="history.length">
        <button class="btn btn-ghost" @click="back">< 返回上一頁</button>
      </div>
    </template>
  </div>
</template>
