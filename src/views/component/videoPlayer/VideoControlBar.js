import { fetchFile } from '@ffmpeg/ffmpeg'
import React from 'react'
import { FaCropAlt, FaCut, FaEllipsisH, FaExpand, FaPause, FaPlay, FaStickyNote, FaTrashAlt } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { GoUnmute, GoMute } from 'react-icons/go'
import { RiCloseFill } from 'react-icons/ri'
import * as helpers from 'src/utils/helpers'
import { Dropdown, DropdownButton } from 'react-bootstrap'

const VideoControlBar = ({
  style,
  FFMPEG,
  loader,
  newVideoConfig,
  setNewVideoConfig,
  inputVideoFile,
  videoController,
  setVideoController,
  videoHandler,
  videoConfig,
  setVideoConfig,
  deleteVideoHandle,
  setOutputVideoFile,
  cropVideoSuccess,
  downloadVideoHandle,
  pictureInModeHandle
}) => {
  const isPictureModeAvailable = 'pictureInPictureEnabled' in document

  const cropVideoHandler = isCropActive => {
    if (isCropActive) {
      setVideoConfig({
        ...videoConfig,
        isCropActive: true
      })
      setVideoController({
        ...videoController,
        cropConfig: {
          ...videoController.cropConfig,
          isCropActive: true
        }
      })
    } else {
      setVideoConfig({
        ...videoConfig,
        isCropActive: false
      })
      setVideoController({
        ...videoController,
        cropConfig: {
          ...videoController.cropConfig,
          isCropActive: false
        }
      })
    }
  }

  return (
    <div className={`${style.control_div}`}>
      <div className={`${style.first_control_div}`}>
        {/* <FaStop /> */}

        {videoController.isPlay ? (
          <FaPause onClick={() => videoHandler('pause')} />
        ) : (
          <FaPlay onClick={() => videoHandler('play')} />
        )}
      </div>
      <div className={`${style.second_control_div}`}>
        {/* <FaStickyNote />
        <FaCut /> */}
        {/* {videoController?.cropConfig?.isCropActive ? (
          <>
            <RiCloseFill onClick={() => cropVideoHandler(false)} size={36} color={'red'}>
              Cancel
            </RiCloseFill>
            <MdDone onClick={cropVideoSuccess} size={36} color={'green'}>
              Save
            </MdDone>
          </>
        ) : (
          <FaCropAlt onClick={() => cropVideoHandler(true)} />
        )} */}
        <FaCropAlt />
      </div>
      <div className={`${style.third_control_div} d-flex`}>
        <FaExpand onClick={() => videoHandler('fullScreen')} />

        {videoController?.isMuted ? (
          <GoMute onClick={() => videoHandler('unmute')} />
        ) : (
          <GoUnmute onClick={() => videoHandler('mute')} />
        )}
        {inputVideoFile && <FaTrashAlt onClick={deleteVideoHandle} />}
        {inputVideoFile && (
          <div className='icon_dropdown_div'>
            <DropdownButton id='dropdown-item-button' title={<FaEllipsisH />}>
              <Dropdown.Item as='button' onClick={downloadVideoHandle}>
                Download
              </Dropdown.Item>
              {/* <Dropdown.Item as='button'>Playback Speed</Dropdown.Item> */}
              {isPictureModeAvailable && (
                <Dropdown.Item as='button' onClick={pictureInModeHandle}>
                  Picture-in-picture
                </Dropdown.Item>
              )}
            </DropdownButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoControlBar
