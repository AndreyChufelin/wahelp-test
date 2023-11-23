<script setup>
defineProps({
  comment: Object,
});
</script>

<template>
  <div class="comment">
    <div class="comment__user">{{ comment.email }}</div>
    {{ comment.body }}
  </div>
</template>
<style scoped lang="scss">
.comment {
  display: flex;
  flex-direction: column;

  &__user {
    color: gray;
  }
}
</style>
