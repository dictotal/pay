let StringUtils = {
	format(str, repArg) {
		return str.replace(/\{([\da-zA-Z]+)\}/g, function () {
			return repArg[arguments[1]] ? repArg[arguments[1]] : arguments[0];
		});
	}
};

export default StringUtils;
