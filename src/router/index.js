import Vue from 'vue';
import Router from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ChatView from '@/views/ChatView.vue';
import store from '@/store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: { requiresAuth: true }
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/vue-chat-simulator/' : '/',
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = store.state.user.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (!requiresAuth && currentUser) {
    next('/chat');
  } else {
    next();
  }
});

export default router;