import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialProps {
  isNavOpen: boolean
  isUserMenuOpen: boolean
}

const initialState: InitialProps = {
  isNavOpen: false,
  isUserMenuOpen: false
}

const navigationSlice = createSlice({
  name: 'mobileNav',
  initialState,
  reducers: {
    openNav: (state, action: PayloadAction<boolean>) => {
      state.isNavOpen = action.payload
    },
    openMenu: (state, action: PayloadAction<boolean>) => {
      state.isUserMenuOpen = action.payload
    }
  }
})

export const { openNav, openMenu } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer
