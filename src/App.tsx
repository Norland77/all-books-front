import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Layout from './pages/Layout/Layout.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import { type FC } from 'react'

const App: FC = () => {
  return (
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Route>
        </Routes>
      </Provider>
  )
}

export default App
