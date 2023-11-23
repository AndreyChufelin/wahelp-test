<script setup>
import { useComments } from "../services/posts";
import PostUser from "./PostUser.vue";
import PostComment from "./PostComment.vue";
import PostCommentForm from "./PostCommentForm.vue";

const props = defineProps({
  post: {
    userId: Number,
    id: Number,
    title: String,
    body: String,
  },
});

const { comments, getComments, loading } = useComments();
getComments(props.post.id);

function addPost(comment) {
  comments.value.push(comment)
}
</script>

<template>
  <div class="post">
    <h2 class="post__title">{{ post.title }} - {{ post.id }}</h2>
    <p class="post__body">
      {{ post.body }}
    </p>
    <PostUser :id="post.userId" />
    <div class="post__comments" v-if="!loading">
      <h3>Комментарии:</h3>
      <PostComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      ></PostComment>
      <PostCommentForm @submit="addPost" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;

  &__title {
    margin-top: 0;
  }
  &__comments {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
