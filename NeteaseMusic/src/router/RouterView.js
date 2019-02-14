/*
 * @Author: i白描
 * @Date:   2019-02-14 18:41:16
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-14 19:34:11
 */
import React from 'react'
import {
	Route,
	Switch,
	Redirect
} from 'dva/router'

export default props => {
	console.log(props)
	return <Switch>{
		props.routes && props.routes.map((item,index)=>{
			return <Route key={index} path={item.path} render={ (props)=>{
					// 支持重定向配置
					if(item.redirect) {
						return <Redirect to={item.redirect} />
					}

					if(item.children) {
						return <item.component {...props} routes={item.children}/>
					} else {
						return <item.component {...props} />
					}
				}
			} />
		})
	}</Switch>
}