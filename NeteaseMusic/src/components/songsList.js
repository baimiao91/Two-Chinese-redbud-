/*
 * @Author: i白描
 * @Date:   2019-02-21 21:01:49
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-21 21:20:25
 */
import React from 'react';
import style from './songsList.scss';

const SongList = ({
  songList
}) => {
  return (
    <div className={style.songsListContainer}>
      <div>
        {
          songList.length && songList.map((item,index)=>{
            return <p key={index}>
              <span>{index+1}-</span>
              <span>{item.name}</span>
              <span>{item.id}</span>
            </p>
          })
        }
      </div>
    </div>
  );
};

export default SongList;