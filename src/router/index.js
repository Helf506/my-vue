import { createRouter, createWebHistory } from 'vue-router';
// 按需引入你的页面组件，比如：
import Navigation from '../components/Navigation.vue';
import Home from '@/views/Home.vue';
import Upload from '@/views/Upload.vue';
import Results from '@/views/Results.vue';
import Demo from '@/components/Demo.vue'; // 引入新组件
import Settings from '@/views/Settings.vue'; // 导入Settings组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/demo',
    component: Demo
  }, // 添加演示页路由
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
];


// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // Vue3 用 createWebHistory，替代 Vue2 的 mode: 'history'
  routes
});

export default router;