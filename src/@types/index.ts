export type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

export type CabinetProps = {
  setIsModalOpen: SetStateType<boolean>
} & Pick<ModalProps, 'isOpen'>

export type ModalState = {
  isOpen: boolean
}
