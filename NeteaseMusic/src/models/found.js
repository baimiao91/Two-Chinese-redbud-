/*
 * @Author: i白描
 * @Date:   2019-02-14 10:51:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-15 09:03:42
 */

import {
	forBanner
} from '../services/api';

export default {

	namespace: 'found',

	state: {
		banner: []
	},

	effects: {
		* forBanner({
			payload
		}, {
			call,
			put
		}) {
			let res = yield forBanner();
			console.log('data:::::banner::', res);
			yield put({
				type: 'updateState',
				payload: {
					banner: res.data.banners
				}
			})
		},
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