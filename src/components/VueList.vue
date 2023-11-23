<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  list: Array,
  getMore: Function,
  isPaginationEnded: Boolean,
  loading: Boolean,
  error: Object,
});

props.getMore();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll(event) {
  const offset =
    document.body.scrollHeight - window.scrollY - window.screen.height;

  if (!props.isPaginationEnded && !props.loading && offset <= 100) {
    props.getMore();
  }
}
</script>

<template>
  <div class="list">
    <slot></slot>
    <div v-if="loading" class="list__loading">
      <slot name="loading">Loading...</slot>
    </div>
    <div v-if="error" class="list__error">
      <slot name="error">Error!</slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>
