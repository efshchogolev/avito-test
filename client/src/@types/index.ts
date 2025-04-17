// export type ModalProps = {
//   isOpen: boolean
//   onClose: () => void
// }
//
// export type SetStateType<T> = Dispatch<SetStateAction<T>>

import { BoardTask, TaskPriority, TaskStatus } from './apiTypes.ts'

export type ModalState = {
  isOpen: boolean
  taskId?: number | null
  boardId?: number | null
  task?: BoardTask | null
}

export type TaskForm = {
  assigneeId: number | null
  boardId?: number | null
  description: string
  priority: TaskPriority | null
  title: string | null
  status?: TaskStatus | null
}

export type PriorityObj = {
  name: string
  value: TaskPriority
}

export type StatusObj = {
  name: string
  value: TaskStatus
}

export * from './apiTypes.ts'
