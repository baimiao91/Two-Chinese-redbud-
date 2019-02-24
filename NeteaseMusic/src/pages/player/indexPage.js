/*
 * @Author: i白描
 * @Date:   2019-02-20 12:01:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-23 11:24:50
 */
import React, {
	useEffect,
	useState
} from 'react';
import {
	connect
} from 'dva';
import styles from './indexPage.scss';
// 引入格式化时间
import {
	formatTime
} from '@/utils/index';
import {
	Slider
} from 'antd-mobile';

// 列表循环icon
import orderCycleIcon from '@/assets/order-cycle.png';
// 顺序播放
import orderPlayIcon from '@/assets/order-play.png';
// 随机播放
import randomPlayIcon from '@/assets/random-play.png';
// 单曲循环
import singleCycleIcon from '@/assets/single-cycle.png';
import LeftPlayIcon from '@/assets/leftPlay.png';
import RightPlayIcon from '@/assets/rightPlay.png';
import PlayIcon from '@/assets/play.png';
import PlayIngIcon from '@/assets/playing.png';
import SongListIcon from '@/assets/songlist.png';

// 引入歌曲列表组件
import SongList from '@/components/songsList';

function IndexPage(props) {
	console.log('props::::player::', props);
	// 歌手信息
	let [tsinger, setTsinger] = useState('');
	// 控制播放
	let [sPlay, setSPlay] = useState(true);
	// 控制按钮动画
	// let [btnAni, setBtnAni] = useState(false);
	// 播放歌曲总时长
	let [songTime, setSongTime] = useState(0);
	// 实时播放总时长
	let [songLiveTime, setSongLiveTime] = useState(0);
	// 控制歌曲列表显示
	let [isSongList, setIsSongList] = useState(false);

	// audio的ref
	let audioEle = React.createRef();

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

	// 控制播放暂停
	useEffect(() => {
		if (audioEle.current) {
			sPlay ? audioEle.current.play() : audioEle.current.pause();
		}
	}, [sPlay])

	// 根据播放实时时间判断逻辑
	useEffect(() => {
		// console.log(songLiveTime, songTime);
		if (songLiveTime && (songLiveTime === songTime)) {
			changePlaySong('next')
		}
	}, [songLiveTime])

	// 改变控制播放
	function changeSPlay() {
		setSPlay(!sPlay);
	}

	// 开始播放-最初播放临近点--设置总时长
	function loadPlay() {
		// audioEle.current.play();
		setSongTime(audioEle.current.duration);
	}

	// 播放时间/进度条的实时更改
	function timeChange() {
		setSongLiveTime(audioEle.current.currentTime);
	}

	// t拖动进度条
	function changeSongLiveTime(e) {
		// setSPlay(false);
		setSongLiveTime(e);
	}

	// 拖动结束
	function afterSongLiveTime(e) {
		audioEle.current.currentTime = e;
		setSPlay(true);
	}

	// 该变播放模式
	function changePattern() {
		props.changePattern({
			pattern: ((props.playerStore.pattern + 1) % 4)
		})
	}

	// 改变播放歌曲
	function changePlaySong(type) {
		if (props.playerStore.pattern === 0) {
			audioEle.current.pause();
			audioEle.current.currentTime = 0;
			audioEle.current.play();
			setSPlay(true);
		} else {
			props.changeLiveSong(type);
			setSPlay(true);
			audioEle.current.play();
		}
	}

	// 改变列表组件得显示
	function changeShowList() {
		setIsSongList(true);
	}

	// 发送组件到内部事件/组件发送来得事件
	function compSonsList(tag) {
		console.log('父组件：：：：', tag, tag.target.dataset.songid);
		if (tag.target.tagName === 'DIV') {
			setIsSongList(false);
		} else {
			let ids = parseInt(tag.target.dataset.songid);
			if (ids === props.playerStore.liveSong.id) {
				return;
			} else {
				let current = props.playerStore.songList.findIndex(item => item.id === ids);
				props.directPlayCurrent(current);
				setIsSongList(false);
				setSPlay(true);
			}
		}
	}


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
					<span className={styles.transText}>{props.playerStore.liveSong.name} {props.playerStore.liveSong.alia[0] ? '-'+props.playerStore.liveSong.alia[0] : null}</span>
					<span>{tsinger}</span>
				</p>
				<span className="share">分享</span>
			</div>

		{/*各歌曲封面转盘*/}
			<div className="playBox">
				<div className="imgBox">
					<div className="disc">
						<span className={sPlay?styles.roteImg:styles.disableRote} style={{backgroundImage:(Object.keys(props.playerStore.liveSong).length)?`url(${props.playerStore.liveSong.al.picUrl})`:'url("")'}}></span>
					</div>
				</div>
			</div>
			<div className="userAction">
				<p>喜欢</p>
				<p>下载</p>
				<p>鲸鱼</p>
				<p>评论</p>
				<p>更多</p>
			</div>
			{/*歌曲实时播放进度条*/}
			{songTime?
				<div className="progress">
					<span>{formatTime(songLiveTime)}</span>
					<Slider
            style={{ marginLeft:15, marginRight: 8 ,flex:1}}
            defaultValue={0}
            value={songLiveTime}
            min={0}
            max={Math.round(songTime)}
            onChange={changeSongLiveTime}
            onAfterChange={afterSongLiveTime}
            className={styles.aslider}
          />
					<span>{formatTime(songTime)}</span>
				</div>
				:null
			}
			{/*歌曲控制内容icon*/}
			<div className="playBtn">
				<div className="actAc">
					<span onClick={changePattern}><img src={props.playerStore.pattern===0?singleCycleIcon:props.playerStore.pattern===1?orderCycleIcon:props.playerStore.pattern===2?orderPlayIcon:randomPlayIcon} alt=""/></span>
					<span onClick={()=>changePlaySong('prev')}><img src={LeftPlayIcon} alt=""/></span>
					<span onClick={changeSPlay} >{sPlay?<img src={PlayIngIcon} alt=""/>:<img src={PlayIcon} alt=""/>}</span>
					<span onClick={()=>changePlaySong('next')}><img src={RightPlayIcon} alt=""/></span>
					<span onClick={changeShowList} ><img src={SongListIcon} alt=""/></span>
				</div>
			</div>
			<div className="audioBox">
				<audio src={props.playerStore.liveSong.url} autoPlay ref={audioEle} onTimeUpdate={timeChange} onCanPlay={loadPlay} ></audio>
			</div>
			{/*歌曲列表组件*/}
			{isSongList?<SongList songList={props.playerStore.songList} current={props.playerStore.playCurrent}  compSonsList={compSonsList} />:null}
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
		},
		changePattern: payload => {
			dispatch({
				type: 'player/updateState',
				payload
			})
		},
		changeLiveSong: payload => {
			dispatch({
				type: 'player/changeSongPlayer',
				payload
			})
		},
		directPlayCurrent: payload => { // 直接修改播放下标
			dispatch({
				type: 'player/directPlayCurrent',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);