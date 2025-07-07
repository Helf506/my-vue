import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; 
import './assets/styles.css'; 
// 引入 Axios
import axios from 'axios'; 

const app = createApp(App);

// 配置 Axios 基础路径（根据实际后端地址调整）
// 假设后端运行在 http://localhost:5000 ，这里要和后端服务端口对应
axios.defaults.baseURL = 'http://localhost:5000'; 

// 把 Axios 挂载到 Vue 实例的全局属性上，方便组件中通过 this.$axios 使用
app.config.globalProperties.$axios = axios; 

app.use(router); 
app.mount('#app');

