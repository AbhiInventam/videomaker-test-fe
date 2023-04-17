import { Button } from 'react-bootstrap'

function VideoUpload({ disabled, onChange = () => {}, onRemove = () => {} }) {
  return (
    <>
      <input
        type='file'
        onChange={info => {
          if (info.fileList && info.fileList.length > 0) {
            // onChange(info.fileList[0].originFileObj)
          }
        }}
      />

      <Button
        danger={true}
        disabled={!disabled}
        onClick={() => {
          onRemove(undefined)
        }}
      >
        Remove
      </Button>
    </>
  )
}

export default VideoUpload
