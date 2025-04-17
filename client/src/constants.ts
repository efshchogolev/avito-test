import { PriorityObj, StatusObj } from './@types'

const ISSUES_LINK = '/issues'
const BOARDS_LINK = '/boards'
const BASE_URL = 'http://localhost:8080/api/v1'

const PRIORITIES: PriorityObj[] = [
  {
    name: 'Низкий',
    value: 'Low',
  },
  {
    name: 'Средний',
    value: 'Medium',
  },
  {
    name: 'Высокий',
    value: 'High',
  },
]

const STATUSES: StatusObj[] = [
  {
    name: 'To do',
    value: 'Backlog',
  },
  {
    name: 'In Progress',
    value: 'InProgress',
  },
  {
    name: 'Done',
    value: 'Done',
  },
]

export { ISSUES_LINK, BOARDS_LINK, BASE_URL, PRIORITIES, STATUSES }
