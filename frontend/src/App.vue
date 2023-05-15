<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch("fillContracts");
  store.dispatch("fillFields");
  store.dispatch("fillRemarks");
  store.dispatch("fillResearches");
  store.dispatch("fillTemplates");
  store.dispatch("fillUsers");
});
</script>

<style scoped>
router-view {
  width: 100%;
  height: 100%;
}
</style>
