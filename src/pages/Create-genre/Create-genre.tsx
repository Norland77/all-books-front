import React, { type FC, useEffect, useState } from 'react'
import axios from 'axios'
import styles from './create-genre.module.scss'
import { type IGenre } from 'interfaces/genre.ts'

const CreateGenre: FC = () => {
  const [formData, setFormData] = useState<IGenre>({
    name: '',
    description: '',
    parentId: ''
  })
  const [isCreated, setIsCreated] = useState(false)
  const [genres, setGenres] = useState<IGenre[]>([
    {
      id: '',
      name: '',
      description: '',
      parentId: ''
    }
  ])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>): void => {
    const { name, value } = event.target
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }
  const createGenre = async (): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/genre/create`, {
      name: formData.name,
      description: formData.description,
      parentId: formData.parentId !== 'Null' ? formData.parentId : null
    }, { withCredentials: true, headers: { 'Access-Control-Allow-Credentials': true } }).then(res => {
      if (res.data === 'Created') {
        setIsCreated(true)
        setFormData({
          name: '',
          description: '',
          parentId: ''
        })
      }
    }).catch(err => { console.log(err) })
  }

  async function getGenres (): Promise<void> {
    await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/genre/all`).then(res => {
      const allGenres = res.data
      setGenres(allGenres)
    })
  }

  useEffect(() => {
    void getGenres()
  }, [])

  const parentGenres = genres.map((genres, index) => {
    if (genres.parentId === null) {
      return <option key={index} value={genres.id}>{genres.name}</option>
    }
    return 0
  })

  return (
    <div className={styles.login}>
      <div>
        <h2>Додавання жанру</h2>
        <div className={styles.login_block}>
          <input className={styles.name} type="text" placeholder={'Назва'} name={'name'} value={formData.name} onChange={handleChange}/>
          <select className={styles.parentId} name={'parentId'} value={formData.parentId} onChange={handleChange}>
            <option key={0} value={'Null'}>None</option>
            { parentGenres }
          </select>
          <textarea className={styles.description} name={'description'} value={formData.description} onChange={handleChange}></textarea>
          <button onClick={async () => { await createGenre() }}>Створити</button>
          {isCreated ? <span>Жанр успішно додан в базу даних</span> : ''}
        </div>
      </div>
    </div>
  )
}

export default CreateGenre
