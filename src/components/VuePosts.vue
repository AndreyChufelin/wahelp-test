<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { usePosts } from "../services/posts.js";
import VuePost from "./VuePost.vue";
import VueList from "./VueList.vue";

const props = defineProps({
  user: Number | null,
});

defineEmits(["clearFilter"]);

const { loading, error, isPaginationEnded, posts, getPosts, clearPosts } =
  usePosts();

watch(
  () => props.user,
  () => {
    clearPosts();
    getPosts(props.user?.id);
  }
);
</script>

<template>
  <div class="posts">
    <h2 v-if="user">
      Посты пользователя {{ user.username }}
      <button @click="$emit('clearFilter')">❌</button>
    </h2>
    <VueList
      :list="posts"
      :getMore="() => getPosts(user?.id)"
      :loading="loading"
      :error="error"
      :isPaginationEnded="isPaginationEnded"
    >
      <VuePost v-for="post in posts" :key="post.id" :post="post" />
    </VueList>
  </div>
</template>
<style scoped lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>
