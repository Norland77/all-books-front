import home from 'img/home.svg'
import my_library from 'img/my-library.svg'
import news from 'img/news.svg'
import friends from 'img/friends.svg'
import settings from 'img/settings.svg'
import book from 'img/book.svg'
import genre from 'img/genre.svg'
import author from 'img/writer.svg'
import { Link } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { useTypedSelector } from 'hooks/useTypedSelector.ts'
import { type FC } from 'react'

const Sidebar: FC = () => {
  const { isAdmin, isLogin } = useTypedSelector(state => state.auth)

  return (
        <>
            <div className={styles.sidebar}>
                <div>
                    <Link className={styles.link} to={'/'}>
                        <img src={home} alt="home"/>
                        <span>Головна</span>
                    </Link>
                    <Link className={styles.link} to={'news'}>
                      <img src={news} alt="news"/>
                      <span>Новини</span>
                    </Link>
                    {
                      isLogin
                        ? <>
                          <Link className={styles.link} to={'my-library'}>
                            <img src={my_library} alt="my-library"/>
                            <span>Особиста бібліотека</span>
                          </Link>
                          <Link className={styles.link} to={'following'}>
                            <img src={friends} alt="following"/>
                            <span>Підписки</span>
                          </Link>
                          <Link className={styles.link} to={'settings'}>
                            <img src={settings} alt="settings"/>
                            <span>Налаштування</span>
                          </Link>
                        </>
                        : ''
                    }
                    { isAdmin
                      ? <>
                          <Link className={styles.link} to={'create_book'}>
                              <img src={book} alt="create_book"/>
                              <span>Додати книгу</span>
                          </Link>
                          <Link className={styles.link} to={'create_genre'}>
                              <img src={genre} alt="create_genre"/>
                              <span>Додати жанр</span>
                          </Link>
                          <Link className={styles.link} to={'create_author'}>
                              <img src={author} alt="create_author"/>
                              <span>Додати автора</span>
                          </Link>
                      </>
                      : ''
                    }
                </div>
            </div>
        </>
  )
}

export default Sidebar
