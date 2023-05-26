<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import router from './router';

onMounted(() => router.push('/'));
</script>

<style scoped>
.app {
  background: #ffa6009a;
}
</style>
