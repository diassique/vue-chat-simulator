import Vue from 'vue';
import Router from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ChatView from '@/views/ChatView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
    },
  ],
});