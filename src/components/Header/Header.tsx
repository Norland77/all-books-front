import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import notification from 'img/notification.svg'
import mail from 'img/mail.svg'
import tempAva from 'img/tempAva.png'
import logo from 'img/logo.svg'
import { type ReactElement } from 'react'
import { useTypedSelector } from 'hooks/useTypedSelector.ts'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Header = (): ReactElement<any, any> => {
  const { isLogin } = useTypedSelector(state => state.auth)
  const { user } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = async (): Promise<void> => {
    await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
      withCredentials: true
    }).then(res => {
      if (res.data === 'OK') {
        dispatch({ type: 'SET_LOGIN', payload: false })
        navigate('/')
      }
    })
  }

  return (
      <>
          <header>
              <div className={styles.nav}>
                  <img className={styles.logo} src={logo} alt="logo"/>
                  <Link className={styles.link} to={'library'}>Бібліотека</Link>
                  <Link className={styles.link} to={'books'}>Книги</Link>
                  <Link className={styles.link} to={'authors'}>Автори</Link>
              </div>
              <div className={styles.search}>
                  <input type="text" placeholder={'Пошук'}/>
              </div>
              <div className={styles.buttons}>
                  <Link className={styles.link} to={'news'}>
                      <img src={notification} alt="news"/>
                  </Link>
                  <Link className={styles.link} to={'news'}>
                      <img src={mail} alt="news"/>
                  </Link>
              </div>
            {
              isLogin
                ? <div className={styles.profile}>
                    <div>
                      <span>{user.username}</span>
                      <div>
                        <Link className={styles.profile_btn} to={'/profile'}>Профіль</Link>
                        <span onClick={logout} className={styles.profile_btn}>Вийти</span>
                      </div>
                    </div>
                  {
                    user.avatar !== ''
                      ? <img src={user.avatar} alt="avatar"/>
                      : <img src={tempAva} alt="avatar"/>
                  }
                </div>
                : <div className={styles.profile}>
                  <Link to={'login'} className={styles.auth_btn}>Увійти</Link>
                  <span>/</span>
                  <Link to={'register'} className={styles.auth_btn}>Зареєструватись</Link>
                </div>
            }

          </header>
      </>
  )
}

export default Header
