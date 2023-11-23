<script setup>
import { useUser } from "../services/posts";

const props = defineProps({
  id: Number,
});

const { loading, user, getUser } = useUser();
getUser(props.id);
</script>

<template>
  <div class="user" v-if="!loading">{{ user.username }}</div>
</template>

<style scoped lang="scss">
.user {
  color: gray;
}
</style>
