/*
 * @Author: i白描
 * @Date:   2019-02-14 10:51:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-03-17 15:09:30
 */

import {
	forBanner,
	forReSongList,
	forDayRecomm
} from '@/services/api';

export default {

	namespace: 'found',

	state: {
		banner: [],
		reSongList: []
	},

	effects: {
		* forBanner({
			payload
		}, {
			call,
			put
		}) {
			let res = yield forBanner();
			yield put({
				type: 'updateState',
				payload: {
					banner: res.data.banners
				}
			})
		},
		* forReSongList({
			payload
		}, {
			call,
			put
		}) {
			let res = yield forReSongList();
			// console.log('data:forReSongList::', res);
			if (res.data.code && res.data.code === 200) {
				let list = res.data.result.slice(0, 6);
				list.map((item, index) => {
					if (item.playCount > 100000 && item.playCount < 100000000) {
						return item.playCount = parseInt(item.playCount / 10000).toString() + '万'
					} else if (item.playCount > 100000000) {
						return item.playCount = parseInt(item.playCount / 100000000).toString() + '亿'
					}
					return item;
				})
				yield put({
					type: 'updateState',
					payload: {
						reSongList: list
					}
				})
			}
		},
		*forDayRecomm({
			payload
		},{
			call,
			put
		}) {
			let rest = yield forDayRecomm();
			console.log('每日推荐：：：：：',rest);
		}
	},

	reducers: {
		updateState(state, {
			payload
		}) {
			return {
				...state,
				...payload
			};
		},
	}

};