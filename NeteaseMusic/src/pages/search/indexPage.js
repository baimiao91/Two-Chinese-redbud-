/*
 * @Author: i白描
 * @Date:   2019-02-19 11:41:17
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-19 20:58:03
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

function IndexPage(props) {
	console.log('props::::search:::', props);

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

	function searchKeys(e) {
		// console.log('eeL::', e.target.value);
		if (!e.target.value) {
			setSearchKey(e.target.value);
			setFlagHots(true);
			setFlagKeyRest(false);
		} else {
			setSearchKey(e.target.value);
			setFlagHots(false);
			setFlagKeyRest(true);
		}
	}

	function searchResult(e) {
		if (searchKey && e.keyCode === 13) {
			props.getKeySearch(searchKey);
		}
	}

	function restByKey(e) {
		console.log(e.target.innerHTML, '。。。准备搜索歌曲');
		if (e.target.tagName === 'SPAN') {
			setSearchKey(e.target.innerHTML)
			props.getTrueSongs(e.target.innerHTML)
			setFlagHots(false);
			setFlagKeyRest(false);
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
		getHotSearch: () => {
			dispatch({
				type: 'search/getHotSearch',
			})
		},
		getKeySearch: payload => {
			dispatch({
				type: 'search/getKeySearch',
				payload
			})
		},
		getTrueSongs: payload => {
			dispatch({
				type: 'search/getTrueSongs',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);