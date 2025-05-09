import Modal from '@mui/material/Modal'
import s from './TaskModal.module.scss'
import { Button, IconButton, MenuItem, TextField } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks.ts'
import { closeModal } from '../../store/slices/modalSlice.ts'
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '../../store/slices/tasksApiSlice.ts'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { TaskForm } from '../../@types'
import { useGetBoardsQuery } from '../../store/slices/boardsApiSlice.ts'
import { useGetUsersQuery } from '../../store/slices/userApiSlice.ts'
import { useEffect } from 'react'
import { PRIORITIES, STATUSES } from '../../constants.ts'

const TaskModal = () => {
  const isModalOpenSelector = useAppSelector((state) => state.modal.isOpen)
  const taskIdSelector = useAppSelector((state) => state.modal.taskId)
  const boardIdSelector = useAppSelector((state) => state.modal.boardId)
  const taskSelector = useAppSelector((state) => state.modal.task)

  const location = useLocation()
  const navigate = useNavigate()
  const isOnIssuesPage = location.pathname.startsWith('/issues')

  const isUpdateForm = !!taskIdSelector

  const title = isUpdateForm ? 'Редактирование задачи' : 'Создание задачи'
  const buttonText = isUpdateForm ? 'Обновить' : 'Создать'

  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(closeModal())
  }

  const { id } = useParams()

  const boardId = Number(id) || boardIdSelector

  const { data: boardsData = [] } = useGetBoardsQuery()
  const { data: usersData = [] } = useGetUsersQuery()

  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const { handleSubmit, register, reset, formState } = useForm<TaskForm>({
    mode: 'onSubmit',
  })

  const { errors } = formState

  const onSubmit = async (taskData: TaskForm) => {
    try {
      if (isUpdateForm) {
        await updateTask({ task: taskData, taskId: taskIdSelector })
      } else {
        await createTask(taskData).unwrap()
      }
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!isModalOpenSelector) return
    if (isUpdateForm) {
      reset({
        status: taskSelector?.status,
        priority: taskSelector?.priority,
        title: taskSelector?.title,
        assigneeId: taskSelector?.assignee.id,
        description: taskSelector?.description,
        boardId: boardId,
      })
    } else {
      reset({
        title: '',
        description: '',
        priority: null,
        status: null,
        assigneeId: null,
        boardId: boardId,
      })
    }
  }, [isModalOpenSelector, boardId, taskSelector])

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
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={'Название'}
            size={'small'}
            {...register('title', {
              required: 'Обязательное поле',
              maxLength: {
                value: 100,
                message: 'Название должно соддержать не более 100 символов',
              },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Описание"
            multiline
            rows={4}
            {...register('description', {
              required: 'Обязательное поле',
              maxLength: {
                value: 100,
                message: 'Описание должно соддержать не более 500 символов',
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            select
            label="Проект"
            size={'small'}
            {...register('boardId', { required: 'Обязательное поле' })}
            {...(boardId && { defaultValue: boardId })}
            disabled={!!boardId}
            error={!!errors.boardId}
            helperText={errors.boardId?.message}
          >
            {boardsData?.map((board) => (
              <MenuItem value={board.id}>{board.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Приоритет"
            size={'small'}
            {...register('priority')}
            {...(taskSelector?.priority && {
              defaultValue: taskSelector?.priority,
            })}
          >
            {PRIORITIES.map((priority) => (
              <MenuItem value={priority.value}>{priority.name}</MenuItem>
            ))}
          </TextField>
          {isUpdateForm && (
            <TextField
              select
              label="Статус"
              size={'small'}
              {...register('status')}
              {...(taskSelector?.status && {
                defaultValue: taskSelector?.status,
              })}
            >
              {STATUSES.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            select
            label="Исполнитель"
            size={'small'}
            {...register('assigneeId', { required: 'Обязательное поле' })}
            {...(taskSelector?.assignee.id && {
              defaultValue: taskSelector?.assignee.id,
            })}
            error={!!errors.assigneeId}
            helperText={errors.assigneeId?.message}
          >
            {usersData?.map((user) => (
              <MenuItem value={user.id}>{user.fullName}</MenuItem>
            ))}
          </TextField>
          <div className={s.buttonsContainer}>
            <Button variant="contained" size={'small'} type={'submit'}>
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
