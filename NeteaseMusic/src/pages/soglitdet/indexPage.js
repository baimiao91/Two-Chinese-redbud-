/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:53
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-27 08:51:20
 */
import React, {
	useEffect
} from 'react';
import {
	connect
} from 'dva';
// import styles from './indexPage.scss';

function IndexPage(props) {
	console.log('props::::歌单详情：：：', props);

	useEffect(() => {
		props.getSogLitDet(props.match.params.ids)
	}, [])

	return (
		<div>
			<div className="header">
				<span onClick={()=>window.history.back()}>返回</span>
			</div>
			<p>songlist det</p>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		sglDetStore: state.soglitdet
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSogLitDet: payload => { // 获取歌单详情
			dispatch({
				type: 'soglitdet/getSogLitDet',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);