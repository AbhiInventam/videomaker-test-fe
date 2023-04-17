import React from 'react'
import { FaTextWidth } from 'react-icons/fa'

const TextTrimBar = ({ style }) => {
  return (
    <div className={`${style.music_bar_div} `}>
      <div className={`${style.icon_div}`}>
        <FaTextWidth />
      </div>
      <div className={`${style.bar_div} gray_color`}></div>
    </div>
  )
}

export default TextTrimBar
