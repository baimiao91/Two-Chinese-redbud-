/*
 * @Author: i白描
 * @Date:   2019-02-15 18:50:29
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-19 15:07:40
 */
import {
	routerRedux
} from 'dva/router';
import {
	login
} from '@/services/api'
import {
	setToken,
	getToken
} from '@/utils/index';

export default {

	namespace: 'login',

	state: {
		loginStatus: '',
		accoundMsg: {}
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) { // eslint-disable-line
			// console.log('history::::login::reducers', history);
			return history.listen(({
				pathname
			}) => {

				if (pathname.indexOf('/registl') === -1) {
					// 做Token检测
					if (!getToken()) {
						//利用redux做路由跳转
						console.log('pathname:::跳转前：：：', pathname);
						dispatch(routerRedux.replace({
							pathname: `/registl?r=${encodeURIComponent(pathname)}`
						}))
					}
				}
			})
		},
	},

	effects: {
		* login({
			payload
		}, {
			call,
			put
		}) { // eslint-disable-line
			let res = yield call(login, payload.phone, payload.password)
			console.log(res, '::::登录res');
			if (res.data && res.data.code === 200) {
				setToken(res.data.account.id)
				yield put({
					type: 'updateState',
					payload: {
						loginStatus: 'success',
						accountMsg: res.data.account
					}
				})
			} else {
				yield put({
					type: 'updateState',
					payload: {
						loginStatus: 'fail'
					}
				})
			}
		},
	},

	reducers: {
		updateState(state, action) {
			return { ...state,
				...action.payload
			};
		},
	},

};