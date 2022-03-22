import MaskConstructor from "./index.vue";
import Vue from "vue";

class Mask {
	constructor() {
		this.refUIDList = [];

		this.uid = 0;
		this.refMap = {};
	}

	getHiddenUID() {
		let id = this.refUIDList.pop();
		return id === undefined ? this.$create() : id;
	}

	$create() {
		let MaskVue = Vue.extend(MaskConstructor);

		let ref = new MaskVue().$mount();
		document.body.appendChild(ref.$el);

		let uid = this.uid++;
		this.$watch(ref);
		ref.uid = uid;
		this.refMap[uid] = ref;
		return uid;
	}

	$watch(ref) {
		ref.$watch("isShow", nv => {
			if (!nv) this.refUIDList.push(ref.uid);
		});
	}

	show(clickCallback, isLoading) {
		let uid = this.getHiddenUID(),
			ref = this.refMap[uid];
		if (isLoading) {
			ref.loading();
		} else {
			ref.show();
		}
		ref.clickCallback = clickCallback;

		return uid;
	}

	loading(clickCallback) {
		return this.show(clickCallback, true);
	}

	hidden(uid) {
		let ref = this.refMap[uid];
		if (ref) {
			ref.hidden();
		}
	}
}

const maskRef = new Mask();

function install(Vue) {
	Object.defineProperty(Vue.prototype, "$$mask", {value: maskRef});
}
export default {install};

export {maskRef as Mask};
