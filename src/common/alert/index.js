import AlertComponent from "./alert";
import Vue from "vue";

const Message = {
	ref: null,
	$getRef() {
		return this.ref ? this.ref : this.$create();
	},
	$create() {
		let Alert = Vue.extend(AlertComponent);
		let ref = new Alert().$mount();

		document.body.appendChild(ref.$el);
		this.ref = ref;

		return ref;
	},
	$show(content, callback, title, type, cfg, css = "", okTxt, cancelTxt) {
		let ref = this.$getRef();
		ref.type = type;
		ref.show(content, callback, title, cfg, css, okTxt, cancelTxt);
	},
	alert(content, callback, title, css) {
		this.$show(content, callback, title, "alert", null, css);
	},
	confirm(content, callback, title, css, okTxt, cancelTxt) {
		this.$show(content, callback, title, "confirm", null, css, okTxt, cancelTxt);
	},
	prompt(content, callback, title, cfg, css) {
		this.$show(content, callback, title, "prompt", cfg, css);
	},

	hidden() {
		let ref = this.$getRef();

		ref.hidden();
	}
};
export {Message};
export default {
	install(Vue) {
		Object.defineProperties(Vue.prototype, {
			$$alert: {
				value: function (content, callback, title, css) {
					Message.alert(...arguments);
				}
			},
			$$success: {
				value: function (content, callback, title, css) {
					Message.alert(content, callback, title, ["success", css].join(" "));
				}
			},
			$$error: {
				value: function (content, callback, title, css) {
					Message.alert(content, callback, title, ["error", css].join(" "));
				}
			},
			$$confirm: {
				value: function (content, callback, title, css) {
					Message.confirm(...arguments);
				}
			},
			$$prompt: {
				value: function (content, callback, title, cfg, css) {
					Message.prompt(...arguments);
				}
			}
		});
	}
};
