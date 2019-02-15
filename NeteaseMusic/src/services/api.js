import request from '../utils/request';

// 获取轮播
export function forBanner() {
	return request('/banner')
}

// 唤起登录
export function login(phone, password) {
	return request(`/login/cellphone?phone=${phone}&password=${password}`)
}