import Modal from '@mui/material/Modal'
import s from './TaskModal.module.scss'
import { Button, IconButton, MenuItem, TextField } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks.ts'
import { closeModal } from '../../store/slices/modalSlice.ts'
import { useGetTaskQuery } from '../../store/slices/tasksApiSlice.ts'
import { useLocation, useNavigate } from 'react-router'

const TaskModal = () => {
  const isModalOpenSelector = useAppSelector((state) => state.modal.isOpen)
  const taskIdSelector = useAppSelector((state) => state.modal.taskId)
  const boardIdSelector = useAppSelector((state) => state.modal.boardId)

  const location = useLocation()
  const navigate = useNavigate()
  const isOnIssuesPage = location.pathname.startsWith('/issues')

  const title = taskIdSelector ? 'Редактирование задачи' : 'Создание задачи'
  const buttonText = taskIdSelector ? 'Обновить' : 'Создать'

  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(closeModal())
  }

  const { data: taskData } = useGetTaskQuery(
    { taskId: taskIdSelector! },
    { skip: !taskIdSelector },
  )

  console.log(boardIdSelector)
  console.log(isOnIssuesPage)

  return (
    <Modal open={isModalOpenSelector} onClose={onClose} className={s.modal}>
      <div className={s.modalContent}>
        <IconButton
          className={s.closeButton}
          onClick={onClose}
          color="default"
          size={'small'}
        >
          <CloseRoundedIcon />
        </IconButton>
        <header>
          <h2 className={s.modalTitle}>{title}</h2>
        </header>
        <form className={s.form}>
          <TextField label={'Название'} size={'small'} />
          <TextField label="Описание" multiline rows={4} />
          <TextField select label="Проект" defaultValue="1" size={'small'}>
            <MenuItem value={1}>один</MenuItem>
          </TextField>
          <TextField select label="Приоритет" defaultValue="1" size={'small'}>
            <MenuItem value={1}>один</MenuItem>
          </TextField>
          <TextField select label="Статус" defaultValue="1" size={'small'}>
            <MenuItem value={1}>один</MenuItem>
          </TextField>
          <TextField select label="Исполнитель" defaultValue="1" size={'small'}>
            <MenuItem value={1}>один</MenuItem>
          </TextField>
          <div className={s.buttonsContainer}>
            <Button variant="contained" size={'small'}>
              {buttonText}
            </Button>
            {boardIdSelector && isOnIssuesPage && (
              <Button
                variant="contained"
                size={'small'}
                onClick={() => {
                  navigate(`/board/${boardIdSelector}`)
                  onClose()
                }}
              >
                Перейти на доску
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default TaskModal
