import vMsg from "./msg";
import Vue from "vue";
const Msg = {
	ref: null,
	$create() {
		let msgVue = Vue.extend(vMsg);
		let ref = new msgVue().$mount();
		document.body.appendChild(ref.$el);
		this.ref = ref;
		return ref;
	},
	$getRef() {
		return this.ref ? this.ref : this.$create();
	},
	show(msg) {
		let ref = this.$getRef();
		ref.show(msg);
	}
};
export {Msg};
export default {
	install(Vue) {
		Object.defineProperty(Vue.prototype, "$$msg", {value: Msg});

		Object.defineProperty(Vue.prototype, "$message", {
			value: function (cfg) {
				Msg.show(cfg.message);
			}
		});
	}
};
