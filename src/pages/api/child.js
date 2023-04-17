// API Route for access this api
// api/child

import { exec } from 'child_process'
import { error } from 'console'

// `ffmpeg -i download_crop.mp4 -vf "drawtext=text='Centered Text':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=black" -c:a copy output.mp4`
// exec(
//   `ffmpeg -i 'https://vjs.zencdn.net/v/oceans.mp4' -vf "drawtext=text='Abhishek':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=black" -c:a copy output123.mp4`
// )

export default function handler(req, res) {
  // For convert mp4 to mp3
  // exec(`ffmpeg -i 'https://vjs.zencdn.net/v/oceans.mp4' audio.mp3`)
  // exec(`ffmpeg -i 'input.mp4' audio.mp3`)

  // For Add Text on video
  // exec(
  //   `ffmpeg -i 'https://vjs.zencdn.net/v/oceans.mp4' -vf "drawtext=text='Abhishek':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=black" -c:a copy output.mp4`
  // )

  const ls = exec(
    // `ffmpeg -i 'https://vjs.zencdn.net/v/oceans.mp4' -vf "drawtext=text='Abhishek':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=black" -c:a copy output.mp4`
    `ffmpeg -i input.mp4 -acodec libmp3lame -ab 128k output.mp3`,
    (error, stdout, stderr) => {
      console.log(`error: ${error}`)
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    }
  )

  ls.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })

  ls.on('close', code => {
    console.log(`child process close all stdio with code ${code}`)
  })

  ls.on('exit', code => {
    console.log(`child process exited with code ${code}`)
  })

  res.status(200).json({
    ls: ls,
    status: 'Video Created'
  })
}

// Convert mp4 to mp3
// exec(
//   `ffmpeg -i 'https://vjs.zencdn.net/v/oceans.mp4' -map 0:0 -ss 00:03:00 -t 00:00:20.0 -acodec copy audio.aac`,
//   (error, stdout, stderr) => console.log('error===============', error)
//   // console.log('stdout++++++++++++++', stdout)
//   // console.log('stderr--------------', stderr)
// )

// import { exec } from 'child_process'
// const ls = exec(
//   `ffmpeg -i 'https://vjs.zencdn.net/v/oceans.mp4' -vf "drawtext=text='Abhishek':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=black" -c:a copy output.mp4`
// )

// ls.stdout.on('data', data => {
//   console.log(`stdout: ${data}`)
// })

// ls.on('close', code => {
//   console.log(`child process close all stdio with code ${code}`)
// })

// ls.on('exit', code => {
//   console.log(`child process exited with code ${code}`)
// })
