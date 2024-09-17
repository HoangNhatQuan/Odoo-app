import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './layout'
import RegisterPage from './auth/register'
import LoginPage from './auth/login'
import Home from './home/home'
import HomeLayout from './home/_layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route index path="/register" element={<RegisterPage />} />
          <Route index path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
