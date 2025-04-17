// export type ModalProps = {
//   isOpen: boolean
//   onClose: () => void
// }
//
// export type SetStateType<T> = Dispatch<SetStateAction<T>>

export type ModalState = {
  isOpen: boolean
  taskId?: number | null
  boardId?: number | null
}

export * from './apiTypes.ts'
