/*
 * @Author: i白描
 * @Date:   2019-02-20 13:39:25
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-27 09:25:31
 */

import {
	getSongsDet,
	getLyric
} from '@/services/api';
import {
	toSec
} from '@/utils/index';


export default {

	namespace: 'player',

	state: {
		pattern: 0, //0代表单曲，1代表列表循环，2代表顺序播放，3代表随机播放
		liveSong: {}, // 当前播放歌曲内容
		playCurrent: -1, // 播放下标
		songList: window.localStorage.getItem('songList') && JSON.parse(window.localStorage.getItem('songList')) || [], // 歌曲列表
		lyric: {} // 歌词实例
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
					let current = playerState.songList.findIndex(item => item.id === playerState.liveSong.id)
					playerState = {
						liveSong: songRest.data.songs[0],
						playCurrent: current
					}
				}

				// console.log(songRest, ':::更改之后的songsRest');
				yield put({
					type: 'updateState',
					payload: playerState
				})
			}
		},
		* forLyric({
			payload
		}, {
			call,
			put
		}) {
			let rest = yield call(getLyric, payload);
			if (rest.data && rest.data.code === 200) {
				let lyrics = rest.data.lrc.lyric.split('\n');
				// 删除最后一项为空的歌词
				lyrics.filter(item => item);
				lyrics = lyrics.map((item, index) => {
					let arr = item.split(']');
					// 如果没有歌词，往后边找三项，补全歌词
					if (!arr[1] && index < lyrics.length - 2) {
						for (let i = index + 1, len = index + 3; i < len; i++) {
							let temp = lyrics[i].split(']');
							if (temp[1]) {
								arr[1] = temp[1];
								break;
							}
						}
						return arr.join(']');
					} else {
						return item;
					}
				})
				let times = [],
					texts = [];
				lyrics.forEach((item, index) => {
					let arr = item.replace('[', '').split(']');
					if (arr[0]) {
						times.push(toSec(arr[0]))
					}
					if (arr[1]) {
						texts.push({
							time: toSec(arr[0]),
							text: arr[1]
						})
					}
				})
				// console.log('geshihua秒数：：：', times, texts);
				let tLyric = {};
				tLyric.times = times;
				tLyric.texts = texts;
				yield put({
					type: 'updateState',
					payload: {
						lyric: tLyric
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
		changeSongPlayer(state, action) {
			let playCurrent = 0;
			if (action.payload === 'next') {
				if (state.pattern === 1) { // 列表循环模仿
					playCurrent = (state.playCurrent + 1) % state.songList.length;
				} else if (state.pattern === 3) { // 随机播放   根据播放列表的长度随机数
					let random = Math.round(Math.random() * state.songList.length);
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