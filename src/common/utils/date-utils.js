function format(date, pattern) {
	let r = {
		"y+": date.getFullYear(),
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		S: date.getMilliseconds()
	};
	for (let n in r) {
		if (r.hasOwnProperty(n)) {
			let reg = new RegExp("(" + n + ")");
			if (reg.test(pattern)) {
				let rs = r[n];
				rs = rs < 10 ? "0" + rs : rs;

				pattern = pattern.replace(RegExp.$1, rs);
			}
		}
	}
	return pattern;
}

const ZONE_MAP = {
	"-720": "Etc/GMT+12",
	"-660": "Etc/GMT+11",
	"-600": "Etc/GMT+10",
	"-570": "Pacific/Marquesas",
	"-540": "Etc/GMT+9",
	"-480": "Etc/GMT+8",
	"-420": "Etc/GMT+7",
	"-360": "Etc/GMT+6",
	"-300": "Etc/GMT+5",
	"-240": "Etc/GMT+4",
	"-210": "Canada/Newfoundland",
	"-180": "Etc/GMT+3",
	"-120": "Etc/GMT+2",
	"-60": "Etc/GMT+1",
	0: "Etc/GMT",
	60: "Etc/GMT-1",
	120: "Etc/GMT-2",
	180: "Etc/GMT-3",
	210: "Asia/Tehran",
	240: "Etc/GMT-4",
	270: "Asia/Kabul",
	300: "Etc/GMT-5",
	330: "Asia/Kolkata",
	345: "Asia/Kathmandu",
	360: "Etc/GMT-6",
	390: "Asia/Rangoon",
	420: "Etc/GMT-7",
	480: "Etc/GMT-8",
	525: "Australia/Eucla",
	540: "Etc/GMT-9",
	570: "Australia/Adelaide",
	600: "Etc/GMT-10",
	630: "Australia/Lord_Howe",
	660: "Etc/GMT-11",
	720: "Etc/GMT-12",
	765: "Pacific/Chatham",
	780: "Etc/GMT-13",
	840: "Etc/GMT-14"
};

function getZoneFromMap(offset) {
	return ZONE_MAP["" + offset];
}

function getLocalTimeZone() {
	let timeZoneOffset = -new Date().getTimezoneOffset();

	let zone = getZoneFromMap(timeZoneOffset);
	if (zone === undefined) {
		timeZoneOffset = timeZoneOffset - (timeZoneOffset % 10);
		while (zone === undefined) {
			timeZoneOffset += 5;
			zone = getZoneFromMap(timeZoneOffset);

			if (timeZoneOffset > 840 || timeZoneOffset < -720) {
				break;
			}
		}
	}
	return zone;
}

export default {
	format: format,
	getLocalTimeZone: getLocalTimeZone
};
