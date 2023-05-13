<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import router from './router';

onMounted(() => router.push('/'));
</script>
