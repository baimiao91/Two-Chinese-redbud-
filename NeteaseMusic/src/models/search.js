/*
 * @Author: i白描
 * @Date:   2019-02-19 14:51:17
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-20 11:35:57
 */

import {
	forSearchHot,
	forKeySearch,
	getTrueSongs
} from '@/services/api';

export default {

	namespace: 'search',

	state: {
		searchHot: [], //热门搜索
		keyRest: [], //推荐的搜索建议key值
		songsList: []
	},

	effects: {
		// 获取热门搜索
		* getHotSearch(_, {
			call,
			put
		}) {
			let rest = yield call(forSearchHot);
			if (rest.data && rest.data.code === 200) {
				yield put({
					type: 'updateState',
					payload: {
						searchHot: rest.data.result.hots
					}
				})
			}
		},
		// 获取实时的搜索建议
		* getKeySearch({
			payload
		}, {
			call,
			put
		}) {
			let rest = yield call(forKeySearch, payload);
			let tresult = [];
			if (Object.keys(rest.data.result).length) {
				let suggest = rest.data.result;
				suggest.order.forEach((item, index) => {
					suggest[item] && suggest[item].forEach((value, indx) => {
						value.type = item;
					})
					tresult = [...tresult, ...suggest[item]]
				})
			}

			yield put({
				type: 'updateState',
				payload: {
					keyRest: tresult
				}
			})
		},
		// s搜索歌曲
		* getTrueSongs({
			payload
		}, {
			call,
			put
		}) {
			let rest = yield call(getTrueSongs, payload);
			if (rest.data && rest.data.code === 200) {
				yield put({
					type: 'updateState',
					payload: {
						songsList: rest.data.result.songs
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