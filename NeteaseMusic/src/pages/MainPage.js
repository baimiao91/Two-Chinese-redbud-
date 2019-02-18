import React from 'react';

import {
  NavLink
} from 'dva/router';

import RouterView from '@/router/RouterView'

import './MainPage.scss';

function MainPage(props) {
  return (
    <div className="mainContainer">
      <RouterView routes={props.routes}></RouterView>
      <footer className="footer">
        <NavLink to="/main/discover/recommend">
          <span className="icon" />
          <span className="text">发现</span>
        </NavLink>
        <NavLink to="/main/video">
          <span className="icon" />
          <span className="text">视频</span>
        </NavLink>
        <NavLink to="/main/mine">
          <span className="icon" />
          <span className="text">我的</span>
        </NavLink>
        <NavLink to="/main/friend">
          <span className="icon" />
          <span className="text">朋友</span>
         </NavLink>
        <NavLink to="/main/account">
          <span className="icon" />
          <span className="text">账号</span>
         </NavLink>
      </footer>
    </div>
  )
}

MainPage.propTypes = {};

export default MainPage