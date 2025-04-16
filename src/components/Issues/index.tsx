import s from './Issues.module.scss'

const Issues = () => {
  return (
    <section className={s.issues}>
      <div className={s.filters}>
        <input type="text" name="search" />
        <select name="filter"></select>
      </div>
      <div className={s.tasksContainer}>
        <ul className={s.taskList}>
          <li className={s.taskCard}>
            <h2 className={s.taskName}>Задача 1</h2>
          </li>
          <li className={s.taskCard}>
            <h2 className={s.taskName}>Задача 1</h2>
          </li>
        </ul>
        <button className={s.button}>Создать задачу</button>
      </div>
    </section>
  )
}

export default Issues
