// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'; // Импорт модуля управления пользователями

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  }
});
