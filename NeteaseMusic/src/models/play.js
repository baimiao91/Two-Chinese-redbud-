/*
 * @Author: i白描
 * @Date:   2019-02-20 13:39:25
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-20 20:33:44
 */

import {
	getSongsDet,
	getSongUrl
} from '@/services/api';

export default {

	namespace: 'player',

	state: {
		liveSong: {}, // 当前播放歌曲内容
		songList: [], // 歌曲列表
		songUrl: {} // 歌曲url
	},

	effects: {
		// 获取播放歌曲详情
		* getPlaySong({
			payload
		}, {
			call,
			put
		}) {
			let songRest = yield call(getSongsDet, payload);
			let songUrlRest = yield call(getSongUrl, payload);
			console.log('easda:', songUrlRest);
			if (songRest.data && songRest.data.code === 200) {
				yield put({
					type: 'updateState',
					payload: {
						liveSong: songRest.data.songs[0],
						songList: songRest.data.songs,
						songUrl: songUrlRest.data.data[0]
					}
				})
			}
		}
	},

	reducers: {
		updateState(state, action) {
			return { ...state,
				...action.payload
			};
		},
	},

};