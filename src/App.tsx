import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import Boards from './components/Boards'
import Cabinet from './components/Cabinet'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Cabinet />}>
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<div>boardID</div>} />
          <Route path="/issues" element={<div>issues</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
