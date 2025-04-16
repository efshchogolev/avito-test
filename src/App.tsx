import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import Boards from './components/Boards'
import Cabinet from './components/Cabinet'
import Board from './components/Board'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Cabinet />}>
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/issues" element={<div>issues</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
