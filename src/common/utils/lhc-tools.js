import {_$i18n} from "@/common/i18n";
let ZODIAC = [
	_$i18n("common.utils.lhc-tools.txt_1", "鼠"),
	_$i18n("common.utils.lhc-tools.txt_2", "牛"),
	_$i18n("common.utils.lhc-tools.txt_3", "虎"),
	_$i18n("common.utils.lhc-tools.txt_4", "兔"),
	_$i18n("common.utils.lhc-tools.txt_5", "龙"),
	_$i18n("common.utils.lhc-tools.txt_6", "蛇"),
	_$i18n("common.utils.lhc-tools.txt_7", "马"),
	_$i18n("common.utils.lhc-tools.txt_8", "羊"),
	_$i18n("common.utils.lhc-tools.txt_9", "猴"),
	_$i18n("common.utils.lhc-tools.txt_10", "鸡"),
	_$i18n("common.utils.lhc-tools.txt_11", "狗"),
	_$i18n("common.utils.lhc-tools.txt_12", "猪")
];
let SEBO = [
	_$i18n("common.utils.lhc-tools.txt_13", "红波"),
	_$i18n("common.utils.lhc-tools.txt_14", "蓝波"),
	_$i18n("common.utils.lhc-tools.txt_15", "绿波")
];
let RED = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"];
let BLUE = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"];
let GREEN = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"];

let SEBO_LIST = [RED, BLUE, GREEN];

let ONE = ["01", "13", "25", "37", "49"],
	TWO = ["02", "14", "26", "38"],
	THREE = ["03", "15", "27", "39"],
	FOUR = ["04", "16", "28", "40"],
	FIVE = ["05", "17", "29", "41"],
	SIX = ["06", "18", "30", "42"],
	SEVEN = ["07", "19", "31", "43"],
	EIGHT = ["08", "20", "32", "44"],
	NINE = ["09", "21", "33", "45"],
	TEN = ["10", "22", "34", "46"],
	ELEVEN = ["11", "23", "35", "47"],
	TWELVE = ["12", "24", "36", "48"];

let ZODIAC_LIST = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, ELEVEN, TWELVE];

function getC(year) {
	let _year = Math.floor(year / 100) + 1;
	let C;
	switch (_year) {
		case 20:
			C = 4.6295;
			break;
		case 21:
			C = 3.87;
			break;
		case 22:
			C = 4.15;
			break;
		default:
			C = 3.87;
	}
	return C;
}

function getSpringDay(year) {
	let Y = year % 100,
		D = 0.2422,
		C = getC(year),
		L = (Y - 1) / 4;
	return Math.floor(Y * D + C) - Math.floor(L);
}

function getZodiacIdx(year, month, day) {
	let myPos = (year - 1900) % 12,
		springDay = getSpringDay(year);
	switch (month) {
		case 1:
			myPos = (myPos + 12 - 1) % 12;
			break;
		case 2:
			if (day < springDay) {
				myPos = (myPos + 12 - 1) % 12;
			}
			break;
	}
	return myPos;
}

//

function getZodiacNameMap() {
	let date = new Date();
	let startIdx = getZodiacIdx(date.getFullYear(), date.getMonth() + 1, date.getDate());
	let zodiacMap = {};
	for (let i = 1; i <= 12; i++) {
		zodiacMap[ZODIAC[startIdx]] = i.toString();
		startIdx = startIdx + 11;
		startIdx %= 12;
	}
	return zodiacMap;
}

function getZodiacValueMap() {
	let date = new Date();
	let startIdx = getZodiacIdx(date.getFullYear(), date.getMonth() + 1, date.getDate());
	let zodiacMap = {};
	for (let i = 1; i <= 12; i++) {
		zodiacMap[i.toString()] = ZODIAC[startIdx];
		startIdx = startIdx + 11;
		startIdx %= 12;
	}
	return zodiacMap;
}

function getZodiacValueList() {
	let date = new Date();
	let startIdx = getZodiacIdx(date.getFullYear(), date.getMonth() + 1, date.getDate());
	let zodiacList = [];
	for (let i = 1; i <= 12; i++) {
		zodiacList.push(ZODIAC[startIdx]);
		startIdx = startIdx + 11;
		startIdx %= 12;
	}
	return zodiacList;
}

function getSeBoValueMap() {
	return {
		1: {text: _$i18n("common.utils.lhc-tools.txt_16", "红"), type: "red", value: "1"},
		2: {text: _$i18n("common.utils.lhc-tools.txt_17", "蓝"), type: "blue", value: "2"},
		3: {text: _$i18n("common.utils.lhc-tools.txt_18", "绿"), type: "green", value: "3"}
	};
}

function getZodiacValue(num) {
	let index = ZODIAC_LIST.findIndex(value => value.includes(num));
	return index !== undefined ? index + 1 : index;
}

function getZodiacNumberMap() {
	return {
		1: ONE,
		2: TWO,
		3: THREE,
		4: FOUR,
		5: FIVE,
		6: SIX,
		7: SEVEN,
		8: EIGHT,
		9: NINE,
		10: TEN,
		11: ELEVEN,
		12: TWELVE
	};
}

function getSeBoValue(num) {
	let index = SEBO_LIST.findIndex(value => value.includes(num));
	return index !== undefined ? index + 1 : index;
}

function getLhcResult(rs) {
	let results = [];
	let zodiacValueMap = getZodiacValueMap();
	let seboValueMap = getSeBoValueMap();
	rs.forEach(num => {
		let item = {};
		let zodiacType = getZodiacValue(num);
		let seboType = getSeBoValue(num);
		item.type = zodiacType;
		item.sx = zodiacValueMap[zodiacType];
		item.sb = seboValueMap[seboType] ? seboValueMap[seboType].type : "";
		item.num = num;
		results.push(item);
	});

	return results;
}

export default {
	getZodiacNameMap: getZodiacNameMap,
	getZodiacValueMap: getZodiacValueMap,
	getZodiacValueList: getZodiacValueList,
	getZodiacNumberMap: getZodiacNumberMap,
	getSeBoValueMap: getSeBoValueMap,
	getSeBoValue: getSeBoValue,
	getLotteryResult: getLhcResult
};
