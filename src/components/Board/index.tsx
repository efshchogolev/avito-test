import s from './Board.module.scss'
import { useParams } from 'react-router'
import {
  useGetBoardsQuery,
  useGetBoardTasksQuery,
} from '../../store/slices/boardsApiSlice.ts'
import { TaskStatus } from '../../@types'
import { openModal } from '../../store/slices/modalSlice.ts'
import { useAppDispatch } from '../../hooks/reduxHooks.ts'

const STATUSES: { status: TaskStatus; title: string }[] = [
  { status: 'Backlog', title: 'To do' },
  {
    status: 'InProgress',
    title: 'In Progress',
  },
  {
    status: 'Done',
    title: 'Done',
  },
]

const Project = () => {
  const { id } = useParams<{ id: string }>()
  const boardId = Number(id)

  const dispatch = useAppDispatch()

  const { data: tasksData = [] } = useGetBoardTasksQuery(
    { boardId },
    { skip: !boardId },
  )

  const { data: board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((b) => b.id === boardId),
    }),
  })

  return (
    <section className={s.project}>
      <h2 className={s.title}>{board?.name}</h2>
      <div className={s.board}>
        {STATUSES.map((statusObj) => {
          const tasksColumn = tasksData?.filter(
            (task) => task.status === statusObj.status,
          )
          return (
            <div className={s.column} key={statusObj.status}>
              <h3 className={s.columnTitle}>{statusObj.title}</h3>
              <ul className={s.taskList}>
                {tasksColumn?.map((task) => (
                  <li
                    className={s.task}
                    key={task.id}
                    onClick={() => {
                      dispatch(
                        openModal({
                          taskId: task.id,
                          task: task,
                          boardId: board?.id,
                        }),
                      )
                    }}
                  >
                    <h4 className={s.taskTitle}>{task.title}</h4>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Project
