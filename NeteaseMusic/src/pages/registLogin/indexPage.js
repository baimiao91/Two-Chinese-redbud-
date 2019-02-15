/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:49
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-15 20:58:53
 */
import React from 'react';
import {
	connect
} from 'dva';
import style from './indexPage.scss';
import RouterView from '@/router/RouterView'

function IndexPage(props) {

	function hrefLogin() {
		console.log('props:::', props.history);
		props.history.push('/registl/login');
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