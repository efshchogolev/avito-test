import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from '../../@types'

const initialState: ModalState = {
  isOpen: false,
  taskId: undefined,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Pick<ModalState, 'taskId'>>) {
      state.isOpen = true
      state.taskId = action.payload.taskId
    },

    closeModal(state) {
      state.isOpen = false
      state.taskId = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
