<template>
  <div class="test">
    <h1>This is {{ h1 }} page</h1>
    <h2>{{ h2 }}</h2>
    <input type="text" v-model="input1" />
    <button type="button" @click="getData">Get</button>
    <button type="button" @click="setData">Set</button>
    
    <h1>게시물 목록</h1>
    <!-- <select>
      <option v-for="post in posts" :key="id" :value="title">{{ post.body }}</option>
    </select> -->
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      h1: '호드리의 테스트 페이지',
      h2: '여기는 h2 테스트 텍스트입니다.',
      input1: 'input1 abc',
      posts: [],
    }
  },
  methods: {
    getData() {
      alert(this.input1)
    },
    setData() {
      this.input1 = 'Changed by setData - 1234'
    }
  },
  created() {
    this.$axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
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
