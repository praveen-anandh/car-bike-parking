import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './Slice'

export default configureStore({
  reducer: {
    slots: bookingReducer
  }
})