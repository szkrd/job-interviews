import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // ant first
import './styles/main.scss'; // then ours
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import SinglePage from './components/SinglePage.vue';

const routes = [{ path: '/', component: SinglePage }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(Antd);
app.use(router);
app.mount('#app');
