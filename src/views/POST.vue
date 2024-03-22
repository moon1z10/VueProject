<template>
  <div>
    <h1>새로운 게시물 생성</h1>
    <form @submit.prevent="createPost">
      <div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="newPost.title" />
      </div>
      <div>
        <label for="body">내용</label>
        <textarea id="body" v-model="newPost.body"></textarea>
      </div>
      <button type="submit">게시물 생성</button>
    </form>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  setup() {
    // 반응형 상태 정의
    const newPost = ref({
      title: '',
      body: '',
    });

    const instance = getCurrentInstance();
    const axios = instance.appContext.config.globalProperties.$axios;

    const createPost = async () => {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost.value);
        console.log('새로운 게시물이 생성 되었습니다.', response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // 템플릿에서 사용할 수 있도록 반환
    return {
      newPost,
      createPost
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .test {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
