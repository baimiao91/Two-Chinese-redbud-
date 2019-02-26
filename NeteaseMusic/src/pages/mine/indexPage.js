/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:55
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-26 20:41:44
 */
import React, {
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import {
	getToken
} from '@/utils/index';
import styles from './indexPage.scss';
import Cloud from '@/assets/cloud.png';

function IndexPage(props) {
	console.log('props::::mine:::::', props);

	// 获取用户id，调试user歌单
	useEffect(() => {
		props.getUserDet({
			uid: getToken()
		})
	}, [])

	// user歌单
	useEffect(() => {

		if (props.mineStore.userDet.userId) {
			props.getUserSongsList({
				uid: props.mineStore.userDet.userId
			})
		}
	}, [props.mineStore.userDet.userId])

	// 跳转歌单详情
	function hrefListDet(ids) {
		props.history.push({
			pathname: `/soglitdet/${ids}`
		})
	}

	return (
		<div className={styles.mineContainer}>
			<div className={styles.headerMine}>
				<img src={Cloud} alt=""/>
				<p>我的音乐</p>
				<img src={Cloud} alt=""/>
			</div>
			<div className="mineSongList">
				<p>你创建的歌单：：：</p>
				<div className="playlist">
					{
						props.mineStore.playlist.length && props.mineStore.playlist.map((item,index)=>{
							return <div key={index} className="listItem" onClick={()=>hrefListDet(item.id)}>
								<p><img src={item.coverImgUrl} alt=""/></p>
								<div className="nameT">
									<h3>{item.name}</h3>
									<span>已有{item.trackCount}首</span>
								</div>
							</div>
						})
					}
				</div>
			</div> 
		</div>
	);
}

const mapStateToProps = state => {
	return {
		mineStore: state.mine
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUserDet: payload => {
			dispatch({
				type: 'mine/getUserDet',
				payload
			})
		},
		getUserSongsList: payload => {
			dispatch({
				type: 'mine/getUserSongsList',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);