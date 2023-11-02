import styles from './login.module.scss'
import React, { type FC, useState } from 'react'
import { type ILogin, type ILoginResponse } from 'interfaces/Auth.ts'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }
  const login = async (): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
      email: formData.email,
      password: formData.password
    }, { withCredentials: true }).then(res => {
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
      navigate('/')
    })
  }

  return (
    <div className={styles.login}>
      <div>
        <h2>Логін</h2>
        <input className={styles.email} type="email" placeholder={'Email'} name={'email'} value={formData.email} onChange={handleChange}/>
        <input className={styles.password} type="password" placeholder={'Password'} name={'password'} value={formData.password} onChange={handleChange}/>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={async () => { await login() }}>Увійти</button>
        <button>Відновлення паролю</button>
      </div>
    </div>
  )
}

export default Login
