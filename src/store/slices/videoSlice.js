import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllProjects = createAsyncThunk('video/getAllProjects', async (params, { rejectWithValue }) => {
  // const response = await GetAllProjects(params)
  // if (!response?.data) {
  //   return rejectWithValue(response?.response?.data)
  // }
  // return response.data
})

// JSON for Manage Crop Data
// ==========================================
// {
//   "cropLimitToImage": true,
//   "cropMinSize": {
//     "width": 1,
//     "height": 1
//   },
//   "cropMaxSize": {
//     "width": 32768,
//     "height": 32768
//   },
//   "flipX": false,
//   "flipY": false,
//   "rotation": 0,
//   "crop": {
//     "x": 191,
//     "y": 69,
//     "width": 1617,
//     "height": 943
//   },
//   "redaction": [],
//   "annotation": [],
//   "decoration": [],
//   "backgroundColor": [0, 0, 0, 0]
// }
// ==========================================

const videoInitData = {
  projectConfig: {
    projectList: [],
    projectCount: 0,
    projectData: {}
  },
  photoConfig: {
    photoList: [],
    photoCount: 0,
    photoData: {}
  },
  textConfig: {
    isText: false
  },
  mainVideoConfig: {
    originVideoConfig: {
      url: ''
    },
    modifiedVideoConfig: {
      url: ''
    }
  },
  initParams: {}
}

export const videoSlice = createSlice({
  name: 'video',
  initialState: videoInitData,
  reducers: {
    resetVideoData: (state, action) => {
      state.mainVideoConfig = videoInitData.mainVideoConfig
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllProjects.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload
        state.loading = false
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export const { resetVideoData } = videoSlice.actions

export default videoSlice.reducer
