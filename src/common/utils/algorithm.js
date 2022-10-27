function match(index, elements) {
	let result = [];
	for (let i = 0; i < index.length; i++) {
		if (index[i] === 1) {
			result.push(elements[i]);
		}
	}
	return result;
}

function combination(elements, n) {
	let result = [];

	let m = elements.length;
	if (n > m) {
		return new Array(0);
	}

	let index = new Array(m);
	for (let i = 0; i < m; i++) {
		if (i < n) {
			index[i] = 1;
		} else {
			index[i] = 0;
		}
	}

	let flag = false;
	let pos = 0;
	let sum = 0;
	result.push(match(index, elements));

	if (m === n) {
		return result;
	}

	do {
		sum = 0;
		pos = 0;
		flag = true;

		for (let i = 0; i < m - 1; i++) {
			if (index[i] === 1 && index[i + 1] === 0) {
				index[i] = 0;
				index[i + 1] = 1;
				pos = i;
				break;
			}
		}

		for (let i = 0; i < pos; i++) {
			if (index[i] === 1) {
				sum++;
			}
		}

		for (let i = 0; i < pos; i++) {
			if (i < sum) {
				index[i] = 1;
			} else {
				index[i] = 0;
			}
		}

		for (let i = m - n; i < m; i++) {
			if (index[i] === 0) {
				flag = false;
				break;
			}
		}
		result.push(match(index, elements));
	} while (!flag);
	return result;
}

export default {
	combination: combination
};
