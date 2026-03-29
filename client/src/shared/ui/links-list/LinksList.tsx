import { useNavigate } from 'react-router-dom'
import styles from './LinksList.module.scss'
import { FC } from 'react'

interface LinksListProps {
    links: {
        title: string,
        link: string
    }[]
}

export const LinksList: FC<LinksListProps> = ({ links }) => {

    const navigate = useNavigate()

    return (
        <ul className={styles.links__list}>
            {
                links?.map((obj, index) => {

                    if (obj.link === 'last') {
                        return <li key={index} className={`${styles.links__item} ${styles.active}`}>{obj.title}</li>
                    }
                    return (
                        <li key={index} className={styles.links__item}>
                            <p className={styles.links__item} onClick={() => navigate(obj.link)}>{obj.title}</p>
                            <i className='ph ph-caret-right'></i>
                        </li>
                    )
                })
            }
        </ul>
    )
}
