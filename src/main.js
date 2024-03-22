import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

// axios를 전역 속성으로 추가합니다. 이제 모든 컴포넌트 내부에서 this.$axios로 axios에 접근할 수 있습니다.
app.config.globalProperties.$axios = axios;

app.use(router)

app.mount('#app')
