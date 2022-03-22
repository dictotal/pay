const ACTION = {
	SHOW_HELP_PAGE: "showHelpPage",
	OPEN_WINDOW: "openWindow",
	CAN_OPEN_URL: "canOpenUrl"
};

let tools = {
	isMobile() {
		return /(iPhone|iPad|iPod|iOS|Android|Adr)/.test(navigator.userAgent);
	},
	isIOS() {
		return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent);
	},
	isAndroid() {
		return /(Android|Adr)/.test(navigator.userAgent);
	},
	isWechat() {
		return /(MicroMessenger|WebBrowser)/.test(navigator.userAgent);
	},

	isQQ() {
		return / QQ\//i.test(navigator.userAgent);
	},
	addZero(n) {
		return n < 10 ? "0" + n : n;
	},

	isApp: typeof appInterface !== "undefined",

	ACTION: ACTION,

	mul: function (a, b) {
		let m = this._getMultiples([a, b]);
		let n1 = this._float2Int(a, m);
		let n2 = this._float2Int(b, m);
		return (n1 * n2) / Math.pow(m, 2);
	},

	sub: function (a, b) {
		let m = this._getMultiples([a, b]);
		let n1 = this._float2Int(a, m);
		let n2 = this._float2Int(b, m);
		return (n1 - n2) / m;
	},
	_float2Int: function (num, n) {
		return Math.round(num * n);
	},
	_getMultiples: function (list) {
		let lengthList = [],
			temp;
		list.forEach(function (item) {
			temp = item.toString().split(".");
			lengthList.push(temp[1] ? temp[1].length : 0);
		});
		let n = Math.max.apply(null, lengthList);
		return Math.pow(10, n);
	},

	responseInit(temp, rsp = {}) {
		if (!temp) {
			return rsp;
		}
		return Object.assign({}, temp, rsp);
	},

	formSubmit: function (queryMap, actionUrl, method, isNewWindow) {
		let formEl = document.createElement("form");
		formEl.action = actionUrl;
		formEl.method = (method || "POST").toUpperCase();
		formEl.style.display = "none";
		if (isNewWindow) {
			formEl.target = "_blank";
		}

		for (let k in queryMap) {
			let input = document.createElement("input");
			input.name = k;
			input.value = queryMap[k];
			formEl.appendChild(input);
		}

		document.body.appendChild(formEl);
		formEl.submit();

		document.body.removeChild(formEl);
	},

	map2get: function (queryMap) {
		let list = [];
		for (let k in queryMap) {
			list.push(k + "=" + encodeURIComponent(queryMap[k]));
		}
		return list.join("&");
	},

	copyToClipboard: function (str) {
		let aux = document.createElement("input");
		aux.setAttribute("value", str);
		aux.setAttribute("readonly", "readonly");
		document.body.appendChild(aux);
		aux.select();
		if (aux.setSelectionRange) {
			aux.setSelectionRange(0, 9999);
		}
		document.execCommand("copy");
		document.body.removeChild(aux);
		aux = null;
	},

	toMoney(value) {
		let reg = /\B(?=(?:\d{3})+\b)/g;
		return value ? value.toString().replace(reg, ",") : "0";
	},

	once(fn) {
		let isCalled = false;
		return function () {
			if (isCalled) {
				return false;
			}
			isCalled = true;
			fn();
		};
	},
	moneyInternational(money) {
		return money ? money.toString().replace(/\B(?=(?:\d{3})+\b)/g, ",") : "";
	}
};

tools.postMessage = function (action, params) {
	if (tools.isApp) {
		let methodName;
		switch (action) {
			case ACTION.SHOW_HELP_PAGE:
				if (params === "alipay") {
					methodName = "showAlipayHelp";
				} else {
					methodName = "showWechatpayHelp";
				}
				break;

			case ACTION.OPEN_WINDOW:
				methodName = "openWindow";
				break;
		}

		if (appInterface[methodName]) {
			appInterface[methodName](params);
		}
	} else {
		window.parent.postMessage({params: params, action: action}, "*");
	}
};

tools.openNewWindow = function (url, isFullScreen, vurRef) {
	if (tools.isApp) {
		tools.postMessage(ACTION.OPEN_WINDOW, location.origin + url);
		return false;
	}
	let screenH = window.screen.availHeight,
		screenW = window.screen.availWidth;
	let w = isFullScreen ? screenW : 800,
		h = isFullScreen ? screenH : 600;
	let top = (screenH - h) / 2;
	let left = (screenW - w) / 2;
	function open() {
		return window.open(
			url,
			"_blank",
			"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=" +
				w +
				",height=" +
				h +
				",left=" +
				left +
				",top=" +
				top
		);
	}
	let ref = open();

	if (ref === null) {
		vurRef.$$alert("弹出窗口被阻止，请点击右上角，允许打开新窗口");
	}
};

let __monkey = "Ks";
Object.defineProperty(tools, "moneyKey", {
	get() {
		return __monkey;
	}
});
tools.setMoneyKey = moneyKey => {
	__monkey = moneyKey;
};

export default tools;
