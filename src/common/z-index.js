let index = 100;
export default {
	getZIndex() {
		return (index += 10);
	},

	getCurZIndex() {
		return index;
	}
};
