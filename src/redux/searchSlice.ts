import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialProps {
  search: string
}

const initialState: InitialProps = {
  search: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    handleSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }

  }
})

export const { handleSearch } = searchSlice.actions
export const searchReducer = searchSlice.reducer
