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

// 获取用户已有的歌单
export function getUserSongsList(uid) {
	return request(`/user/playlist?uid=${uid}`)
}

// 获取歌单详情
export function getSogLitDet(ids) {
	return request(`/playlist/detail?id=${ids}`)
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

// 获取歌曲详情 ?ids=传入音乐 id(支持多个 id, 用 , 隔开)
export function getSongsDet(ids) {
	return request(`/song/detail?ids=${ids}`)
}

// 获取歌曲url
// export function getSongUrl(ids) {
// 	return request(`/song/url?id=${ids}`)
// }

// 获取歌曲de 歌词
export function getLyric(ids) {
	return request(`/lyric?id=${ids}`)
}