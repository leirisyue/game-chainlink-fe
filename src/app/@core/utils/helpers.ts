
export function replaceName(str: any) {
	if (!str) { return; }
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');

	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');

	// ? dau cau
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

	return str;
}

export function sortDate(array: any[], value: string, isIncrease: boolean) {
	return isIncrease ?
		array.sort((a, b) => new Date(a[value]).getTime() - new Date(b[value]).getTime()) :
		array.sort((a, b) => new Date(b[value]).getTime() - new Date(a[value]).getTime())
}

export function isTaxCode(keyCode, ctrlKey, altKey, shiftKey) {
	return isNumberKey(keyCode, ctrlKey, altKey, shiftKey) || keyCode == 189 || keyCode == 109
}

export function isNumberKey(keyCode, ctrlKey, altKey, shiftKey) {
	return (ctrlKey || altKey
		|| (47 < keyCode && keyCode < 58 && shiftKey == false)
		|| (95 < keyCode && keyCode < 106)
		|| (keyCode == 8) || (keyCode == 9)
		|| (keyCode > 34 && keyCode < 40)
		|| (keyCode == 46))
}

export function isTextKey(keyCode) {
	return (keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32
}

export function isNotFound(list: string[], value: string) {
	try {
		return value && !list.find(f => f.toLowerCase() === value?.toLowerCase())
	} catch (error) { }
}

export function toLowerCaseTrim(value: string) {
	if (typeof value !== 'string') { return }
	return replaceName(value?.toLowerCase()?.trim())
}

export function shortenedNumber(value: number) {
	const decimal = 100
	return Math.round((value * decimal / 1000000)) / decimal
}

export function roundNumber(value: number, decimal: number) {
	const inputNumber = isNaN(value) ? 0 : value
	const d = decimal < 0 ? 1 : 10 ** decimal
	return Math.round((inputNumber * d)) / d
}

import VNnum2words from 'vn-num2words';
export function numberToText(value: number) {
	if (!value) { return }
	let text = VNnum2words(value)
	text = text.charAt(0).toUpperCase() + text.slice(1)
	return text + ' đồng.'
}

// export function findObject(array: any[], key1: string, value: string, key2?: string, id?: string) {
// 	if (!array.length || !value) { return }
// 	if (typeof value === 'string') {
// 		return id ?
// 			array.find(f => toLowerCaseTrim(f[key1]) === toLowerCaseTrim(value) && toLowerCaseTrim(f[key2]) === toLowerCaseTrim(id)) :
// 			array.find(f => toLowerCaseTrim(f[key1]) === toLowerCaseTrim(value))
// 	}

// 	return id ?
// 		array.find(f => toLowerCaseTrim(f[key1]) === toLowerCaseTrim(value[key1]) && toLowerCaseTrim(f[key2]) === toLowerCaseTrim(id[key2])) :
// 		array.find(f => toLowerCaseTrim(f[key1]) === toLowerCaseTrim(value[key1]))

// }