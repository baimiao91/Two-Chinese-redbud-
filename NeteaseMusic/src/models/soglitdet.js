/*
 * @Author: i白描
 * @Date:   2019-02-26 20:43:14
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-27 09:01:37
 */

import {
	getSogLitDet,
	getSongsDet
} from '@/services/api';

export default {

	namespace: 'soglitdet',

	state: {
		soglitdet: {}
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
			let songid = rest.data.privileges.map(item => item.id).join(',');
			console.log('songid:::::', songid, rest);
			if (songid) {
				let songsList = yield call(getSongsDet, songid);
				if (songsList.data && songsList.data.code === 200) {
					songsList.data.songs.forEach(item => {
						item.url = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
					})
					console.log('songsList:::::::', songsList);
				}
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