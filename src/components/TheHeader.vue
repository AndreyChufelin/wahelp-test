<script setup>
import { defineEmits } from "vue";
import HeaderItem from "./HeaderItem.vue";

defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <header class="header container">
    <HeaderItem
      name="posts"
      :currentTab="modelValue"
      @click="$emit('update:modelValue', 'posts')"
    >
      Посты
    </HeaderItem>
    <HeaderItem
      name="users"
      :currentTab="modelValue"
      @click="$emit('update:modelValue', 'users')"
    >
      Пользователи
    </HeaderItem>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
