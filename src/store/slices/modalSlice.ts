import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from '../../@types'

const initialState: ModalState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleIsOpenState(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.isOpen = action.payload.isOpen
    },
  },
})

export const { toggleIsOpenState } = modalSlice.actions

export default modalSlice.reducer
