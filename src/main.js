import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import ToastrPlugin from './toastrPlugin'

import ruLocale from 'vee-validate/dist/locale/ru'

Vue.use(
  VueAxios,
  axios.create({
    baseURL: 'http://localhost:3000',
  }),
)
Vue.use(VeeValidate, { inject: false })
Vue.use(BootstrapVue)
Vue.use(ToastrPlugin, {
  progressBar: true,
})

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  mounted() {
    this.$validator.localize('ru', ruLocale)
  },
})
