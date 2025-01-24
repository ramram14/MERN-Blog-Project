import { BrowserRouter, Routes, Route } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import BlogCreate from './pages/BlogCreate'
import BlogPage from './pages/BlogPage'
import BlogEdit from './pages/BlogEdit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/blog/create' element={<BlogCreate />} />
        <Route path='/:slug' element={<BlogPage />} />
        <Route path='/:slug/edit' element={<BlogEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
