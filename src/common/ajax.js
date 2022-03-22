import {Msg} from "@/common/msg";

function _fetch(method = "POST", url, data = {}) {
	const cfg = {
		cache: "no-cache",
		headers: {
			"user-agent": "Mozilla/4.0 MDN Example",
			"content-type": "application/json"
		},
		method,
		mode: "cors"
	};
	if (method !== "GET") {
		cfg.body = JSON.stringify(data);
	}

	return fetch(url, cfg).then(response => {
		return response.json().then(json => {
			if (response.ok) {
				return json || {};
			} else {
				return Promise.reject(json);
			}
		});
	});
}

const $$ajax = {
	get(url, params = {}) {
		let paramsList = [];
		Object.keys(params).forEach(function (key) {
			paramsList.push(key + "=" + encodeURIComponent(params[key]));
		});

		url = url + (url.indexOf("?") !== -1 ? "&" + paramsList.join("&") : "?" + paramsList.join("&"));
		return _fetch("GET", url);
	},
	post(url, data) {
		return _fetch("POST", url, data);
	}
};

export {$$ajax};
