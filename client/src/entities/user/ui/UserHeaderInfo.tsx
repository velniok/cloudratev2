import { type FC } from "react"
import { Badges, Button, CalendarIcon, Cover, EditIcon, LinkIcon } from "@/shared/ui"
import type { IUser } from "../model/types"
import styles from "./UserHeaderInfo.module.scss"
import { useNavigate } from "react-router-dom"
import { getMonth, getOptimizedAvatar, pluralize, useAppSelector } from "@/shared/lib"
import { selectAuthUser } from "@/features/auth"
import { IReview } from "@/entities/review"

interface UserHeaderInfoProps {
    user: IUser | null
}

export const UserHeaderInfo: FC<UserHeaderInfoProps> = ({ user }) => {

    const navigate = useNavigate()
    const authUser = useAppSelector(selectAuthUser)

    return (
        <div className={styles.inner}>
            <Cover width="200px" height="200px" borderRadius="24px" className={styles.avatar} url={getOptimizedAvatar(user.avatarUrl, 200, 200)} />
            <div className={styles.info}>
                <h2 className={styles.nickname}>
                    {user.nickname}
                    {
                        user?.role !== 'user' && <Badges role={user.role} />
                    }
                    </h2>
                <p className={styles.username}>@{user.username}</p>
                <div className={styles.created}>
                    <CalendarIcon />
                    <p className={styles.created__text}>Дата регистрации: <strong className={styles.created__bold}>{getMonth(user.createdAt)} {new Date(user.createdAt).getUTCFullYear()}</strong></p>
                </div>
                <a href="#!" className={styles.soundcloud}>
                    <LinkIcon />
                    SoundCloud
                </a>
                <div className={styles.stats}>
                    <div className={styles.stats__item}>
                        <span className={styles.stats__count}>{user.reviews.length}</span>
                        <p className={styles.stats__title}>{pluralize(user.reviews.length, 'оценка', 'оценки', 'оценок')}</p>
                    </div>
                    <div className={styles.stats__item}>
                        <span className={styles.stats__count}>{user.reviews.filter((review: IReview) => review?.text).length}</span>
                        <p className={styles.stats__title}>{pluralize(user.reviews.filter((review: IReview) => review?.text).length, 'отзыв', 'отзыва', 'отзывов')}</p>
                    </div>
                </div>
                {
                    authUser?.id === user.id &&
                    <div className={styles.editButton}>
                        <Button className={styles.button} color="default" padding="10px 20px 10px 20px" onClick={() => navigate('edit')}>
                            <div className={styles.buttonInner}>
                                <EditIcon />
                                <span className={styles.buttonText}>Изменить профиль</span>
                            </div>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
