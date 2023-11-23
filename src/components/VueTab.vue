<script setup>
defineProps({
  currentTabName: String,
  name: String,
});
</script>

<template>
  <div
    :class="{
      hidden: currentTabName !== name,
    }"
  >
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.hidden {
  display: none;
  visibility: hidden;
}
</style>
