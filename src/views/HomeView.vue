<script setup>
import AppBanner from '../components/AppBanner.vue'
import { categories } from '../registry'
</script>

<template>
  <div class="page">
    <AppBanner title="人資作業工具" sub="請選擇作業類別" />
    <main class="tiles tiles-home">
      <RouterLink v-for="c in categories" :key="c.id" :to="'/' + c.id" class="tile tile-lg">
        <span class="tile-icon">{{ c.icon }}</span>
        <span class="tile-title">{{ c.title }}</span>
      </RouterLink>
    </main>
  </div>
</template>
