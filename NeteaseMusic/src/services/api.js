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

// 获取热门搜索
export function forSearchHot() {
	return request('/search/hot')
}

// 获取实时搜索key
export function forKeySearch(keyword) {
	return request(`/search/suggest?keywords=${keyword}&type=mobile`)
}

// 获取确定歌曲
export function getTrueSongs(keyword) {
	return request(`/search/?keywords=${keyword}`)
}