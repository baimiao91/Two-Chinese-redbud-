/*
 * @Author: i白描
 * @Date:   2019-02-13 18:49:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-19 11:41:33
 */


import React from 'react';
import {
	NavLink
} from 'dva/router';
import {
	connect
} from 'dva';
import RouterView from '../../router/RouterView'

import styles from './indexPage.scss';

function IndexPage(props) {
	console.log('props::::discover::', props);

	function hrefSearch() {
		props.history.push({
			pathname: '/search'
		})
	}

	return (
		<div className={styles.discoverContainer}>
			<div className={styles.redbud}>
				<div className={styles.header_tab}>
					<div className={styles.header}>
						<span className={styles.bgImgMkf} />
						<p className={styles.iptVis}>
							<b className={styles.wantLike} onClick={()=>hrefSearch()} >猜你喜欢 白描<span className={styles.bgSearch} /></b>
						</p>
						<span className={styles.bgImgPd} />
					</div>
					<div className={styles.tab}>
						<div className={styles.changeView}>
							<NavLink to="/main/discover/recommend" className={styles.atag}>个性推荐</NavLink>
							<NavLink to="/main/discover/hoststation" className={styles.atag}>主播电台</NavLink>
						</div>
					</div>
					
				</div>
				<div className={styles.otherCont}>
					<RouterView routes={props.routes} ></RouterView>
				</div>
			</div>
    </div>
	);
}

IndexPage.propTypes = {};

export default connect()(IndexPage);