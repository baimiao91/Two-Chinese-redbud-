/*
 * @Author: i白描
 * @Date:   2019-02-14 19:47:49
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-18 20:48:26
 */
import React, {
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import style from './indexPage.scss';
import paihang from '@/assets/paihang.png';
import {
	getToken
} from '@/utils/index';

function IndexPage(props) {

	console.log('account::::props::::', props);

	useEffect(() => {
		props.getUserDet({
			uid: getToken()
		})
	}, [])


	return (
		<div className={style.accountContainer}>
			<div className="header">账号<img src={paihang} alt="" className="h_icon" /></div>
			<div>{props.userDet.createTime}</div>
			<div>{props.profile.nickname}</div>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		userDet: state.account.userDet,
		profile: state.account.profile,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUserDet: payload => {
			dispatch({
				type: 'account/getUserDet',
				payload
			})
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);