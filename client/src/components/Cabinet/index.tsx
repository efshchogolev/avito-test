import s from './Cabinet.module.scss'
import { NavLink, Outlet } from 'react-router'
import { BOARDS_LINK, ISSUES_LINK } from '../../constants.ts'
import cn from 'classnames'
import TaskModal from '../TaskModal'
import { openModal } from '../../store/slices/modalSlice.ts'
import { useAppDispatch } from '../../hooks/reduxHooks.ts'
import { Button } from '@mui/material'

const LINKS = [
  {
    link: ISSUES_LINK,
    text: 'Все задачи',
    id: 1,
  },
  {
    link: BOARDS_LINK,
    text: 'Проекты',
    id: 2,
  },
]

const Cabinet = () => {
  const dispatch = useAppDispatch()

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
    <div className={s.cabinet}>
      <header className={s.header}>
        <nav className={s.navigation}>
          <ul className={s.navigationList}>
            {LINKS.map((link) => (
              <li className={s.listItem} key={link.id}>
                <NavLink to={link.link}>
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      size={'small'}
                      className={cn(
                        s.linkButton,
                        isActive && s.linkButton_active,
                      )}
                    >
                      {link.text}
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button variant="contained" size={'small'} onClick={onOpenModal}>
          Создать задачу
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
      <TaskModal />
    </div>
  )
}

export default Cabinet
