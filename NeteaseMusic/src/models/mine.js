/*
 * @Author: i白描
 * @Date:   2019-02-26 16:48:44
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-26 19:49:11
 */
import {
	getUserDetail,
	getUserSongsList
} from '@/services/api';

export default {

	namespace: 'mine',

	state: {
		playlist: [],
		userDet: {}
	},

	effects: {
		* getUserDet({ // 用户详情
			payload
		}, {
			call,
			put
		}) { // eslint-disable-line
			let res = yield call(getUserDetail, payload.uid);
			console.log(res, '：：：用户信息');
			if (res.data && res.data.code === 200) {
				yield put({
					type: 'updateState',
					payload: {
						userDet: {
							...res.data.profile
						}
					}
				})
			}
		},
		* getUserSongsList({ // 用户歌单
			payload
		}, {
			call,
			put
		}) { // eslint-disable-line
			let res = yield call(getUserSongsList, payload.uid);
			console.log(res, '：：：用户歌单信息');
			if (res.data && res.data.code === 200) {
				yield put({
					type: 'updateState',
					payload: {
						playlist: [...res.data.playlist]
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