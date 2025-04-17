import s from './Issues.module.scss'
import { useGetTasksQuery } from '../../store/slices/tasksApiSlice.ts'
import { useAppDispatch } from '../../hooks/reduxHooks.ts'
import { openModal } from '../../store/slices/modalSlice.ts'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { STATUSES } from '../../constants.ts'
import { useMemo, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce.ts'
import { useGetBoardsQuery } from '../../store/slices/boardsApiSlice.ts'

const Issues = () => {
  const { data: tasksData = [] } = useGetTasksQuery()
  const { data: boardsData = [] } = useGetBoardsQuery()
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [statusFilter, setStatusFilter] = useState('')
  const [boardFilter, setBoardFilter] = useState('')

  const filteredTasks = useMemo(() => {
    return tasksData.filter((task) => {
      const normalized = debouncedSearch.toLowerCase()

      const matchesSearch =
        task.title.toLowerCase().includes(normalized) ||
        task.assignee.fullName.toLowerCase().includes(normalized)

      const matchesStatus = !statusFilter || task.status === statusFilter
      const matchesBoard = !boardFilter || String(task.boardId) === boardFilter

      return matchesSearch && matchesStatus && matchesBoard
    })
  }, [tasksData, debouncedSearch, statusFilter, boardFilter])

  const onOpenModal = () => {
    dispatch(
      openModal({
        taskId: null,
        boardId: null,
        task: null,
      }),
    )
  }

  return (
    <section className={s.issues}>
      <div className={s.filters}>
        <TextField
          label={'Поиск'}
          size={'small'}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={s.filtersContainer}>
          <FormControl variant="outlined" size="small" className={s.select}>
            <InputLabel id="status-filter">Статус</InputLabel>
            <Select
              id="status-filter"
              autoWidth={true}
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
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" className={s.select}>
            <InputLabel id="board-filter">Доска</InputLabel>
            <Select
              id="board-filter"
              select
              label="Доска"
              size="small"
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value)}
            >
              <MenuItem value="">Все доски</MenuItem>
              {boardsData?.map((board) => (
                <MenuItem key={board.id} value={String(board.id)}>
                  {board.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
        <Button variant="contained" size={'small'} onClick={onOpenModal}>
          Создать задачу
        </Button>
      </div>
    </section>
  )
}

export default Issues
