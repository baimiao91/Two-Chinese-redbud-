/*
 * @Author: i白描
 * @Date:   2019-02-26 20:43:14
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-26 20:48:09
 */

import {
	getSogLitDet
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
			console.log('歌单详情数据：：：', rest);
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