/*
 * @Author: i白描
 * @Date:   2019-02-13 18:49:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-14 20:56:50
 */


import React, {
	useEffect
} from 'react';
import {
	NavLink
} from 'dva/router';
import {
	connect
} from 'dva';
import RouterView from '../../router/RouterView'

import styles from './indexPage.scss';

function IndexPage(props) {
	console.log('props::::', props);

	// 在hooks中使用useEffect处理异步操作
	useEffect(() => {
		props.forBanner();

	}, []);


	return (
		<div className={styles.discoverContainer}>
			<div className={styles.redbud}>
				<div className={styles.header_tab}>
					<div className={styles.header}>
						<span className={styles.bgImgMkf} />
						<p className={styles.iptVis}>
							<b className={styles.wantLike}>猜你喜欢 白描<span className={styles.bgSearch} /></b>
						</p>
						<span className={styles.bgImgPd} />
					</div>
					<div className={styles.tab}>
						<div className={styles.changeView}>
							<NavLink to="/main/discover/recommend">个性推荐</NavLink>
							<NavLink to="/main/discover/hoststation">主播电台</NavLink>
						</div>
					</div>
				</div>
				<div className={styles.otherCont}>
					RouterView
				</div>
			</div>
    </div>
	);
}

IndexPage.propTypes = {};

const mapStateToProps = state => {
	console.log('state::::', state);
	return state
}

const mapDispatchToProps = dispatch => {
	return {
		forBanner: () => {
			dispatch({
				type: 'found/forBanner'
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);