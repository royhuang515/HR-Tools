<script setup>
import { ref } from 'vue'
import { calcSeniority } from './rules.js'

let uid = 0
const newSeg = () => ({ id: ++uid, a: '', b: '', c: 0 })
const segments = ref([newSeg()])
const dateD = ref('')
const result = ref(null)
const error = ref('')

const CATEGORY = {
  within3: { text: '3個月內回任', cls: 'badge-green' },
  within6: { text: '6個月內回任（大於3個月）', cls: 'badge-blue' },
  over6: { text: '不符合回任標準', cls: 'badge-gray' }
}

function add() { segments.value.push(newSeg()) }
function remove(i) {
  if (segments.value.length <= 1) { error.value = '至少需保留一段任職資料！'; return }
  segments.value.splice(i, 1)   // 編號由 v-for 的 index 自動產生
}
function run() {
  const r = calcSeniority(segments.value, dateD.value)
  error.value = r.ok ? '' : r.error
  result.value = r.ok ? r : null
}
</script>

<template>
  <div class="card">
    <div class="section-title">
      <div><h3>第一部份：原始身分資料</h3><div class="q-hint" style="margin:0">請參照飛騰人員基本資料檔</div></div>
      <button class="btn" @click="add">+ 新增一段</button>
    </div>

    <div v-for="(s, i) in segments" :key="s.id" class="seg">
      <div class="seg-head">
        <span>第 {{ i + 1 }} 段</span>
        <button v-if="segments.length > 1" class="seg-del" @click="remove(i)">[刪除]</button>
      </div>
      <div class="seg-grid">
        <label class="field"><span>到職日期 ({{ i + 1 }}A)</span><input type="date" v-model="s.a"></label>
        <label class="field"><span>離職日期 ({{ i + 1 }}B)</span><input type="date" v-model="s.b"></label>
        <label class="field"><span>留停天數 ({{ i + 1 }}C)</span><input type="number" min="0" v-model="s.c"></label>
      </div>
    </div>

    <div class="section-title" style="margin-top:20px"><h3>第二部份：新身分資料</h3></div>
    <label class="field"><span>D. 新身份到職日</span><input type="date" v-model="dateD"></label>

    <div v-if="error" class="notice notice-error">{{ error }}</div>
    <button class="btn btn-primary" style="width:100%" @click="run">開始試算年資</button>

    <div v-if="result" style="margin-top:18px">
      <div class="result-box"><h4>特休年資類型</h4>
        <div><span class="badge" :class="CATEGORY[result.category].cls">{{ CATEGORY[result.category].text }}</span></div></div>
      <div class="result-box"><h4>詳細計算明細</h4>
        <div v-if="result.category === 'over6'">中斷超過 6 個月，視同一般新進人員，自到職日 {{ result.start }} 重新起算年資。</div>
        <div v-else>
          前一身份實際年資（扣除留停）：{{ result.base }} 天<br>
          併計方式：{{ result.category === 'within3' ? '完整併計（×1）' : '折半併計（×0.5）' }}<br>
          可併計年資：{{ result.counted }} 天<br>
          <b>新特休起算日：{{ result.start }}</b>
        </div>
      </div>
    </div>
  </div>
</template>
