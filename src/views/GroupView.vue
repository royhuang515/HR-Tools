<script setup>
import { computed } from 'vue'
import AppBanner from '../components/AppBanner.vue'
import { findCategory } from '../registry'

const props = defineProps({ cat: String })
const category = computed(() => findCategory(props.cat))
</script>

<template>
  <div class="page" v-if="category">
    <AppBanner :title="category.title" sub="請選擇工具" back="/" />
    <main v-if="category.tools.length" class="tiles">
      <RouterLink v-for="t in category.tools" :key="t.id" :to="`/${category.id}/${t.id}`" class="tile">
        <span class="tile-code">{{ t.code }}</span>
        <span class="tile-title">{{ t.title }}</span>
        <span class="tile-desc">{{ t.desc }}</span>
      </RouterLink>
    </main>
    <main v-else class="empty">此類別尚無工具</main>
  </div>
  <div v-else class="empty">找不到此類別</div>
</template>
