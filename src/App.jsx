import { useState } from 'react'
import Add_user from './components/Add_user'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<Add_user />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
