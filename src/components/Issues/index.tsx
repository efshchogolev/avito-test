import s from './Issues.module.scss'
import { useGetTasksQuery } from '../../store/slices/tasksApiSlice.ts'
import { useAppDispatch } from '../../hooks/reduxHooks.ts'
import { openModal } from '../../store/slices/modalSlice.ts'
import { MenuItem, TextField } from '@mui/material'
import { PRIORITIES, STATUSES } from '../../constants.ts'
import { useMemo, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce.ts'

const Issues = () => {
  const { data: tasksData } = useGetTasksQuery()
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const filteredTasks = useMemo(() => {
    return tasksData?.filter((task) => {
      const normalized = debouncedSearch.toLowerCase()

      const matchesSearch =
        task.title.toLowerCase().includes(normalized) ||
        task.assignee.fullName.toLowerCase().includes(normalized)

      const matchesStatus = !statusFilter || task.status === statusFilter
      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasksData, debouncedSearch, statusFilter, priorityFilter])

  return (
    <section className={s.issues}>
      <div className={s.filters}>
        <TextField
          label={'Поиск'}
          size={'small'}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Статус"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">Все статусы</MenuItem>
          {STATUSES?.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Приоритет"
          size="small"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <MenuItem value="">Все приоритеты</MenuItem>
          {PRIORITIES?.map((priority) => (
            <MenuItem key={priority.value} value={priority.value}>
              {priority.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={s.tasksContainer}>
        {filteredTasks?.length === 0 ? (
          <p>Задачи не найдены</p>
        ) : (
          <ul className={s.taskList}>
            {filteredTasks?.map((task) => (
              <li
                className={s.taskCard}
                key={task.id}
                onClick={() => {
                  console.log(task.boardId)
                  dispatch(
                    openModal({
                      taskId: task.id,
                      boardId: task.boardId,
                      task: task,
                    }),
                  )
                }}
              >
                <h2 className={s.taskName}>{task.title}</h2>
                <span>{task.assignee.fullName}</span>
              </li>
            ))}
          </ul>
        )}
        <button className={s.button}>Создать задачу</button>
      </div>
    </section>
  )
}

export default Issues
