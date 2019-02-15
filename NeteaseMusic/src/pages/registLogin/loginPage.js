/*
 * @Author: i白描
 * @Date:   2019-02-15 19:34:54
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-15 20:57:01
 */
import React, {
	useState,
	useEffect
} from 'react';
import {
	connect
} from 'dva';
import {
	Toast
} from 'antd-mobile';
import style from './loginPage.scss';
import Tel from '@/assets/tel.png';
import Lock from '@/assets/lock.png';

function LoginPage(props) {
	// console.log('props::::', props);
	let [phone, setPhone] = useState(17600194842);
	let [password, setPasswd] = useState('147852..');

	useEffect(() => {
		if (props.loginStatus == 'fail') {
			Toast.info('登录失败!');
		} else if (props.loginStatus == 'success') {
			console.log('登陆成功');
		}
	}, [props.loginStatus])

	// 处理登陆
	function sureLogin() {
		if (!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone)) {
			Toast.info('请输入正确的手机号码!');
			return false;
		}
		if (!password) {
			Toast.info('请输入你的密码!');
			return false;
		}
		props.doLogin({
			phone,
			password
		});
	}

	return (
		<div className={style.loginContainer}>
			<div className={style.header}>
				手机号登录
			</div>
			<div className={style.iptCon}>
				<p><img src={Tel} alt=""/><input type="text" value={phone} onChange={e=>setPhone(e.target.value)} /></p>
				<p><img src={Lock} alt=""/><input type="password" value={password} onChange={e=>setPasswd(e.target.value)} /></p>
				<div className={style.btn}>
					<button onClick={()=>sureLogin()}>登录</button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		loginStatus: state.login.loginStatus
	}
}

const mapDispatchToProps = dispatch => {
	return {
		doLogin: payload => {
			dispatch({
				type: 'login/login',
				payload
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);