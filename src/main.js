import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

async function init() {
  await store.dispatch('user/loadCurrentUser');
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount('#app');
}

init();