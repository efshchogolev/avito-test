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

export type BoardTask = {
  assignee: AssigneeUser
  description: string
  id: number
  priority: TaskPriority
  status: TaskStatus
  title: string
}
