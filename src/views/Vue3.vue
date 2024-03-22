<template>
  <div :style="{ backgroundColor: selectedColor }">
    <button @click="increment">Count is: {{ count }}</button>

    <!-- 동적으로 select option 구성하기 -->
    <h1>색깔 선택</h1>
    <select v-model="selectedColor">
      <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
    </select>
    <p>선택된 색깔: {{ selectedColor }}</p>

    <!-- REST API(GET)으로 동적으로 데이터를 받아와 목록 보여주기 구현 -->
    <h1>게시물 목록</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default {
  setup() {
    // 반응형 상태 정의
    const count = ref(0);
    const selectedColor = ref('red'); // 기본 선택된 색깔
    const colors = ref(['red', 'green', 'blue', 'yellow']); // 동적 색깔 목록

    const instance = getCurrentInstance();
    const axios = instance.appContext.config.globalProperties.$axios;
    const posts = ref([]); // 데이터를 저장할 반응형 변수

    // 데이터를 불러오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        posts.value = response.data; // 받아온 데이터로 items 업데이트
      } catch (error) {
        console.error("API 호출 중 에러 발생: ", error);
      }
    };

    // 메서드 정의
    const increment = () => {
      count.value++
    }
    
    // 라이프사이클 훅 사용
    console.log('Component - setup()')
    onBeforeMount(() => {console.log('Component is before mounted!')})
    // 컴포넌트가 마운트되었을 때 데이터 불러오기
    onMounted(() => {
      console.log('Component is mounted!');
      fetchData();
    });
    onBeforeUpdate(() => {console.log('Component is before updated!')})
    onUpdated(() => {console.log('Component is updated!')})
    onBeforeUnmount(() => {console.log('Component is before unmounted!')})
    onUnmounted(() => {console.log('Component is unmounted!')})
    console.log('End of setup()')

    // 템플릿에서 사용할 수 있도록 반환
    return { 
      count, increment,
      selectedColor, colors,
      posts,
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
