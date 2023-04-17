import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (params, { rejectWithValue }) => {
  // const response = await GetAllUsers(params)
  // if (!response?.data) {
  //   return rejectWithValue(response?.response?.data)
  // }
  // return response.data
})

export const getUserById = createAsyncThunk('user/getUserById', async (id, { rejectWithValue }) => {
  // const response = await GetUserDataByID(id)
  // if (!response?.data) {
  //   return rejectWithValue(response?.response?.data)
  // }
  // return response.data
})

// ** Add User
export const addUser = createAsyncThunk('user/addUser', async formData => {
  // const response = await AddUser(formData)
  // if (response.data) {
  //   toast.success(USER_SUBMIT_MSG)
  // }
  // return response.data
})

// ** Add User
export const updateUser = createAsyncThunk('user/updateUser', async ({ updateId, updateData }) => {
  // const response = await UpdateUser({
  //   updatedId: updateId,
  //   updatedData: updateData
  // })
  // if (response.data) {
  //   toast.success(USER_UPDATE_MSG)
  // }
  // return response
})

// ** Add User
export const updateUserWithRole = createAsyncThunk('user/updateUserWithRole', async ({ updatedId, updatedData }) => {
  // const response = await UpdateUserWithRole({
  //   updatedId: updatedId,
  //   updatedData: updatedData
  // })
  // if (response.data) {
  //   toast.success(USER_UPDATE_MSG)
  // }
  // return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('user/deleteUser', async id => {
  // const response = await DeleteUser(id)
  // if (response.data) {
  //   toast.success(USER_DELETE_MSG)
  // }
  // return response.data
})

// Change User status
export const changeUserStatus = createAsyncThunk('user/changeUserStatus', async formData => {
  // const response = await ChangeUserStatus(formData)
  // if (response.data) {
  //   toast.success(response?.status_message || USER_STATUS_CHANGE_MSG)
  // }
  // return response.data
})

const userInitData = {
  // data: [],
  // total: 1,
  // params: {},
  // allData: [],
  allUsers: [],
  // userData: null,
  userData: {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    mobile_country_code: '',
    gender: '',
    address: '',
    language: '',
    timezone: '',
    currency: '',
    profile_pic: ''
  },
  loading: false,
  isData: false,
  initParams: {
    limit: 10,
    offset: 1,
    sort_order: '',
    sort_column: '',
    search: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitData,
  reducers: {
    resetUserData: (state, action) => {
      state.userData = userInitData.userData
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload
        state.loading = false
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getUserById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userData = action.payload
        state.isData = true
        state.loading = false
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false
        state.isData = false
      })
  }
})

export const { resetUserData } = userSlice.actions

export default userSlice.reducer
