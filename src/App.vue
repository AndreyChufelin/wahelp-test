<script setup>
import { computed, ref, watch } from "vue";
import TheHeader from "./components/TheHeader.vue";
import VuePosts from "./components/VuePosts.vue";
import VueUsers from "./components/VueUsers.vue";
import VueTab from "./components/VueTab.vue";

const currentTabName = ref("posts");
const selectedUser = ref(null);

const tabs = {
  posts: VuePosts,
  users: VueUsers,
};

watch(selectedUser, () => {
  currentTabName.value = "posts";
});
</script>

<template>
  <TheHeader v-model="currentTabName" />
  <main class="main container">
    <VueTab :currentTabName="currentTabName" name="posts">
      <VuePosts :user="selectedUser" @clearFilter="selectedUser = null" />
    </VueTab>
    <VueTab :currentTabName="currentTabName" name="users">
      <VueUsers @showUserPosts="selectedUser = $event" />
    </VueTab>
  </main>
</template>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
}
</style>
