import { Button, InfoIcon, Title } from '@/shared/ui'
import styles from './TrackGrade.module.scss'
import { FC  } from 'react'
import { ITrack } from '@/entities/track'
import { useAppSelector } from '@/shared/lib'
import { selectAuthStatus } from '@/features/auth'
import { ReviewCreate } from '@/features/review'
import { Link } from 'react-router-dom'

interface TrackGradeProps {
    track: ITrack
}

export const TrackGrade: FC<TrackGradeProps> = ({ track }) => {

    const authUserStatus = useAppSelector(selectAuthStatus)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ВАША ОЦЕНКА</Title>
                    {
                        track.userReview ?
                        <ReviewCreate key={track.userReview.id} track={track} review={track.userReview} />
                        :
                        <ReviewCreate track={track} />
                    }
                    {
                        authUserStatus !== 'success' &&
                        <div className={styles.nonAuth}>
                            <InfoIcon />
                            <p className={styles.nonAuth__text}>Войдите, чтобы сохранять оценки</p>
                            <Link to={'/login'} className={styles.nonAuth__link}>
                                <Button color="accent" padding="14px 20px 10px 20px">Войти</Button>
                            </Link>
                        </div>
                    }
            </div>
        </div>
    )
}
