export default {
	install(Vue) {
		let reg = /\B(?=(?:\d{3})+\b)/g;
		Vue.filter("money", function (value) {
			return value ? value.toString().replace(reg, ",") : "0";
		});

		Vue.filter("toFixed", function (value) {
			if ((value !== 0 && !value) || isNaN(value)) {
				return "-";
			}

			let n = parseFloat(value),
				str = n.toString();
			let idx = str.indexOf(".");
			if (idx !== -1 && str.length - idx > 2) {
				return str.substring(0, idx + 3);
			}
			return n.toFixed(2);
		});

		Vue.filter("bankcard", function (value) {
			let max = value.length;
			let start = value.substring(0, 6);
			let middle = value.substring(6, max - 3);
			let last = value.substring(max - 3, max);

			return start + middle.replace(/./g, "*") + last;
		});
	}
};
