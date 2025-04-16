import './App.css'
import { Routes, Route, Outlet, Navigate } from 'react-router'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <div>
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<div>boards</div>} />
          <Route path="/board/:id" element={<div>boardID</div>} />
          <Route path="/issues" element={<div>issues</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
