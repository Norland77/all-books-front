import { type FC, useState } from 'react'
import axios from 'axios'
import styles from './create-author.module.scss'
import { type IAuthor } from 'interfaces/Author.ts'

const CreateAuthor: FC = () => {
  const [formData, setFormData] = useState<IAuthor>({
    firstName: '',
    lastName: '',
    bio: '',
    country: '',
    image: '',
    dateOfBirth: ''
  })
  const [isCreated, setIsCreated] = useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>): void => {
    const { name, value } = event.target
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }
  const createAuthor = async (): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/author/create`, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      country: formData.country,
      image: formData.image,
      dateOfBirth: new Date(formData.dateOfBirth)
    }, { withCredentials: true }).then(res => {
      if (res.data === 'Created') {
        setIsCreated(true)
        setFormData({
          firstName: '',
          lastName: '',
          bio: '',
          country: '',
          image: '',
          dateOfBirth: ''
        })
      }
    }).catch(err => { console.log(err) })
  }

  return (
    <div className={styles.login}>
      <div>
        <h2>Додавання автора</h2>
        <div className={styles.login_block}>
          <div>
            <input className={styles.firs_name} type="text" placeholder={'Ім`я'} name={'firstName'} value={formData.firstName} onChange={handleChange}/>
            <input className={styles.last_name} type="text" placeholder={'Прізвище'} name={'lastName'} value={formData.lastName} onChange={handleChange}/>
            <input className={styles.country} type="text" placeholder={'Країна'} name={'country'} value={formData.country} onChange={handleChange}/>
            <button onClick={async () => { await createAuthor() }}>Створити</button>
            {isCreated ? <span>Автор успішно додан в базу даних</span> : ''}
          </div>
          <div>
            <input className={styles.image} type="url" placeholder={'Посилання на картинку'} name={'image'} value={formData.image} onChange={handleChange}/>
            <input className={styles.date_of_birth} type="date" name={'dateOfBirth'} value={formData.dateOfBirth} onChange={handleChange}/>
            <textarea className={styles.bio} name={'bio'} value={formData.bio} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAuthor
