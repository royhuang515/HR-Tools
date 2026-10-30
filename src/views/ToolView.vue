<script setup>
import { computed, defineAsyncComponent } from 'vue'
import AppBanner from '../components/AppBanner.vue'
import { findCategory, findTool } from '../registry'

const props = defineProps({ cat: String, tool: String })
const category = computed(() => findCategory(props.cat))
const tool = computed(() => findTool(category.value, props.tool))
// 工具元件延遲載入，首頁不受工具數量影響
const ToolComponent = computed(() => tool.value && defineAsyncComponent(tool.value.component))
</script>

<template>
  <div class="page" v-if="tool">
    <AppBanner :title="`${tool.code} ${tool.title}`" :sub="category.title" :back="'/' + category.id" />
    <main class="workspace">
      <component :is="ToolComponent" />
    </main>
  </div>
  <div v-else class="empty">找不到此工具</div>
</template>
