import { ref } from "vue";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export function useFetch() {
  const limit = 20;
  let offset = ref(0);

  const loading = ref(false);
  const error = ref(null);
  const isPaginationEnded = ref(false);
  const data = ref();

  async function call(path, options = {}) {
    try {
      loading.value = true;
      const response = await fetch(`${BASE_URL}${path}`, options);
      data.value = await response.json();

      loading.value = false;
    } catch {
      error.value = { message: "Error!" };
    }
  }

  async function callPagination(path, query) {
    if (offset.value === 0) {
      data.value = [];
    }
    loading.value = true;

    const response = await fetch(
      `${BASE_URL}/${path}?_limit=${limit}&_start=${offset.value}&${query}`
    );
    const json = await response.json();

    if (json.length) {
      data.value.push(...json);
      offset.value += limit;
    } else {
      isPaginationEnded.value = true;
    }

    loading.value = false;
  }

  return {
    loading,
    error,
    data,
    isPaginationEnded,
    offset,
    call,
    callPagination,
  };
}

export function usePosts() {
  const posts = ref([]);
  const { loading, data, error, isPaginationEnded, offset, callPagination } =
    useFetch();

  async function getPosts(userId = null) {
    await callPagination(userId ? `users/${userId}/posts` : "posts");
    posts.value = data.value;
  }
  function clearPosts() {
    posts.value = [];
    isPaginationEnded.value = false;
    offset.value = 0;
  }

  return {
    loading,
    error,
    posts,
    isPaginationEnded,
    getPosts,
    clearPosts,
  };
}

export function useUser() {
  const user = ref([]);
  const { loading, data, error, isPaginationEnded, call } = useFetch();

  async function getUser(id) {
    await call(`users?id=${id}`);
    user.value = data.value[0];
  }

  return {
    loading,
    error,
    user,
    isPaginationEnded,
    getUser,
  };
}

export function useUsers() {
  const users = ref([]);
  const { loading, data, error, isPaginationEnded, callPagination } =
    useFetch();

  async function getUsers() {
    await callPagination("users");
    users.value = data.value;
  }

  return {
    loading,
    error,
    users,
    isPaginationEnded,
    getUsers,
  };
}

export function useComments() {
  const comments = ref([]);
  const { loading, data, error, isPaginationEnded, call } = useFetch();

  async function getComments(postId) {
    await call(`posts/${postId}/comments`);
    comments.value = data.value;
  }

  async function addComment(postId, comment) {
    await call(`posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: comment.body,
        email: comment.email,
      }),
    });
  }

  return {
    loading,
    error,
    comments,
    isPaginationEnded,
    getComments,
    addComment,
  };
}
