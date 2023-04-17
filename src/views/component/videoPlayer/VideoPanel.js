import React from 'react'
import { Form } from 'react-bootstrap'
import {
  FaAngleLeft,
  FaAngleRight,
  FaCropAlt,
  FaCut,
  FaStickyNote,
  FaTextWidth,
  FaTools,
  FaTrashAlt,
  FaVolumeMute,
  FaVrCardboard
} from 'react-icons/fa'
import FileAttachment from 'src/component/Attachments/FileAttachment'

const VideoPanel = ({
  style,
  isToggleText,
  URL,
  videoMeta,
  setIsToggleText,
  inputVideoFile,
  videoController,
  setVideoController,
  videoRef,
  handleOnTimeUpdate,
  onDeleteSuccess,
  isToggleIcon,
  setIsToggleIcon,
  StyledDropZoneStyle,
  useDropzoneProjectDoc,
  onLoadedMetadata,
  newVideoConfig,
  setNewVideoConfig
}) => {
  return (
    <div className={`${style.video_player_main_div}`}>
      {/* Video Left sidebar */}
      <div className={`${style.left_side_bar}`}>
        <div className={`${style.top_icon}`} onClick={() => setIsToggleText(!isToggleText)}>
          <FaTextWidth />
        </div>
        <div className={`${style.center_icon}`}>
          <FaAngleLeft />
        </div>
        {isToggleText ? (
          <div className={`${style.left_side_bar_contains_div}`}>
            <div className={`${style.scroll_div}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
              repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
              fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.
            </div>
            <div className={`${style.bottom_fixed_div}`}>
              <FaTextWidth />
              <div>
                <Form.Check className='p-0' type='switch' id='custom-switch' />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Video Component */}
      <div className={`${style.video_div}`}>
        {/* <h5 className={`${style.text_div}`}>Add Video or Text</h5> */}
        <div className='mb-24 w-100 h-100'>
          {/* <div className='flex items-center mt-16 mb-12'>
              <Icon className='text-20' color='inherit'>
                attachment
              </Icon>
              <Typography className='mr-10 mx-10'>Project Doc</Typography>
            </div> */}
          {/* <FormGroup> */}

          <div className='flex flex-col sm:flex-row flex-wrap mx-8 w-100 h-100'>
            {inputVideoFile ? (
              <div className='flex w-100 h-100'>
                <FileAttachment
                  // filePath={inputVideoFile ? URL : null}
                  filePath={URL}
                  // item={inputVideoFile}
                  // type="image"
                  // type={isDocument(inputVideoFile).isDoc ? 'pdf' : 'image'}
                  type={'video'}
                  // key={index}
                  videoRef={videoRef}
                  videoMeta={videoMeta}
                  videoController={videoController}
                  setVideoController={setVideoController}
                  handleOnTimeUpdate={handleOnTimeUpdate}
                  onLoadedMetadata={onLoadedMetadata}
                  style={{ width: '5px' }}
                  onDeleteSuccess={onDeleteSuccess}
                  newVideoConfig={newVideoConfig}
                  setNewVideoConfig={setNewVideoConfig}
                />
              </div>
            ) : (
              <div className='mt-8 mx-4'>
                <div className='flex items-center '>
                  <div className='drag_box_div' style={StyledDropZoneStyle} {...useDropzoneProjectDoc.getRootProps()}>
                    <input {...useDropzoneProjectDoc.getInputProps()} />
                    {useDropzoneProjectDoc.isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* </FormGroup> */}
        </div>
      </div>

      {/* Video Right sidebar */}
      <div className={`${style.right_side_bar}`}>
        <div className={`${style.top_icon}`} onClick={() => setIsToggleIcon(!isToggleIcon)}>
          <FaTools />
        </div>
        <div className={`${style.center_icon}`}>
          <FaAngleRight />
        </div>
        {isToggleIcon ? (
          <div className={`${style.right_side_bar_icons_div}`}>
            <FaStickyNote />
            <FaCut />
            <FaCropAlt onClick={() => console.log('Crop video handler')} />
            <FaVrCardboard />
            <FaVolumeMute />
            <FaTrashAlt />
            <div className={`${style.bottom_fixed_div}`}>
              <FaTools />
              <div>
                <Form.Check className='p-0' type='switch' id='custom-switch' />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VideoPanel
