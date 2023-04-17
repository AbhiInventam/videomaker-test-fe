import React, { useEffect, useRef, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import { FFMPEG } from 'src/pages/dashboard'
import Moveable from 'react-moveable'

const FileAttachment = ({
  filePath,
  item,
  type,
  key,
  style,
  onDeleteSuccess,
  videoMeta,
  videoController,
  setVideoController,
  handleOnTimeUpdate,
  videoRef,
  onLoadedMetadata,
  newVideoConfig,
  setNewVideoConfig
}) => {
  const { autoPlay, mute, showController, fullScreen, loop, poster, cropConfig } = videoController
  const { isCropActive, crop, setCrop, setCompletedCrop, aspect } = cropConfig

  const [targetValue, setTargetValue] = useState(['text1'])
  const [cropConfig2, setCropConfig2] = useState(
    // default crop config
    {
      unit: '%',
      width: 30,
      aspect: 16 / 9
    }
  )
  // style={{ position: 'relative' }}
  const textFieldStyle = {
    position: 'relative',
    background: 'transparent',
    color: 'white',
    fontSize: '20px',
    fontWidth: '400',
    border: 'none'
  }

  const textRef = useRef(null)
  const [imageRef, setImageRef] = useState()
  const [textValue, setTextValue] = useState()

  const viewFileHandler = fileUrl => {
    if (fileUrl) {
      window.open(fileUrl, '_blank')
    }
  }

  async function cropImage(crop) {
    console.log('crop-----------', crop)
    // console.log('crop complete', crop)
    if (videoRef && crop.width && crop.height) {
      console.log('===== condition =====', crop)
      // const croppedImage = await getCroppedImage(
      //   imageRef,
      //   crop,
      //   'croppedImage.jpeg' // destination filename
      // )
      // const croppedVideo = await getCroppedImage(
      //   imageRef,
      //   crop,
      //   'croppedVideo.mp4' // destination filename
      // )
      // console.log('croppedVideo-----------', croppedVideo)
      setNewVideoConfig(crop)

      // calling the props function to expose
      // croppedImage to the parent component
      // setCompletedCrop(crop)
      // setCompletedCrop(croppedImage)
      // onImageCropped(croppedImage)
    }
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    console.log('cropConfig+++++++++', cropConfig)
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas')
    const scaleX = sourceImage.width / sourceImage.width
    const scaleY = sourceImage.height / sourceImage.height
    canvas.width = cropConfig.width
    canvas.height = cropConfig.height
    const ctx = canvas.getContext('2d')
    console.log('ctx', ctx)

    // ctx.drawImage(
    //   sourceImage,
    //   cropConfig.x * scaleX,
    //   cropConfig.y * scaleY,
    //   cropConfig.width * scaleX,
    //   cropConfig.height * scaleY,
    //   0,
    //   0,
    //   cropConfig.width,
    //   cropConfig.height
    // )

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        // returning an error
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }

        blob.name = fileName
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob)

        // console.log('croppedImageUrl==============================', croppedImageUrl)

        // const data = FFMPEG.FS('readFile', blob.name)
        // console.log('data******', data)
        // const cropBlob = new Blob([data.buffer], { type: 'video/mp4' })
        // console.log('cropBlob******', cropBlob)
        // setNewVideoConfig(croppedImageUrl)

        resolve(croppedImageUrl)
      }, 'video/mp4')
    })
  }

  // =================================================
  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    )
  }

  function onVideoLoad(e) {
    if (aspect && videoMeta) {
      const { width, height } = e.currentTarget

      // setCrop(centerAspectCrop(width, height, aspect))
      // setImageRef(centerAspectCrop(300, 300, aspect))
      setImageRef(centerAspectCrop(videoMeta?.videoWidth, videoMeta?.videoHeight, aspect))
    }
  }

  // =================================================

  switch (type) {
    // For Image Case
    //  =================================================
    case 'image':
      return (
        <div className='d-flex'>
          {/* Image */}
          <div className='position-relative'>
            {
              filePath && (
                <>
                  <Image
                    className='block max-h-full max-h-full'
                    src={filePath}
                    alt='attachment'
                    width={70}
                    height={70}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '10px'
                    }}
                    onClick={() => {
                      viewFileHandler(filePath)
                    }}
                  />
                  <button
                    className='position-absolute'
                    onClick={() => onDeleteSuccess(filePath)}
                    type='button'
                    style={{
                      right: '-10px',
                      color: 'red',
                      backgroundColor: 'white',
                      top: '-8px',
                      borderRadius: '5px',
                      border: '1px solid grey'
                    }}
                  >
                    <RiCloseLine className={'d-block'} fontSize={24} />
                  </button>
                </>
              )
              // : (
              //   <Loading height={"40px"} />
              // )
            }
          </div>
        </div>
      )
    //  =================================================

    // Html Video Tag ==== Working (Default)
    //  =================================================
    // case 'video':
    //   return (
    //     <article className='grid_txt_2'>
    //       <div className='bord_g_2 p_2 video_container_div'>
    //         <video
    //           className='video_div'
    //           ref={videoRef}
    //           controls={showController}
    //           src={filePath}
    //           autoPlay={autoPlay}
    //           mute={mute}
    //           // loop={false}
    //           preload='auto'
    //           onTimeUpdate={handleOnTimeUpdate}
    //           onLoadedMetadata={onLoadedMetadata}
    //           // poster='https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
    //         >
    //           Sorry, your browser doesn't support embedded videos!
    //           {/* <source src={filePath} type='video/mp4' /> */}
    //           {/* <source src='https://archive.org/download/ElephantsDream/ed_hd.ogv' type='video/ogg' />
    //           <source src='https://archive.org/download/ElephantsDream/ed_hd.avi' type='video/avi' />
    //           <source src='https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4' type='video/mp4' /> */}
    //           {/* For Add Subtitle on video */}
    //           {/* <track kind='subtitles' src='subtitles_es.vtt' srclang='es' label='Spanish' /> */}
    //         </video>
    //       </div>
    //     </article>
    //   )
    //  =================================================

    // Crop Video Element
    //  =================================================
    case 'video':
      return (
        <>
          {targetValue &&
            targetValue?.map((target, index) => {
              return (
                <Moveable
                  // target={document.getElementById(target)}
                  target={document.getElementById(null)}
                  key={index}
                  container={null}
                  origin={true}
                  edge={false}
                  draggable={true}
                  throttleDrag={0}
                  onDragStart={({ target, clientX, clientY }) => {
                    console.log('onDragStart', target)
                  }}
                  onDrag={({
                    target,
                    beforeDelta,
                    beforeDist,
                    left,
                    top,
                    right,
                    bottom,
                    delta,
                    dist,
                    transform,
                    clientX,
                    clientY
                  }) => {
                    console.log('onDrag left, top', left, top)
                    // target!.style.left = `${left}px`;
                    // target!.style.top = `${top}px`;
                    console.log('onDrag translate', dist)
                    target.style.transform = transform
                  }}
                  onDragEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log('onDragEnd', target, isDrag)
                  }}
                  /* When resize or scale, keeps a ratio of the width, height. */
                  keepRatio={true}
                  /* resizable*/
                  /* Only one of resizable, scalable, warpable can be used. */
                  resizable={true}
                  throttleResize={0}
                  onResizeStart={({ target, clientX, clientY }) => {
                    console.log('onResizeStart', target)
                  }}
                  onResize={({ target, width, height, dist, delta, direction, clientX, clientY }) => {
                    console.log('onResize', target)
                    delta[0] && (target.style.width = `${width}px`)
                    delta[1] && (target.style.height = `${height}px`)
                    // textRef.current.width = `${width}px`
                    textRef.current.width = width
                    textRef.current.height = height
                  }}
                  onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log('onResizeEnd', target, isDrag)
                  }}
                  /* scalable */
                  /* Only one of resizable, scalable, warpable can be used. */
                  scalable={true}
                  throttleScale={0}
                  onScaleStart={({ target, clientX, clientY }) => {
                    console.log('onScaleStart', target)
                  }}
                  onScale={({ target, scale, dist, delta, transform, clientX, clientY }) => {
                    console.log('onScale scale', scale)
                    target.style.transform = transform
                  }}
                  onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log('onScaleEnd', target, isDrag)
                  }}
                  /* rotatable */
                  rotatable={true}
                  throttleRotate={0}
                  onRotateStart={({ target, clientX, clientY }) => {
                    console.log('onRotateStart', target)
                  }}
                  onRotate={({ target, delta, dist, transform, clientX, clientY }) => {
                    console.log('onRotate', dist)
                    target.style.transform = transform
                  }}
                  onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log('onRotateEnd', target, isDrag)
                  }}
                  // Enabling pinchable lets you use events that
                  // can be used in draggable, resizable, scalable, and rotateable.
                  pinchable={true}
                  onPinchStart={({ target, clientX, clientY, datas }) => {
                    // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                    console.log('onPinchStart')
                  }}
                  onPinch={({ target, clientX, clientY, datas }) => {
                    // pinch event occur before drag, rotate, scale, resize
                    console.log('onPinch')
                  }}
                  onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
                    // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                    console.log('onPinchEnd')
                  }}
                />
              )
            })}

          <ReactCrop
            // src={filePath}
            onDragStart={() => console.log('onDragStart')}
            onDragEnd={() => console.log('onDragEnd')}
            // crop={cropConfig2}
            crop={isCropActive ? cropConfig2 : null}
            ruleOfThirds
            className='w-100 h-100'
            // onImageLoaded={imageRef => setImageRef(imageRef)}
            onComplete={cropConfig2 => cropImage(cropConfig2)}
            onChange={cropConfig2 => setCropConfig2(cropConfig2)}
            // aspect={aspect}
            // aspect={16 / 9}
            crossorigin='anonymous' // to avoid CORS-related problems
            // circularCrop={true} // For Circular crop view
          >
            <video
              className='video_div'
              id='origin_video_ui_div'
              ref={videoRef}
              controls={showController}
              src={filePath}
              autoPlay={autoPlay}
              mute={mute}
              preload='auto'
              onTimeUpdate={handleOnTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onLoadedData={onVideoLoad}
            >
              Sorry, your browser doesn't support embedded videos!
            </video>
          </ReactCrop>
          {/* <div>
            {newVideoConfig?.src && <video src={newVideoConfig?.src} autoPlay />}
          </div> */}
          {/* <div
            id='text1'
            style={{
              width: '100px',
              height: '100px'
            }}
          >
            <input
              ref={textRef}
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              onDoubleClick={() => {
                textRef.current.focus()
              }}
              style={textFieldStyle}
            />
          </div> */}
        </>
      )
    //  =================================================

    // ReactPlayer Package
    //  =================================================
    // case 'video':
    // return (
    //   <div>
    //     <ReactPlayer
    //         ref={videoRef}
    //         className='react-player'
    //         // width='100%'
    //         // height='100%'
    //         url={filePath} // src of video
    //         // pip={pip} // picture-in-picture mode
    //         playing={playing}
    //         controls={showController}
    //         // light={light} // Set to true to show just the video thumbnail
    //         loop={false} // loop video
    //         // playbackRate={playbackRate}
    //         // volume={volume}
    //         muted={muted}
    //         onBuffer={() => console.log('onBuffer')}
    //         onReady={() => console.log('onReady')}
    //         onStart={() => console.log('onStart')}
    //         onSeek={e => console.log('onSeek', e)}
    //         onError={e => console.log('onError', e)}
    //         // onPlay={handlePlay} // function for make playing value true or false
    //         // onPause={handlePause}
    //         // onEnded={handleEnded}
    //         // onEnablePIP={handleEnablePIP}
    //         // onDisablePIP={handleDisablePIP}
    //         // onPlaybackRateChange={handleOnPlaybackRateChange}
    //         // onProgress={handleProgress}
    //         // onDuration={handleDuration}
    //         // config={config}
    //       />
    //   </div>
    // )
    //  =================================================

    default:
      return
  }
}

export default FileAttachment
