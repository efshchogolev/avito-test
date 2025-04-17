import s from './Issues.module.scss'
import { useGetTasksQuery } from '../../store/slices/tasksApiSlice.ts'
import { useAppDispatch } from '../../hooks/reduxHooks.ts'
import { openModal } from '../../store/slices/modalSlice.ts'

const Issues = () => {
  const { data: tasksData } = useGetTasksQuery()
  const dispatch = useAppDispatch()

  return (
    <section className={s.issues}>
      <div className={s.filters}>
        <input type="text" name="search" />
        <select name="filter"></select>
      </div>
      <div className={s.tasksContainer}>
        <ul className={s.taskList}>
          {tasksData?.map((task) => (
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
            </li>
          ))}
        </ul>
        <button className={s.button}>Создать задачу</button>
      </div>
    </section>
  )
}

export default Issues
