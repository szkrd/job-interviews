import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // ant first
import './styles/main.scss'; // then ours
import App from './components/layouts/mainLayout/MainLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import SearchResultsPage from './components/pages/searchResultsPage/SearchResultsPage.vue';

const routes = [{ path: '/', component: SearchResultsPage }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(Antd);
app.use(router);
app.mount('#app');
