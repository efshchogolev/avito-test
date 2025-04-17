import s from './Boards.module.scss'
import { Link } from 'react-router'
import { useGetBoardsQuery } from '../../store/slices/boardsApiSlice.ts'

const Boards = () => {
  const { data: boardsData } = useGetBoardsQuery()
  console.log(boardsData)

  return (
    <section className={s.boards}>
      <ul className={s.boardsList}>
        {boardsData?.map((board) => (
          <li className={s.boardCard} key={board.id}>
            <h2 className={s.boardName}>{board.name}</h2>
            <Link className={s.link} to={`/board/${board.id}`}>
              Перейти к доске
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Boards
