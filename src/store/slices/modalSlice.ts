import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from '../../@types'

const initialState: ModalState = {
  isOpen: false,
  taskId: undefined,
  boardId: undefined,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) {
      state.isOpen = true
      state.taskId = action.payload.taskId
      state.boardId = action.payload.boardId
    },

    closeModal(state) {
      state.isOpen = false
      state.taskId = null
      state.boardId = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
