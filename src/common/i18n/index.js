let languageMap = {};

console.log(window.lang, 'window.lang')
let currLanguage = window.lang || 'en'

function changeLanguage(curr) {
	currLanguage = curr || window.lang;
	document.body.setAttribute("lang", "lan-" + curr);
}

function _findDeedValue(keyList, source) {
	let temp = source,
		passCount = 0;

	if (source === undefined) {
		return "";
	}
	for (let i = 0; i < keyList.length; i++) {
		let k = keyList[i];
		if (temp[k] === undefined) {
			break;
		} else {
			temp = temp[k];
			passCount++;
		}
	}

	return passCount === keyList.length ? temp : "";
}

function _translate(id, replace) {
    let rs = _findDeedValue(id.split("."), languageMap);
	if (rs) {
		if (replace) {
			if (replace.el) {
				rs = rs.replace(/\[\[(.+?)\]\]/g, function (match, $1) {
					return replace.el.replace("$$", $1);
				});
			}
			rs = rs.replace(/\{\{([^}]+)\}\}/g, function (match, $1) {
				return replace[$1];
			});
		}
	} else {
		rs = id;
	}

	return rs;
}

function _$i18n(id, replace) {
	let isNeedReplace = typeof replace === "string";
	return isNeedReplace ? _translate(id) : _translate(id, replace);
}

function install(Vue) {
	Vue.directive("i18n", function (el, binding) {
		el.innerHTML = _translate(binding.value);
	});

	Object.defineProperty(Vue.prototype, "$i18n", {
		value: _$i18n,
		writable: false
	});
}

function mergeObject(base, target) {
	if (typeof base !== "object" || typeof target !== "object") {
		return false;
	}

	target = JSON.parse(JSON.stringify(target));

	function merge(A, B) {
		for (let k in B) {
			let a = A[k],
				b = B[k];
			if (typeof a === "object") {
				if (typeof b === "object") {
					merge(a, b);
				} else {
					A[k] = b;
				}
			} else {
				A[k] = b;
			}
		}
	}

	merge(base, target);
}

function injectLanguage(langMap, isSingleLanguage) {
	let lang = isSingleLanguage ? langMap : langMap[currLanguage];

	if (typeof lang === "object") {
		mergeObject(languageMap, lang);
	}
}
changeLanguage(currLanguage);
export default {
	install
};
export {_$i18n, changeLanguage, injectLanguage};
