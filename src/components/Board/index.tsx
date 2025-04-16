import s from './Board.module.scss'

const Project = () => {
  return (
    <section className={s.project}>
      <h2 className={s.title}>Название проекта</h2>
      <div className={s.board}>
        <div className={s.column}>
          <h3 className={s.columnTitle}>To do</h3>
          <ul className={s.taskList}>
            <li className={s.task}>
              <h4 className={s.taskTitle}>Задача 1</h4>
            </li>
          </ul>
        </div>
        <div className={s.column}>
          <h3 className={s.columnTitle}>In progress</h3>
        </div>
        <div className={s.column}>
          <h3 className={s.columnTitle}>Done</h3>
        </div>
      </div>
    </section>
  )
}

export default Project
