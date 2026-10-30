<script setup>
defineProps({ title: String, sub: String, back: String })
</script>

<template>
  <header class="banner">
    <RouterLink v-if="back" :to="back" class="banner-back">‹ 返回</RouterLink>
    <div class="banner-text">
      <h1>{{ title }}</h1>
      <p v-if="sub">{{ sub }}</p>
    </div>
  </header>
</template>
