/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:55
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-18 10:07:38
 */
import React from 'react';
import {
	connect
} from 'dva';
import styles from './indexPage.scss';
import Cloud from '@/assets/cloud.png';

function IndexPage(props) {
	// console.log('props::::', props);

	return (
		<div className={styles.mineContainer}>
			<div className={styles.headerMine}>
				<img src={Cloud} alt=""/>
				<p>我的音乐</p>
				<img src={Cloud} alt=""/>
			</div>
		</div>
	);
}


export default connect()(IndexPage);