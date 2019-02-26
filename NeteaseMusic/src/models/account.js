/*
 * @Author: i白描
 * @Date:   2019-02-18 20:30:58
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-26 17:01:26
 */
import {
	getUserDetail
} from '@/services/api'

export default {

	namespace: 'account',

	state: {
		userDet: {},
		profile: {}
	},


	effects: {
		* getUserDet({
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
							...res.data
						},
						profile: {
							...res.data.profile
						}
					}
				})
			}
		},
	},

	reducers: {
		updateState(state, action) {
			return {
				...state,
				...action.payload
			}
		}
	}

};