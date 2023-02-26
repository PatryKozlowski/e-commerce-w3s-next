import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '../cartSlice'
import { navigationReducer } from '../navigationSlice'
import { searchReducer } from '../searchSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    cart: cartReducer,
    search: searchReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
