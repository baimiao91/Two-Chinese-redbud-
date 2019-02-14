/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:53
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-14 20:48:48
 */
import React from 'react';
import {
	connect
} from 'dva';
// import styles from './indexPage.scss';

function IndexPage(props) {
	// console.log('props::::', props);

	return (
		<div>
			<p>hostStation</p>
		</div>
	);
}


export default connect()(IndexPage);