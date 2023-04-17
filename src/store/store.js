import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import videoSlice from './slices/videoSlice'

//persist only auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['loggedInUser', 'token', 'refreshToken']
}

// config persist state
const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  user: userSlice,
  video: videoSlice
})

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export let persistor = persistStore(store)
