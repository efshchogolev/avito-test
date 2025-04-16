import s from './Boards.module.scss'
import { Link } from 'react-router'

const index = () => {
  return (
    <section className={s.boards}>
      <ul className={s.boardsList}>
        <li className={s.boardCard}>
          <h2 className={s.projectTitle}>Название</h2>
          <Link className={s.link} to={'/board/1'}>
            Перейти к доске
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default index
