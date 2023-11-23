<script setup>
defineProps({
  name: String,
  currentTab: String,
});
</script>

<template>
  <button
    class="header-item"
    :class="{
      'header-item_selected': currentTab === name,
    }"
  >
    <slot></slot>
  </button>
</template>
<style scoped lang="scss">
.header-item {
  width: 250px;

  &_selected {
    font-weight: bold;
  }
}
</style>
