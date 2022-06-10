import '@/common/i18n/default-lang'
import Vue from "vue";
import App from "./App.vue";
import Common from "./common";
import router from './router'
Vue.config.productionTip = false;
Vue.use(Common);
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
