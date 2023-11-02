
import home from 'img/home.svg'
import my_library from 'img/my-library.svg'
import news from 'img/news.svg'
import friends from 'img/friends.svg'
import settings from 'img/settings.svg'
import {Link} from "react-router-dom";
import styles from './Sidebar.module.scss'


const Sidebar = () => {
    return (
        <>
            <div className={styles.sidebar}>
                <div>
                    <Link className={styles.link} to={'/'}>
                        <img src={home} alt="home"/>
                        <span>Головна</span>
                    </Link>
                    <Link className={styles.link} to={'my-library'}>
                        <img src={my_library} alt="my-library"/>
                        <span>Особиста бібліотека</span>
                    </Link>
                    <Link className={styles.link} to={'news'}>
                        <img src={news} alt="news"/>
                        <span>Новини</span>
                    </Link>
                    <Link className={styles.link} to={'following'}>
                        <img src={friends} alt="following"/>
                        <span>Підписки</span>
                    </Link>
                    <Link className={styles.link} to={'settings'}>
                        <img src={settings} alt="settings"/>
                        <span>Налаштування</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;