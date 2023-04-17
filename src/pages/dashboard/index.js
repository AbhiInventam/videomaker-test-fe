import React from 'react'
import style from 'src/styles/pages/dashboard/dashboard.module.scss'
import Sidebar from 'src/views/pages/dashboard/Sidebar'
import VideoPlayer from 'src/views/pages/dashboard/VideoPlayer'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

// const FFMPEG = createFFmpeg({
//   log: true,
//   corePath: '/ffmpeg-core/ffmpeg-core.js'
// })
export const FFMPEG = createFFmpeg({
  // log: true, // for check log
  log: false,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js'
})
// (async () => {
//   await FFMPEG.load()
//   await FFMPEG.run('-L')
// })()

// (async function () {
//   await FFMPEG.load()
// })()

const Dashboard = () => {
  return (
    <div>
      <div className={`${style.panel_view_main_div}`}>
        <div className={`${style.left_side_section_div}`}>
          <Sidebar />
        </div>
        <div className={`${style.right_side_section_div}`}>
          <div className={`${style.right_contain_main_div}`}>
            <VideoPlayer FFMPEG={FFMPEG} fetchFile={fetchFile} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  // set HTTP header

  context.res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  context.res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  return {
    props: {}
  }
}
