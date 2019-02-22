/*
 * @Author: i白描
 * @Date:   2019-02-21 21:01:49
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-22 09:48:56
 */
import React from 'react';
import style from './songsList.scss';

const SongList = ({
  songList,
  compSonsList,
  current
}) => {
  function clickBox(e) {
    // console.log(e.target.tagName, compSonsList, '列表组件：：');
    compSonsList(e)
  }
  return (
    <div className={style.songsListContainer} onClick={clickBox}>
      <div >
        {
          songList.length && songList.map((item,index)=>{
            return <p key={index}>
              <span className={current===index?style.blue:''} >{item.name}</span>
              <span>{item.ar.map(item=>item.name).join('/')}</span>
            </p>
          })
        }
      </div>
    </div>
  );
};

export default SongList;