import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // ant first
import 'ant-design-vue/dist/antd.variable.css'; // with ant var list (less compiled to css)
import './styles/main.scss'; // then ours
import App from './components/layouts/mainLayout/MainLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import SearchResultsPage from './components/pages/searchResultsPage/SearchResultsPage.vue';
import LogoutPage from './components/pages/LogoutPage.vue';
import WatchlistPage from './components/pages/WatchlistPage.vue';
import MovieDetailsPage from './components/pages/MovieDetailsPage.vue';
import { RoutePaths } from './routePaths';

const routes = [
  { path: RoutePaths.Search, component: SearchResultsPage },
  { path: RoutePaths.Logout, component: LogoutPage },
  { path: RoutePaths.Watchlist, component: WatchlistPage },
  { path: RoutePaths.MovieDetails, component: MovieDetailsPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(Antd);
app.use(router);
app.mount('#app');
