import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar.tsx'
import Header from '../../components/Header/Header.tsx'
import styles from './layout.module.scss'
import { type FC, useEffect } from 'react'
import axios from 'axios'
import { type ILoginResponse } from 'interfaces/Auth.ts'
import { jwtDecode } from 'jwt-decode'
import { useTypedSelector } from 'hooks/useTypedSelector.ts'
import { useDispatch } from 'react-redux'
const Layout: FC = () => {
  const { token } = useTypedSelector(state => state.auth)
  const dispatch = useDispatch()
  const auth = async (): Promise<void> => {
    await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh-tokens`, {
      withCredentials: true
    }).then(res => {
      const token = res.data.accessToken
      const loginRes: ILoginResponse = jwtDecode(token)
      const user: ILoginResponse = {
        id: loginRes.id,
        username: loginRes.username,
        avatar: loginRes.avatar
      }
      dispatch({ type: 'SET_TOKEN', payload: token })
      dispatch({ type: 'SET_USER', payload: user })
      dispatch({ type: 'SET_LOGIN', payload: true })
    })
  }
  useEffect(() => {
    console.log('UseEffeck')
    if (token === '') {
      void auth()
    }
  })

  return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.main}>
                <Sidebar />
                <Outlet />
            </div>

        </div>
  )
}

export default Layout
