<template>
  <v-app>
    <LoginView />
  </v-app>
</template>

<script>
// Импортируем компонент LoginView
import LoginView from '@/views/LoginView.vue';

export default {
  name: 'App',
  components: {
    // Регистрируем LoginView для использования в шаблоне
    LoginView
  }
};
</script>

<style>
/* Стили для App.vue (если необходимы) */
</style>
