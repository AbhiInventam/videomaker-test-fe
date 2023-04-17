import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as helpers from 'src/utils/helpers'
import style from 'src/styles/pages/dashboard/videoplayer.module.scss'
import { acceptExtensions } from 'src/utils/fileUpload'
import VideoControlBar from 'src/views/component/videoPlayer/VideoControlBar'
import VideoTrimBar from 'src/views/component/videoPlayer/VideoTrimBar'
import AudioTrimBar from 'src/views/component/videoPlayer/AudioTrimBar'
import MusicTrimBar from 'src/views/component/videoPlayer/MusicTrimBar'
import TextTrimBar from 'src/views/component/videoPlayer/TextTrimBar'
import VideoPanel from 'src/views/component/videoPlayer/VideoPanel'
import { toast } from 'react-hot-toast'

const StyledDropZoneStyle = {
  minHeight: '400px',
  width: '100%',
  // border: '0.5px dotted grey',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}

const VideoPlayer = ({ FFMPEG, fetchFile }) => {
  const videoRef = useRef(null)
  const waveformRef = useRef(null)
  const track = useRef(null)

  const [isToggleText, setIsToggleText] = useState(false)
  const [isToggleIcon, setIsToggleIcon] = useState(false)
  const [inputVideoFile, setInputVideoFile] = useState(null)
  const [URL, setURL] = useState([])
  const [outputVideoFile, setOutputVideoFile] = useState(null)
  const [trimIsProcessing, setTrimIsProcessing] = useState(false)
  const [newVideoConfig, setNewVideoConfig] = useState()
  const [componentLoader, setComponentLoader] = useState({
    trimLoader: false,
    audioLoader: false,
    textLoader: false
  })
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [aspect, setAspect] = useState(16 / 9)
  const [videoController, setVideoController] = useState({
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    cropConfig: {
      isCropActive: false,
      crop: crop,
      setCrop: setCrop,
      setCompletedCrop: setCompletedCrop,
      aspect: aspect
    }
  })

  const [videoConfig, setVideoConfig] = useState({
    trimFrame: null,
    audioFrame: null,
    audioUrl: null,
    audioBlob: null,
    videoData: {
      height: null,
      width: null
    },
    isCropActive: false,
    cropData: [{}],
    isSpitVideo: false,
    spitVideoData: [{}],
    inputFile: inputVideoFile
  })
  // audioBlob: null,

  // Trim video states
  // ===================================
  const [rStart, setRstart] = useState(0)
  const [rEnd, setRend] = useState(10)
  const [thumbNails, setThumbNails] = useState([])
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false)
  const [videoMeta, setVideoMeta] = useState(null)

  // ===================================

  const videoActionHandler = (key, value) => {
    setVideoController({
      ...videoController,
      [key]: value
    })
  }

  const fileUploadSuccessHandle = async file => {
    setInputVideoFile(file)
    videoActionHandler('play', true)
    setURL(await helpers.readFileAsBase64(file))
  }

  const handleOnTimeUpdate = () => {
    if (videoRef.current.paused) {
      videoActionHandler('isPlay', false)
    } else if (!videoRef.current.paused) {
      videoActionHandler('isPlay', true)
    }
  }

  // ----------------------------------------------------------------------------------------------
  /////// file upload Project doc ↓↓
  const onDropDoc = async acceptedFiles => {
    // if select multiple files
    if (acceptedFiles.length > 1) {
      // for multiple uploads
      if (acceptedFiles?.[0]) {
        const file = acceptedFiles[0]
        fileUploadSuccessHandle(file)

        // const res = await fileUpload('project/docs', acceptedFiles)

        // if (res?.statusCode === 201) {
        //   // onMultiFileUploadSuccess("docs", res.data || []);
        //   onFileUploadSuccess('docs', res.data || [])
        // }
      }
    } else {
      // for Single Upload
      if (acceptedFiles?.[0]) {
        const file = acceptedFiles[0]
        fileUploadSuccessHandle(file)

        // const res = await fileUpload('project/docs', acceptedFiles?.[0])

        // if (res?.statusCode === 201) {
        //   onFileUploadSuccess('docs', res.data || [])
        // }
      }
    }
  }

  // drop zone for upload file
  const useDropzoneProjectDoc = useDropzone({
    onDrop: onDropDoc,
    multiple: false, // default
    // multiple: true,
    accept: acceptExtensions
  })
  /////// file upload Project doc ↑↑

  // File Delete
  const onDeleteSuccess = item => {
    // var index = form?.docs?.indexOf(item?.item)
    // form?.docs?.splice(index, 1)
    // reset(form)
    setInputVideoFile('')
  }
  // ---------------------------------------------------------------------------------------

  const videoHandler = control => {
    if (inputVideoFile && !componentLoader?.audioLoader) {
      if (control === 'play') {
        videoRef.current.play()
        waveformRef.current.play() // For waveform update
        waveformRef.current.setMute() // For Mute waveform

        // videoActionHandler('isPlay', true)
        // setPlaying(true);
        // var vid = document.getElementById("video1");
        // setVideoTime(vid.duration);
      } else if (control === 'pause') {
        videoRef.current.pause()
        waveformRef.current.pause() // For waveform update
        // videoActionHandler('isPlay', false)
      } else if (control === 'mute') {
        videoRef.current.muted = true
        // waveformRef.current.isMuted = true
        videoActionHandler('isMuted', true)
      } else if (control === 'unmute') {
        videoRef.current.muted = false
        waveformRef.current.isMuted = false

        videoActionHandler('isMuted', false)
      } else if (control === 'fastForward') {
        videoRef.current.currentTime += 5
        // videoActionHandler('fastForward', +5)
      } else if (control === 'backWord') {
        videoRef.current.currentTime -= 5
        // videoActionHandler('backWord', -5)
      } else if (control === 'fullScreen') {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        } else if (videoRef.current.webkitRequestFullscreen) {
          /* Safari */
          videoRef.current.webkitRequestFullscreen()
        } else if (videoRef.current.msRequestFullscreen) {
          /* IE11 */
          videoRef.current.msRequestFullscreen()
        }
      }
    } else if (componentLoader?.audioLoader) {
      toast('Video is under process....', {
        icon: `🙂`
      })
    }
  }

  const deleteVideoHandle = () => {
    if (inputVideoFile && !componentLoader?.audioLoader) {
      setInputVideoFile('')
      setURL('')
      setThumbNails([])
      setVideoConfig({
        ...videoConfig,
        audioBlob: null
      })
      waveformRef.current = null
      track.current = null
    } else if (componentLoader?.audioLoader) {
      toast('Video is under process....', {
        icon: `🙂`
      })
    }
  }

  const handleUpdateRange = func => {
    return ({ target: { value } }) => {
      func(value)
    }
  }

  const getThumbnails = async ({ duration }) => {
    if (!FFMPEG.isLoaded()) {
      await FFMPEG.load()
    }

    setThumbnailIsProcessing(true)
    setComponentLoader({
      ...componentLoader,
      audioLoader: true
    })
    let MAX_NUMBER_OF_IMAGES = 100
    let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 100
    let offset = duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES
    const arrayOfImageURIs = []
    const fileData = await fetchFile(inputVideoFile)

    FFMPEG.FS('writeFile', inputVideoFile.name, fileData)

    const sleep = m => new Promise(r => setTimeout(r, m))

    for (let i = 0; i < Math.floor(NUMBER_OF_IMAGES); i++) {
      let startTimeInSecs = helpers.toTimeString(Math.round(i * offset))

      try {
        await sleep(25 * i)
        await FFMPEG.run(
          '-ss',
          startTimeInSecs,
          '-i',
          inputVideoFile.name,
          '-t',
          '00:00:1.000',
          '-vf',
          `scale=180:-1`,
          `img${i}.png`
        )

        const data = FFMPEG.FS('readFile', `img${i}.png`)

        let blob = new Blob([data.buffer], { type: 'image/png' })
        let dataURI = await helpers.readFileAsBase64(blob)
        FFMPEG.FS('unlink', `img${i}.png`)
        arrayOfImageURIs.push(dataURI)
        setThumbNails([...arrayOfImageURIs]) // Use speared operator for constant state update
      } catch (error) {
        console.log({ message: error })
      }
    }
    setThumbnailIsProcessing(false)

    // return arrayOfImageURIs
  }

  const getAudioWave = async () => {
    try {
      FFMPEG.FS('writeFile', inputVideoFile.name, await fetchFile(inputVideoFile))

      // Extract audio command Video
      // await FFMPEG.run('-i', inputVideoFile.name, `-q:a`, '0', '-map', 'a', 'ping.mp3')
      await FFMPEG.run('-i', inputVideoFile.name, 'ping.wav')

      // const data = FFMPEG.FS('readFile', 'ping.mp3')
      const data = FFMPEG.FS('readFile', 'ping.wav')
      // const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: 'audio/mp3' }))
      const dataURL = new Blob([data], { type: 'audio/wav' })

      setVideoConfig({
        ...videoConfig,
        audioBlob: dataURL
      })
    } catch (error) {
      console.log('error', error)
    }
    // finally {
    //   // setCropIsProcessing(false)
    //   console.log('finally block execute')
    // }
    setComponentLoader({
      ...componentLoader,
      audioLoader: false
    })
  }

  const handleLoadedData = async e => {
    const el = e.target

    const meta = {
      name: inputVideoFile.name,
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight
    }
    setVideoMeta(meta)
    const thumbNails = await getThumbnails(meta)
    const getAudio = await getAudioWave()
    // setThumbNails(thumbNails)
  }

  const videoTrimHandle = async (isDownload = false) => {
    setTrimIsProcessing(true)

    let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2)
    let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2)
    // console.log(startTime, offset, helpers.toTimeString(startTime), helpers.toTimeString(offset))
    // console.log('===startTime===', helpers.toTimeString(startTime))

    try {
      FFMPEG.FS('writeFile', inputVideoFile.name, await fetchFile(inputVideoFile))
      // await FFMPEG.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');

      // For Trim video
      // =====================
      await FFMPEG.run(
        '-ss',
        helpers.toTimeString(startTime),
        '-i',
        inputVideoFile.name,
        '-t',
        helpers.toTimeString(offset),
        '-c',
        'copy',
        'ping.mp4'
      )

      const data = FFMPEG.FS('readFile', 'ping.mp4')
      const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: 'video/mp4' }))
      setOutputVideoFile(dataURL)
      if (isDownload) {
        var link = document.createElement('a')
        // If you don't know the name or want to use
        // the webserver default set name = ''
        link.setAttribute('download', 'output')
        link.href = dataURL
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
      // setInputVideoFile(dataURL)
    } catch (error) {
      console.log(error)
    } finally {
      setTrimIsProcessing(false)
    }
  }

  const pictureInModeHandle = () => {
    const video = document.querySelector('video')
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture()
    } else if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture()
    }
  }

  const downloadVideoHandle = async () => {
    videoTrimHandle(true)
  }

  const cropVideoSuccess = async () => {
    const sleep = m => new Promise(r => setTimeout(r, m))

    // CMD command : ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4
    let newWidth = +newVideoConfig?.width
    let newHeight = +newVideoConfig?.height
    let newX = +newVideoConfig?.x
    let newY = +newVideoConfig?.y

    try {
      await sleep(1000)
      FFMPEG.FS('writeFile', inputVideoFile.name, await fetchFile(inputVideoFile))

      // Crop Video
      // =====================
      // await FFMPEG.run('-i', inputVideoFile.name, '-vf', `crop=${newWidth}:${newHeight}`, 'cropOutput.mp4')
      // await FFMPEG.run('-i', inputVideoFile.name, '-filter:v', `crop=${newWidth}:${newHeight}`, 'cropOutput.mp4')
      await FFMPEG.run(
        '-i',
        inputVideoFile.name,
        // '-filter:v',
        '-vf',
        // `crop=${newWidth}:${newHeight}`,
        `crop=${newWidth}:${newHeight}:${newX}:${newY}`,
        'cropOutput.mp4'
      )

      const data = FFMPEG.FS('readFile', 'cropOutput.mp4')
      const newFileData = new Blob([data.buffer], { type: 'video/mp4' })
      newFileData.name = 'cropOutput.mp4'
      // const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: 'video/mp4' }))
      const croppedImageUrl = window.URL.createObjectURL(newFileData)
      setNewVideoConfig({
        ...newVideoConfig,
        src: croppedImageUrl
      })
    } catch (error) {
      console.log(error)
    } finally {
      // setCropIsProcessing(false)
    }
  }

  return (
    <div>
      {/* Main Video Panel */}
      <VideoPanel
        style={style}
        FFMPEG={FFMPEG}
        URL={URL}
        videoMeta={videoMeta}
        isToggleText={isToggleText}
        setIsToggleText={setIsToggleText}
        inputVideoFile={inputVideoFile}
        videoController={videoController}
        setVideoController={setVideoController}
        videoRef={videoRef}
        handleOnTimeUpdate={handleOnTimeUpdate}
        onDeleteSuccess={onDeleteSuccess}
        isToggleIcon={isToggleIcon}
        setIsToggleIcon={setIsToggleIcon}
        StyledDropZoneStyle={StyledDropZoneStyle}
        useDropzoneProjectDoc={useDropzoneProjectDoc}
        onLoadedMetadata={handleLoadedData}
        newVideoConfig={newVideoConfig}
        setNewVideoConfig={setNewVideoConfig}
      />

      {/* Video Controls Actions */}
      <VideoControlBar
        style={style}
        FFMPEG={FFMPEG}
        newVideoConfig={newVideoConfig}
        setNewVideoConfig={setNewVideoConfig}
        loader={componentLoader}
        videoController={videoController}
        inputVideoFile={inputVideoFile}
        videoHandler={videoHandler}
        setVideoController={setVideoController}
        videoConfig={videoConfig}
        setVideoConfig={setVideoConfig}
        deleteVideoHandle={deleteVideoHandle}
        setOutputVideoFile={setOutputVideoFile}
        cropVideoSuccess={cropVideoSuccess}
        downloadVideoHandle={downloadVideoHandle}
        pictureInModeHandle={pictureInModeHandle}
      />

      <div className='trim_action_wrapper'>
        {/* Video Trim Bar */}
        <VideoTrimBar
          style={style}
          FFMPEG={FFMPEG}
          rEnd={rEnd}
          rStart={rStart}
          handleUpdaterStart={handleUpdateRange(setRstart)}
          handleUpdaterEnd={handleUpdateRange(setRend)}
          loading={thumbnailIsProcessing}
          videoMeta={videoMeta}
          control={
            <div className='u-center'>
              <button onClick={videoTrimHandle} className='btn btn_b' disabled={trimIsProcessing}>
                {trimIsProcessing ? 'trimming...' : 'save'}
              </button>
            </div>
          }
          thumbNails={thumbNails}
        />

        {/* Audio Trim Bar */}
        <AudioTrimBar
          style={style}
          FFMPEG={FFMPEG}
          rEnd={rEnd}
          rStart={rStart}
          waveformRef={waveformRef}
          track={track}
          handleUpdaterStart={handleUpdateRange(setRstart)}
          handleUpdaterEnd={handleUpdateRange(setRend)}
          loading={componentLoader}
          videoMeta={videoMeta}
          videoConfig={videoConfig}
          // control={
          //   <div className='u-center'>
          //     <button onClick={videoTrimHandle} className='btn btn_b' disabled={trimIsProcessing}>
          //       {trimIsProcessing ? 'trimming...' : 'save'}
          //     </button>
          //   </div>
          // }
          // thumbNails={thumbNails}
        />

        {/* Music Trim Bar */}
        <MusicTrimBar style={style} FFMPEG={FFMPEG} />

        {/* Text Trim Bar */}
        <TextTrimBar style={style} FFMPEG={FFMPEG} />
      </div>

      {outputVideoFile && (
        <div className='output_file'>
          <video controls src={outputVideoFile} width={300} height={300}>
            Sorry, your browser doesn't support embedded videos!
          </video>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
