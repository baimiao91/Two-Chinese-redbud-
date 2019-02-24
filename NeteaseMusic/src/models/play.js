/*
 * @Author: i白描
 * @Date:   2019-02-20 13:39:25
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-23 11:24:16
 */

import {
	getSongsDet
} from '@/services/api';

export default {

	namespace: 'player',

	state: {
		pattern: 0, //0代表单曲，1代表列表循环，2代表顺序播放，3代表随机播放
		liveSong: {}, // 当前播放歌曲内容
		playCurrent: -1, // 播放下标
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
			let playerState = yield select(state => state.player);
			// console.log('歌曲真实url::::', payload, songRest);
			if (songRest.data && songRest.data.code === 200) {
				songRest.data.songs.forEach(item => {
					item.url = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
				})

				if (payload.indexOf(',') !== -1) {
					window.localStorage.setItem('songList', JSON.stringify(songRest.data.songs));
					playerState = {
						songList: songRest.data.songs
					}
				} else {
					let current = playerState.songList.findIndex(item => item.id === songRest.data.songs[0].id)
					playerState = {
						liveSong: songRest.data.songs[0],
						playCurrent: current
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
		changeSongPlayer(state, action) {
			let playCurrent = 0;
			if (action.payload === 'next') {
				if (state.pattern === 1) { // 列表循环模仿
					playCurrent = (state.playCurrent + 1) % state.songList.length;
				} else if (state.pattern === 3) { // 随机播放   根据播放列表的长度随机数
					let random = Math.round(Math.random() * state.songList.length);
					console.log(random);
					playCurrent = random;
				} else if (state.pattern === 2) {
					playCurrent = (state.playCurrent + 1) % state.songList.length;
				}
			}
			if (action.payload === 'prev') {
				if (state.pattern === 1) { // 列表循环模仿
					playCurrent = (state.playCurrent - 1 + state.songList.length) % state.songList.length;
				} else if (state.pattern === 3) { // 随机播放   根据播放列表的长度随机数
					let random = Math.round(Math.random() * state.songList.length);
					console.log(random);
					playCurrent = random;
				} else if (state.pattern === 2) {
					playCurrent = (state.playCurrent - 1 + state.songList.length) % state.songList.length;
				}
			}
			return {
				...state,
				playCurrent,
				liveSong: state.songList[playCurrent]
			}
		},
		directPlayCurrent(state, action) {
			return {
				...state,
				playCurrent: action.payload,
				liveSong: state.songList[action.payload]
			}
		}
	},

};