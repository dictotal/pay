import Vue from "vue";
import App from "./App.vue";
import Common from "./common";
Vue.config.productionTip = false;
Vue.use(Common);
new Vue({
	render: h => h(App)
}).$mount("#app");
