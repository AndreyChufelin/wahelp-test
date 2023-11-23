<script setup>
import { ref } from "vue";
import { useComments } from "../services/posts";

const emits = defineEmits(["submit"]);

const { loading, addComment } = useComments();
const comment = ref({ body: "", email: "" });
const errors = ref([]);

async function submit() {
  if (comment.value.email.length <= 0) {
    errors.value.push("Укажите email");
    return;
  }
  if (comment.value.body.length > 0) {
    errors.value = [];
    await addComment(1, comment.value);
    emits("submit", { ...comment.value });
    comment.value.body = "";
  }
}
</script>

<template>
  <form class="comment-form" @submit.prevent="submit">
    <div class="comment-form__errors" v-for="error in errors">{{ error }}</div>
    <label>Email: <input v-model="comment.email" type="text" /></label>
    <label
      >Комментарий:
      <textarea class="comment-form__body" v-model="comment.body" type="text" />
    </label>
    <button>Отправить</button>
    <div v-if="loading">Sending...</div>
  </form>
</template>
<style scoped lang="scss">
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-top: 1px solid black;
  padding: 10px 5px;

  &__body {
    width: 100%;
    height: 80px;
  }

  &__errors {
    color: red;
  }
}
</style>
