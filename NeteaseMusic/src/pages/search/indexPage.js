/*
 * @Author: i白描
 * @Date:   2019-02-19 11:41:17
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-28 10:00:04
 */
import React, {
	useState,
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import './indexPage.scss';
import searchI from '@/assets/search.png';

function IndexPage(props, state) {
	// console.log('props::::search:::', props);

	let [searchKey, setSearchKey] = useState('');
	// 控制热门搜索的显示
	let [flagHots, setFlagHots] = useState(true);
	// 控制搜索的建议key的显示
	let [flagKeyRest, setFlagKeyRest] = useState(false);
	// 控制歌曲列表的显示
	let [flagSongRest, setFlagSongRest] = useState(false);

	// 获取热门搜索
	useEffect(() => {
		props.getHotSearch();
	}, [])

	// 获取实时搜索keywords建议
	useEffect(() => {
		if (searchKey) {
			props.getKeySearch(searchKey);
		}
	}, [searchKey])

	// input改变事件
	function searchKeys(e) {
		// console.log('eeL::', e.target.value);
		if (!e.target.value) {
			setSearchKey(e.target.value);
			setFlagHots(true);
			setFlagKeyRest(false);
			setFlagSongRest(false);
		} else {
			setSearchKey(e.target.value);
			setFlagHots(false);
			setFlagKeyRest(true);
			setFlagSongRest(false);
		}
	}

	// 
	function searchResult(e) {
		if (searchKey && e.keyCode === 13) {
			// 添加事件统计
      window._hmt.push(['_trackEvent', '搜索歌曲', 'keyDown', 'wyMusic']);
			props.getTrueSongs(searchKey);
			setFlagHots(false);
			setFlagKeyRest(false);
			setFlagSongRest(true);
		}
	}

	// 搜索建议点击之后的响应结果
	function restByKey(e) {
		if (e.target.tagName.toUpperCase() === 'SPAN') {
      window._hmt.push(['_trackEvent', '返回歌曲', 'click', 'SearchSongs']);
			setSearchKey(e.target.innerHTML)
			setFlagHots(false);
			setFlagKeyRest(false);
			setFlagSongRest(true);
			props.getTrueSongs(e.target.innerHTML);
		}
	}

	// 跳转播放页
	function redayPlay(e) {
		if (e.target.tagName.toUpperCase() === 'SPAN') {
			props.history.push({
				pathname: `/play/${e.target.dataset.id}`
			})
			props.addSongsList(props.searchStore.songsList.map(item => item.id).join(','))
		}
	}

	return (
		<div className="searchContainer">
			<div className="s_heads">
				<div className="iptc-s">
					<img src={searchI} alt="" className="iconL" />
					<input type="text" value={searchKey} placeholder="知否知否" onKeyDown={searchResult} className="inputS" onChange={searchKeys} />
				</div>
				<span onClick={()=>window.history.back()}>取消</span>
			</div>
			<div className="restCon">
				{flagHots 
					?<div className="hots">
						<div className="h_title">热门搜索</div>
						<div className="keysItem">
							{props.searchStore.searchHot.map((item,index) => {
								return <span key={index}>{item.first}{item.iconType ? <b>热</b> : ''}</span>
							})}
						</div>
					</div>
					:null
				}
				{flagKeyRest
					?<div className="resultkey" onClick={restByKey}>
						{props.searchStore.keyRest.map((item,index)=>{
								return <p key={index}>
									<img src={searchI} alt=""/>
									<span data-id={item.id}>{item.name}</span>
								</p>
							})
						}
					</div>
					:null
				}
				{flagSongRest
					?<div className="resultSongs" onClick={redayPlay}>
						{props.searchStore.songsList.map((item,index)=>{
								return <p key={index}>
									<span data-id={item.id}>{item.name}------id:{item.id}</span>
								</p>
							})
						}
					</div>
					:null
				}
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		searchStore: state.search
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getHotSearch: () => { // 获取热门搜索
			dispatch({
				type: 'search/getHotSearch',
			})
		},
		getKeySearch: payload => { // 获取实时输入的推荐搜索建议
			dispatch({
				type: 'search/getKeySearch',
				payload
			})
		},
		getTrueSongs: payload => { // 搜索歌曲
			dispatch({
				type: 'search/getTrueSongs',
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