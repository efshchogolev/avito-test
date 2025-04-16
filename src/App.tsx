import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import Boards from './components/Boards'
import Cabinet from './components/Cabinet'
import Board from './components/Board'
import Issues from './components/Issues'
import { useState } from 'react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <Cabinet setIsModalOpen={setIsModalOpen} isOpen={isModalOpen} />
          }
        >
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/issues" element={<Issues />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
