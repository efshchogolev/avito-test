import s from './Issues.module.scss'
import { useGetTasksQuery } from '../../store/slices/tasksApiSlice.ts'

const Issues = () => {
  const { data: tasksData } = useGetTasksQuery()

  return (
    <section className={s.issues}>
      <div className={s.filters}>
        <input type="text" name="search" />
        <select name="filter"></select>
      </div>
      <div className={s.tasksContainer}>
        <ul className={s.taskList}>
          {tasksData?.map((task) => (
            <li className={s.taskCard} key={task.id}>
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
