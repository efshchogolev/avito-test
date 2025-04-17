import s from './Boards.module.scss'
import { Link } from 'react-router'
import { useGetBoardsQuery } from '../../store/slices/boardsApiSlice.ts'
import { Button, CircularProgress } from '@mui/material'

const Boards = () => {
  const { data: boardsData, isLoading: isBoardsLoading } = useGetBoardsQuery()
  console.log(boardsData)

  return (
    <section className={s.boards}>
      <ul className={s.boardsList}>
        {isBoardsLoading ? (
          <CircularProgress className={s.spinner} />
        ) : (
          boardsData?.map((board) => (
            <li className={s.boardCard} key={board.id}>
              <h2 className={s.boardName}>{board.name}</h2>
              <Link className={s.link} to={`/board/${board.id}`}>
                <Button variant="text" size={'small'}>
                  Перейти к доске
                </Button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default Boards
