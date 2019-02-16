/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:49
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-16 08:54:32
 */
import React, {
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import style from './indexPage.scss';
import RouterView from '@/router/RouterView'

function IndexPage(props) {
	useEffect(() => {}, [])
	console.log('props:::登陆注册首页：：', props);

	function hrefLogin() {
		console.log('props:::', props);
		if (props.location.search) {
			props.history.push(`/registl/login${props.location.search}`);
		} else {
			props.history.push(`/registl/login`);
		}
	}

	return (
		<div className={style.indexContainer}>
			<RouterView routes={props.routes}></RouterView>
			<div className={style.btnCon}>
				<p>
					注册
				</p>
				<p onClick={()=>hrefLogin()}>
					登录
				</p>
			</div>
		</div>
	);
}


export default connect()(IndexPage);