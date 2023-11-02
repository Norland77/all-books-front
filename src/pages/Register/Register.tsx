import React, { type FC, useEffect, useState } from 'react'
import { type IRegister } from 'interfaces/Auth.ts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './register.module.scss'
import { type IGenders } from 'interfaces/Genders.ts'
const Register: FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IRegister>({
    email: '',
    password: '',
    country: '',
    first_name: '',
    gender: 'Ніякий',
    nickname: '',
    passwordRepeat: '',
    second_name: ''
  })

  const [genders, setGenders] = useState<IGenders[]>([
    {
      id: '',
      name: ''
    }
  ])

  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isValidPasswordLength, setIsValidPasswordLength] = useState(true)
  const [isValidLoginAndEmail, setIsValidLoginAndEmail] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }
  const register = async (): Promise<void> => {
    event?.preventDefault()
    if (formData.password.length < 8) {
      setIsValidPasswordLength(false)
      return
    }
    if (formData.password !== formData.passwordRepeat) {
      setIsValidPassword(false)
      return
    }
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
      username: formData.nickname,
      email: formData.email,
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
      first_name: formData.first_name,
      last_name: formData.second_name,
      genderName: formData.gender,
      country: formData.country
    }, { withCredentials: true }).then(res => {
      console.log(res)
      if (res.statusText === 'Created') {
        alert('Ви успішно зареєструвались, тепер можете увійти використавши email та пароль')
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
      console.log(err.response.data.message)
      if (err.response.data.message === 'This username or email is already in use') {
        setIsValidLoginAndEmail(false)
      }
      if (err.response.data.message[0] === 'email must be an email') {
        setIsValidEmail(false)
      }
    })
  }

  async function getGenders (): Promise<void> {
    await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/gender/all`).then(res => {
      const allGenders = res.data
      setGenders(allGenders)
      console.log(allGenders)
    })
  }

  useEffect(() => {
    void getGenders()
  }, [])
  return (
    <div className={styles.register}>
      <div>
        <h2>Логін</h2>
        <form className={styles.register__blok}>
          <div>
            {/* Зробити завантаження картинок */}
            <div className={styles.validate_block}>
              <input required={true} className={isValidLoginAndEmail ? styles.login : styles.wrong_login} type="text" placeholder={'Нікнейм'} name={'nickname'} value={formData.nickname} onChange={handleChange}/>
              <span className={isValidLoginAndEmail ? styles.valid_text : styles.wrong_text}>Такий нікнейм або email вже зайняті</span>
            </div>
            <div className={styles.validate_block}>
              <input required={true} className={isValidLoginAndEmail ? styles.email : styles.wrong_email} type="email" placeholder={'Email'} name={'email'} value={formData.email} onChange={handleChange}/>
              <span className={isValidLoginAndEmail ? styles.valid_text : styles.wrong_text}>Такий нікнейм або email вже зайняті</span>
              <span className={isValidEmail ? styles.valid_text : styles.wrong_text}>Це не валідний email</span>
            </div>
            <div className={styles.validate_block}>
              <input required={true} className={isValidPasswordLength ? styles.password : styles.wrong_password} type="password" placeholder={'Password'} name={'password'} value={formData.password} onChange={handleChange}/>
              <span className={isValidPasswordLength ? styles.valid_text : styles.wrong_text}>Пароль повинен мати більше 8 символів</span>
            </div>
            <div className={styles.validate_block}>
              <input required={true} className={isValidPassword ? styles.password : styles.wrong_password} type="password" placeholder={'Password'} name={'passwordRepeat'} value={formData.passwordRepeat} onChange={handleChange}/>
              <span className={isValidPassword ? styles.valid_text : styles.wrong_text}>Паролі не співпадають</span>
            </div>
          </div>
          <div>
            <input className={styles.name} type="text" placeholder={'Ім`я'} name={'first_name'} value={formData.first_name} onChange={handleChange}/>
            <input className={styles.name} type="text" placeholder={'Прізвище'} name={'second_name'} value={formData.second_name} onChange={handleChange}/>
            <select className={styles.gender} name={'gender'} value={formData.gender} onChange={handleChange}>
              { genders.map((genders, index) => (
                <option key={index} value={genders.name}>{genders.name}</option>
              ))}
            </select>
            <input className={styles.country} type="text" placeholder={'Країна'} name={'country'} value={formData.country} onChange={handleChange}/>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <input onClick={register} type={'submit'} value={'Зареєструватись'}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
