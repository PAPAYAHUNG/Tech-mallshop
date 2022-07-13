import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import quantityReducer from './Slice/ecommerceSlice.js'

export const store = configureStore({
  reducer: {
    quantityReducer: quantityReducer,
  },
})