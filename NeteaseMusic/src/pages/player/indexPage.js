/*
 * @Author: i白描
 * @Date:   2019-02-20 12:01:18
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-25 18:34:11
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
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

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

var mySwiper = null;

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
	// 控制歌词显示
	let [isLyric, setIsLyric] = useState(false);
	// 控制歌词显示到第几行
	let [lyricLine, setLyricLine] = useState(0);

	// audio的ref
	let audioEle = React.createRef();

	// 获取歌曲详情
	useEffect(() => {
		props.getPlaySong(props.match.params.ids)
	}, [])

	// 设置标题
	useEffect(() => {
		if (props.playerStore.liveSong) {
			let singer = '';
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
		// console.log(songLiveTime, lyricLine, mySwiper instanceof Swiper, '：：：实时时间：：：多少行');
		if (mySwiper instanceof Swiper) {
			// mySwiper.slideTo(lyricLine);
		}
		if (songLiveTime && (songLiveTime === songTime)) {
			changePlaySong('next')
		}
	}, [songLiveTime, lyricLine])

	// 根据当前歌词获取歌词
	useEffect(() => {
		props.forLyric(props.playerStore.liveSong.id);
	}, [props.playerStore.liveSong.id])

	// 实例化swiper
	useEffect(() => {
		mySwiper = new Swiper('.swiper-container', {
			autoplay: true,
		})
		console.log('1111111111111有个词', );
	}, [props.playerStore])

	// 改变控制播放
	function changeSPlay() {
		setSPlay(!sPlay);
	}

	// 开始播放-最初播放临近点--设置总时长
	function loadPlay() {
		// audioEle.current.play();
		setSongTime(audioEle.current.duration);
	}

	// 播放时间/进度条的实时更改    夹杂着歌词的处理
	function timeChange() {
		// console.log(audioEle.current.currentTime, audioEle.current.duration, '：：：实时播放时间');

		setSongLiveTime(audioEle.current.currentTime);
		if (Object.keys(props.playerStore.lyric)) {
			for (let i = 0, len = props.playerStore.lyric.times.length; i < len; i++) {
				if (songLiveTime < props.playerStore.lyric.times[i] * 1) {
					if (i - 1 !== lyricLine) {
						setLyricLine(i - 1);
					}
					break;
				}
			}
			console.log('2222222222:::', mySwiper);
		}

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

	// 控制歌词的显示
	function changeLyric() {
		setIsLyric(true);
	}

	// 控制歌词的隐藏
	function cancelLyric() {
		setIsLyric(false);
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

			{isLyric?
				<div className="lyricBox" onClick={cancelLyric}>
					<div className="swiper-container">
						<div className="swiper-wrapper">
							<div className="swiper-slide">111</div>
							<div className="swiper-slide">222</div>
							<div className="swiper-slide">333</div>
							<div className="swiper-slide">444</div>
							<div className="swiper-slide">555</div>
						</div>
					</div>
				</div>
				:<div className="playBox">
			{/*{
								props.playerStore.lyric && props.playerStore.lyric.texts.map( (item,index) => {
									return <div className="swiper-slide" key={index}>
													<p>{item.text}</p>
												</div>
								} )
							}*/}
				{/*各歌曲封面转盘*/}
				<div className="imgBox">
					<div className="disc">
						<span className={sPlay?styles.roteImg:styles.disableRote} style={{backgroundImage:(Object.keys(props.playerStore.liveSong).length)?`url(${props.playerStore.liveSong.al.picUrl})`:'url("")'}} onClick={changeLyric}></span>
					</div>
				</div>
			</div>
			}
			{isLyric?null:
				<div className="userAction">
					{/* 用户可选操作 */}
					<p>喜欢</p>
					<p>下载</p>
					<p>鲸鱼</p>
					<p>评论</p>
					<p>更多</p>
				</div>
			}
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
		},
		forLyric: payload => { // 获取歌词
			dispatch({
				type: 'player/forLyric',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);