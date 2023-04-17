import React, { useEffect, useRef, useState } from 'react'
import * as helpers from 'src/utils/helpers'
import { FaMicrophone } from 'react-icons/fa'
import SpinnerLoader from 'src/component/Loaders/SpinnerLoader'

const AudioTrimBar = ({
  style,
  FFMPEG,
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  videoConfig,
  control,
  waveformRef,
  track,
  videoMeta
}) => {
  let RANGE_MAX = 100

  const [playState, setPlayState] = useState('LOADING')

  const waveSurferProcess = async () => {
    try {
      const waveSurfer = (await import('wavesurfer.js')).default

      if (!waveformRef.current) {
        var waveform = waveSurfer.create({
          // barWidth: 10,
          // barHeight: 4,
          // barRadius: 5,
          // barMinHeight: 2,
          // cursorWidth: 5,
          container: track.current,
          // backend: 'WebAudio',
          // height: 90,
          hideScrollbar: true,
          showTime: true,
          progressColor: '#526BD8',
          responsive: true,
          waveColor: '#a9b5ec',
          cursorColor: 'transparent',
          interact: false
        })
        // From URL is working fine
        // waveform.load('https://file-examples.com/storage/fe9278ad7f642dbd39ac5c9/2017/11/file_example_WAV_1MG.wav')
        waveform.loadBlob(videoConfig?.audioBlob)
        // waveform.on('ready', function () {
        //   setPlayState('READY')
        // })
        // waveform.on('finish', function () {
        //   setPlayState('REPLAY')
        // })
        // waveform.on('seek', function () {
        //   if (!waveform.isPlaying()) {
        //     setPlayState('READY')
        //   }
        // })
        waveformRef.current = waveform
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (videoConfig?.audioBlob) {
      waveSurferProcess()
    }
  }, [videoConfig?.audioBlob])

  return (
    <div className={`${style.music_bar_div} `}>
      <div className={`${style.icon_div}`}>
        <FaMicrophone />
      </div>
      <div className={`${style.bar_div} blue_color`}>
        {!loading?.audioLoader ? (
          <>
            {/* Audio Wave link */}
            {videoConfig?.audioBlob && <div ref={track} />}
            {/* <div>
           <div
             className='clip_box'
             style={{
               width: `calc(${rEnd - rStart}% )`,
               left: `${rStart}%`
             }}
             data-start={helpers?.toTimeString((rStart / RANGE_MAX) * videoMeta?.duration, false)}
             data-end={helpers?.toTimeString((rEnd / RANGE_MAX) * videoMeta?.duration, false)}
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
           />

           <input className='range' type='range' min={0} max={RANGE_MAX} onInput={handleUpdaterEnd} value={rEnd} />
         </div> */}
          </>
        ) : (
          <div>
            <SpinnerLoader size={'sm'} />
          </div>
        )}

        {/* {control} */}
      </div>
    </div>
  )
}

export default AudioTrimBar
