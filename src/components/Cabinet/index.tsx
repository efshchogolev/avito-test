import s from './Cabinet.module.scss'
import { NavLink, Outlet } from 'react-router'
import { BOARDS_LINK, ISSUES_LINK } from '../../constants.ts'
import cn from 'classnames'

const LINKS = [
  {
    link: BOARDS_LINK,
    text: 'Все задачи',
  },
  {
    link: ISSUES_LINK,
    text: 'Проекты',
  },
]

const Cabinet = () => {
  return (
    <div className={s.cabinet}>
      <header className={s.header}>
        <nav className={s.navigation}>
          <ul className={s.navigationList}>
            {LINKS.map((link) => (
              <li className={s.listItem}>
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    cn(s.navigationLink, isActive && s.navigationLink_active)
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button> Создать задачу</button>
      </header>
      <Outlet />
    </div>
  )
}

export default Cabinet
