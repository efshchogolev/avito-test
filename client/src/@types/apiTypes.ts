import { TaskForm } from './index.ts'

export type ApiResponse<T> = {
  data: T
}

export type Board = {
  id: number
  name: string
  description: string
  taskCount: number
}

export type TaskPriority = 'Low' | 'Medium' | 'High'

export type TaskStatus = 'Backlog' | 'InProgress' | 'Done'

export type AssigneeUser = {
  avatarUrl: string
  email: string
  fullName: string
  id: number
}

export type BoardTask = Omit<Task, 'boardName' | 'boardId'>

export type Task = {
  assignee: AssigneeUser
  description: string
  id: number
  priority: TaskPriority
  status: TaskStatus
  title: string
  boardId: number
  boardName: string
}

export type TaskForCreate = Omit<TaskForm, 'status'>

export type TaskForUpdate = Omit<TaskForm, 'boardId'>

export type User = {
  avatarUrl: string
  description: string
  email: string
  fullName: string
  id: number
  tasksCount: number
  teamId: number
  teamName: string
}
