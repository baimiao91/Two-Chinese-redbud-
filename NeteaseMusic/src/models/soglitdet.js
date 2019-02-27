/*
 * @Author: i白描
 * @Date:   2019-02-26 20:43:14
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-27 11:56:23
 */

import {
	getSogLitDet,
} from '@/services/api';

export default {

	namespace: 'soglitdet',

	state: {
		soglitdet:{},
		songsList:[]
	},

	subscriptions: {},

	effects: {
		* getSogLitDet({
			payload
		}, {
			call,
			put
		}) {
			let rest = yield call(getSogLitDet, payload);
			if (rest.data && rest.data.code === 200) {
				rest.data.playlist.tracks.forEach(item=>{
					item.url = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
				})
				yield put({
					type:'updateState',
					payload:{
						songsList:[...rest.data.playlist.tracks],
						soglitdet:{...rest.data.playlist}
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