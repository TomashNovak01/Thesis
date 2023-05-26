<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup>
const name = "btn"
defineProps({
  class: String,
})
</script>

<style lang="scss">
.btn {
  font-size: 16pt;
  color: orange;
  border: 1px solid orange;
  border-radius: 10px;
  padding: 5px;
  background: white;

  &:hover {
    cursor: pointer;
    color: white;
    border: 1px solid white;
    background: #ffa6009a;
  }
}
</style>