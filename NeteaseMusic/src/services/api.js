import request from '../utils/request';

// 获取轮播
export function forBanner() {
	return request('/banner')
}

// 获取推荐歌单
export function forReSongList() {
	return request('/personalized')
}

// 唤起登录
export function login(phone, password) {
	return request(`/login/cellphone?phone=${phone}&password=${password}`)
}

// 获取用户详情
export function getUserDetail(uid) {
	return request(`/user/detail?uid=${uid}`)
}