/*
 * @Author: i白描
 * @Date:   2019-02-15 19:00:48
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-24 20:59:42
 */
import Cookie from 'js-cookie';

export function setToken(token) {
	Cookie.set('Wy_Token', token, {
		expires: 3
	})
}

export function getToken() {
	return Cookie.get('Wy_Token')
}

export function removeToken() {
	Cookie.remove('Wy_Token')
}


// 格式化时间
export function formatTime(time) {
	let min = Math.floor(time / 60),
		sec = Math.floor(time % 60);
	return `${min>9?min:'0'+min}:${sec>9?sec:'0'+sec}`
}

// 歌词时间格式
export function toSec(times) {
	let arr = times.split(':');
	return (arr[0] * 60 + arr[1] * 1).toFixed(2);
}