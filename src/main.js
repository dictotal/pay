import '@/common/i18n/default-lang'
import Vue from "vue";
import App from "./App.vue";
import Common from "./common";
import router from './router'
const deleteEl = (el) => {
  if (typeof el === 'string') el = document.querySelector(el)
  if (el) {
    el.parentNode.removeChild(el)
  }
}
router.afterEach(() => {
  deleteEl('#loading')
  deleteEl('#loadingError')
})
Vue.config.productionTip = false;
Vue.use(Common);
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
