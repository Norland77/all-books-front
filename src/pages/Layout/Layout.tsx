import { Outlet, useLoaderData } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar.tsx'
import Header from '../../components/Header/Header.tsx'
import styles from './layout.module.scss'
import { type FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { type ILoginResponse } from 'interfaces/Auth.ts'
const Layout: FC = () => {
  const dispatch = useDispatch()
  const { token, user } = useLoaderData() as { token: string, user: ILoginResponse }
  useEffect(() => {
    if (token !== '') {
      if (user.role.includes('ADMIN')) {
        dispatch({ type: 'SET_ADMIN', payload: true })
      } else {
        dispatch({ type: 'SET_ADMIN', payload: false })
      }
      dispatch({ type: 'SET_TOKEN', payload: token })
      dispatch({ type: 'SET_USER', payload: user })
      dispatch({ type: 'SET_LOGIN', payload: true })
    }
  }, [])

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
