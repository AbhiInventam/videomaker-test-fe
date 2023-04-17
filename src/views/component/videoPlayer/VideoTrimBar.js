import React, { useCallback, useEffect, useState } from 'react'
import * as helpers from 'src/utils/helpers'
import { FaVrCardboard } from 'react-icons/fa'

const VideoTrimBar = ({
  style,
  FFMPEG,
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  control,
  videoMeta
}) => {
  if (thumbNails && (thumbNails === undefined || thumbNails.length === 0)) {
    return false
  }
  let RANGE_MAX = 100

  // if (loading) {
  //   return (
  //     <center>
  //       <h2 className='processing_thumbnails_text'> processing thumbnails.....</h2>
  //     </center>
  //   )
  // }

  return (
    <div className={`${style.photos_library_div}`}>
      <div className={`${style.icon_div}`}>
        <FaVrCardboard />
      </div>
      <div className={`${style.multi_images_div}`}>
        <div className='range_pack'>
          <div className='range_pack_wrapper'>
            <div className='image_box'>
              {/* {loading &&
              thumbNails.map((imgURL, id) => <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />)} */}
              {thumbNails.map((imgURL, id) => (
                <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />
              ))}

              <div
                className='clip_box'
                style={{
                  width: `calc(${rEnd - rStart}% )`,
                  left: `${rStart}%`
                }}
                data-start={helpers.toTimeString((rStart / RANGE_MAX) * videoMeta.duration, false)}
                data-end={helpers.toTimeString((rEnd / RANGE_MAX) * videoMeta.duration, false)}
              >
                <span className='clip_box_des'></span>
                <span className='clip_box_des'></span>
              </div>

              <input
                className='range'
                type='range'
                min={0}
                max={RANGE_MAX}
                onInput={handleUpdaterStart}
                value={rStart}
                disabled={loading} // can not move slide if frames are not proper set
              />
              <input
                className='range'
                type='range'
                min={0}
                max={RANGE_MAX}
                onInput={handleUpdaterEnd}
                value={rEnd}
                disabled={loading} // can not move slide if frames are not proper set
              />
            </div>
          </div>
        </div>

        {/* {control} */}
      </div>
    </div>
  )
}

export default VideoTrimBar
