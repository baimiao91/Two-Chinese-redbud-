/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:53
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-18 19:32:36
 */
import React, {
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import style from './indexPage.scss';
import {
	Carousel
} from 'antd-mobile';
import FM from '@/assets/FM.png';
import DayRecommend from '@/assets/calendar.png';
import SongList from '@/assets/songlist.png';
import RankList from '@/assets/ranklist.png';

function IndexPage(props) {
	console.log('props::::recommend:::', props);
	// 在hooks中使用useEffect处理异步操作
	useEffect(() => {
		props.forBanner();
		props.forReSongList();
	}, []);
	return (
		<div className={style.recommendContainer}>
			<div className={style.bgc}></div>
			<div className={style.bannerCon}>
				<Carousel infinite>
					{
						props.banner.map((item, index)=>{
		          return <a key={index} href={item.url?item.url: 'javascript:void(0)'}>
		            <img src={item.imageUrl} alt={item.typeTitle}/>
		          </a>
		        })
					}
				</Carousel>
			</div>
			<div className={style.recommendFour}>
				<p>
					<b><img src={FM} alt=""/></b>
					<span>私人FM</span>
				</p>
				<p>
					<b><img src={DayRecommend} alt=""/></b>
					<span>每日推荐</span>
				</p>
				<p>
					<b><img src={SongList} alt=""/></b>
					<span>歌单</span>
				</p>
				<p>
					<b><img src={RankList} alt=""/></b>
					<span>排行榜</span>
				</p>
			</div>
			<div className={style.reSongsList}>
				<div className="songListTitle">推荐歌单</div>
				<div className={style.showList}>
					{
						props.reSongList.map((item,index)=>{
							return <p key={index}>
								<img src={item.picUrl} alt=""/>
								<span>{item.name}</span>
							</p>
						})
					}
				</div>
			</div>
		</div>
	);
}

IndexPage.propTypes = {};

const mapStateToProps = state => {
	return state.found
}

const mapDispatchToProps = dispatch => {
	return {
		forBanner: () => {
			dispatch({
				type: 'found/forBanner'
			})
		},
		forReSongList: () => {
			dispatch({
				type: 'found/forReSongList'
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);