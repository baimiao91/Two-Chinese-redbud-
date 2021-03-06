/*
 * @Author: i白描
 * @Date:   2019-02-14 18:36:36
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-27 10:13:58
 */

import React from 'react';
import {
	Router
} from 'dva/router';

// 实现路由懒加载，按需引入
import dynamic from 'dva/dynamic';

// 引入配置路由文件
import RouterView from './RouterView';

// 引入一级路由组件
// import MainPage from '@/pages/MainPage';
// import LoginRegistPage from '@/pages/registLogin/indexPage'
// import SearchPage from '@/pages/search/indexPage'
// import PlayPage from '@/pages/player/indexPage'
// import SogLitDetPage from '@/pages/soglitdet/indexPage'
// 引入二级路由组件
// import DiscoverPage from '@/pages/discover/indexPage'
// import VideoPage from '@/pages/video/indexPage'
// import MinePage from '@/pages/mine/indexPage'
// import FriendPage from '@/pages/friend/indexPage'
// import AccountPage from '@/pages/account/indexPage'
// import LoginPage from '@/pages/registLogin/loginPage'

// 引入三级路由组件
// import RecommendPage from '@/pages/discover/recommend/indexPage'
// import HostStationPage from '@/pages/discover/hostStation/indexPage'


// 一级路由懒加载
const MainPage = dynamic({
  component: ()=>import('@/pages/MainPage')
})
const LoginRegistPage = dynamic({
  component: ()=>import('@/pages/registLogin/indexPage')
})
const SearchPage = dynamic({
  component: ()=>import('@/pages/search/indexPage')
})
const PlayPage = dynamic({
  component: ()=>import('@/pages/player/indexPage')
})
const SogLitDetPage = dynamic({
  component: ()=>import('@/pages/soglitdet/indexPage')
})

// 二级路由懒加载
const DiscoverPage = dynamic({
  component: ()=>import('@/pages/discover/indexPage')
})
const VideoPage = dynamic({
  component: ()=>import('@/pages/video/indexPage')
})
const MinePage = dynamic({
  component: ()=>import('@/pages/mine/indexPage')
})
const FriendPage = dynamic({
  component: ()=>import('@/pages/friend/indexPage')
})
const AccountPage = dynamic({
  component: ()=>import('@/pages/account/indexPage')
})
const LoginPage = dynamic({
  component: ()=>import('@/pages/registLogin/loginPage')
})

// 三级路由懒加载
const RecommendPage = dynamic({
  component: ()=>import('@/pages/discover/recommend/indexPage')
})
const HostStationPage = dynamic({
  component: ()=>import('@/pages/discover/hostStation/indexPage')
})


// 路由配置数组
let config = {
	routes: [{
		path: '/registl',
		component: LoginRegistPage,
		children: [{
			path: '/registl/login',
			component: LoginPage
		}]
	}, {
		path: '/search',
		component: SearchPage
	}, {
		path: '/play/:ids?',
		component: PlayPage
	}, {
		path: '/soglitdet/:ids?',
		component: SogLitDetPage
	}, {
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