import s from './Cabinet.module.scss'
import { NavLink, Outlet } from 'react-router'
import { BOARDS_LINK, ISSUES_LINK } from '../../constants.ts'
import cn from 'classnames'
import TaskModal from '../TaskModal'
import { toggleIsOpenState } from '../../store/slices/modalSlice.ts'
import { useAppDispatch } from '../../hooks/reduxHooks.ts'

const LINKS = [
  {
    link: BOARDS_LINK,
    text: 'Все задачи',
    id: 1,
  },
  {
    link: ISSUES_LINK,
    text: 'Проекты',
    id: 2,
  },
]

const Cabinet = () => {
  const dispatch = useAppDispatch()

  const onOpenModal = () => {
    dispatch(toggleIsOpenState({ isOpen: true }))
  }

  return (
    <div className={s.cabinet}>
      <header className={s.header}>
        <nav className={s.navigation}>
          <ul className={s.navigationList}>
            {LINKS.map((link) => (
              <li className={s.listItem} key={link.id}>
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
        <button onClick={onOpenModal}>Создать задачу</button>
      </header>
      <Outlet />
      <TaskModal />
    </div>
  )
}

export default Cabinet
