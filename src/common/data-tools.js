function $getData(key) {
	let rs = localStorage.getItem(key);

	if (rs) {
		let match = rs[0] + rs[rs.length - 1];
		if (match === "[]" || match === "{}" || rs === "true" || rs === "false") {
			rs = JSON.parse(rs);
		}
	}
	return rs;
}

function $setData(key, value) {
	if (typeof value === "object") {
		value = JSON.stringify(value);
	}
	localStorage.setItem(key, value);
}

export default {
	get: $getData,
	set: $setData
};
