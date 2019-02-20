/*
 * @Author: i白描
 * @Date:   2019-02-20 12:01:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-20 19:32:17
 */
import React, {
	useEffect,
	useState
} from 'react';
import {
	connect
} from 'dva';
import './indexPage.scss';

function IndexPage(props) {
	console.log('props::::player::', props);
	let [tsinger, setTsinger] = useState('');

	// 获取歌曲详情
	useEffect(() => {
		props.getPlaySong(props.match.params.ids)
	}, [])

	// 设置标题
	useEffect(() => {
		if (props.playerStore.liveSong) {
			let singer = ''
			props.playerStore.liveSong.ar && props.playerStore.liveSong.ar.forEach((item, index) => {
				singer += item.name + '/'
			})
			setTsinger(singer.substring(0, singer.length - 1))
			document.title = props.playerStore.liveSong.name + ' - ' + singer.substring(0, singer.length - 1)
		}
	}, [props.playerStore.liveSong])

	if (!Object.keys(props.playerStore.liveSong).length) {
		return null;
	}

	return (
		<div className="playerContainer"
		>
			<div className="playBg" style={{backgroundImage:(Object.keys(props.playerStore.liveSong).length)?`url(${props.playerStore.liveSong.al.picUrl})`:'url("")'}}></div>
			<div className="ply_head">
				<span onClick={()=>window.history.back()} className="goBackBtn">返回</span>
				<p className="songMsg">
					<span>{props.playerStore.liveSong.name} - {props.playerStore.liveSong.alia[0]}</span>
					<span>{tsinger}</span>
				</p>
				<span className="share">分享</span>
			</div>
			<div className="playBox">
				<div className="imgBox">
					<div className="disc">
						<span style={{backgroundImage:(Object.keys(props.playerStore.liveSong).length)?`url(${props.playerStore.liveSong.al.picUrl})`:'url("")'}}></span>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		playerStore: state.player
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getPlaySong: payload => {
			dispatch({
				type: 'player/getPlaySong',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);