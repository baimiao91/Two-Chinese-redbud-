/*
 * @Author: i白描
 * @Date:   2019-02-15 19:00:48
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-15 19:01:59
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