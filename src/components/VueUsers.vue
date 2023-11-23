<script setup>
import { useUsers } from "../services/posts.js";
import VueList from "./VueList.vue";

const emits = defineEmits(["showUserPosts"])

const { loading, error, isPaginationEnded, users, getUsers } = useUsers();

function showUserPosts(user) {
  emits("showUserPosts", user)
}
</script>

<template>
  <div class="users">
    <VueList
      :list="users"
      :getMore="getUsers"
      :loading="loading"
      :error="error"
      :isPaginationEnded="isPaginationEnded"
    >
      <div class="user" v-for="user in users" :key="user.id">
        {{ user.username }}
        <button @click="showUserPosts(user)">Посмотреть посты пользователя</button>
      </div>
    </VueList>
  </div>
</template>
<style scoped lang="scss">
.user {
  display: flex;
  justify-content: space-between;

  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
}
</style>
