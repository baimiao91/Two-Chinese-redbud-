/*
 * @Author: i白描
 * @Date:   2019-02-20 13:39:25
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-21 20:44:25
 */

import {
	getSongsDet,
	getSongUrl
} from '@/services/api';

export default {

	namespace: 'player',

	state: {
		pattern: 0, //0代表单曲，1代表列表循环，2代表顺序播放，3代表随机播放
		liveSong: {}, // 当前播放歌曲内容
		songList: window.localStorage.getItem('songList') && JSON.parse(window.localStorage.getItem('songList')) || [], // 歌曲列表
	},

	effects: {
		// 获取播放歌曲详情
		* getPlaySong({
			payload
		}, {
			call,
			put,
			select
		}) {
			let songRest = yield call(getSongsDet, payload);
			let songUrlRest = yield call(getSongUrl, payload);
			let playerState = yield select(state => state.player);
			console.log('歌曲真实url::::', payload, songRest);
			if (songRest.data && songRest.data.code === 200) {
				songRest.data.songs.forEach(item => {
					songUrlRest.data.data.forEach(value => {
						if (item.id === value.id) {
							item.url = value.url;
						}
					})
				})

				if (payload.indexOf(',') !== -1) {
					window.localStorage.setItem('songList', JSON.stringify(songRest.data.songs));
					playerState = {
						songList: songRest.data.songs
					}
				} else {
					playerState = {
						liveSong: songRest.data.songs[0]
					}
				}

				console.log(songRest, ':::更改之后的songsRest');
				yield put({
					type: 'updateState',
					payload: playerState
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