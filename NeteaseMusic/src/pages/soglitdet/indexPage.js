/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:53
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-27 13:54:38
 */
import React, {
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import styles from './indexPage.scss';

function IndexPage(props) {
	// console.log('props::::歌单详情：：：', props);

	// 获取歌单详情
	useEffect(() => {
		props.getSogLitDet(props.match.params.ids)
	}, [])

	// 跳转播放页
	function hrefPlay(ids) {
		props.history.push({
			pathname:`/play/${ids}`
		})
		props.addSongsList(props.sglDetStore.songsList.map(item => item.id).join(','))
	}

	return (
		<div className={styles.soglitdetContainer}>
			<div className={styles.header}>
				<span onClick={()=>window.history.back()}>返回</span>
				<p>{props.sglDetStore.soglitdet.name}</p>
			</div>
			<div className={styles.songsList}>
				<ul className={styles.sglcon}>
					{
						props.sglDetStore.songsList && props.sglDetStore.songsList.length && props.sglDetStore.songsList.map((item,index)=>{
							return <li
									className={styles.listItem}
									key={index}
									onClick={()=>hrefPlay(item.id)}
								>
									<b>{index+1}</b>
									<p>{item.name}</p>
								</li>
						})
					}
				</ul>
			</div>
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
		},
		addSongsList: payload => { // 添加搜索的歌曲列表
			dispatch({
				type: 'player/getPlaySong',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);