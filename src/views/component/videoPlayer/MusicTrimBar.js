import React from 'react'
import { FaMusic } from 'react-icons/fa'

const MusicTrimBar = ({ style }) => {
  return (
    <div className={`${style.music_bar_div} `}>
      <div className={`${style.icon_div}`}>
        <FaMusic />
      </div>
      <div className={`${style.bar_div} marun_color`}></div>
    </div>
  )
}

export default MusicTrimBar
