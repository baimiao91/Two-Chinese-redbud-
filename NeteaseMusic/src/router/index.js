/*
 * @Author: i白描
 * @Date:   2019-02-14 18:36:36
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-14 20:50:37
 */

import React from 'react';
import {
	Router
} from 'dva/router';

// 引入配置路由文件
import RouterView from './RouterView';

// 引入一级路由组件
import MainPage from '../pages/MainPage';
// 引入二级路由组件
import DiscoverPage from '../pages/discover/indexPage'
import VideoPage from '../pages/video/indexPage'
import MinePage from '../pages/mine/indexPage'
import FriendPage from '../pages/friend/indexPage'
import AccountPage from '../pages/account/indexPage'

// 引入三级路由组件
import RecommendPage from '../pages/discover/recommend/indexPage'
import HostStationPage from '../pages/discover/hostStation/indexPage'


let config = {
	routes: [{
		path: '/main',
		component: MainPage,
		children: [{
			path: '/main/discover',
			component: DiscoverPage,
			children: [{
				path: '/main/discover/recommend',
				component: RecommendPage
			}, {
				path: '/main/discover/hoststation',
				component: HostStationPage
			}, ]
		}, {
			path: '/main/video',
			component: VideoPage
		}, {
			path: '/main/mine',
			component: MinePage
		}, {
			path: '/main/friend',
			component: FriendPage
		}, {
			path: '/main/account',
			component: AccountPage
		}, ]
	}, {
		path: '*',
		redirect: '/main/discover/recommend'
	}]
}

export default function RouterConfig({
	history
}) {
	return (
		<Router history={history}>
    	<RouterView routes={config.routes}></RouterView>
    </Router>
	);
}