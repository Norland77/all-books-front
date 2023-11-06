import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout.tsx'
import { refreshTokensLoader } from './loaders/refreshTokens.ts'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import RequireAdmin from './hoc/RequireAdmin.tsx'
import CreateAuthor from './pages/Create-author/Create-author.tsx'
import CreateGenre from './pages/Create-genre/Create-genre.tsx'

const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<Layout/>} loader={refreshTokensLoader}>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/create_author" element={
          <RequireAdmin>
            <CreateAuthor />
          </RequireAdmin>
        }/>
        <Route path="/create_genre" element={
          <RequireAdmin>
            <CreateGenre />
          </RequireAdmin>
        }/>
      </Route>
), { basename: '/app' })

export default router
