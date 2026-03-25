import { Button, InfoIcon, Title } from '@/shared/ui'
import styles from './TrackGrade.module.scss'
import { FC  } from 'react'
import { ITrack } from '@/entities/track'
import { useAppSelector } from '@/shared/lib'
import { selectAuthStatus, selectAuthUser } from '@/features/auth'
import { IReview, LeaveReviewSkeleton } from '@/entities/review'
import { TStatus } from '@/shared/types'
import { ReviewCreate } from '@/features/review'
import { Link } from 'react-router-dom'

interface TrackGradeProps {
    track: ITrack
    trackStatus: TStatus
}

export const TrackGrade: FC<TrackGradeProps> = ({ track, trackStatus }) => {

    const authUser = useAppSelector(selectAuthUser)
    const authUserStatus = useAppSelector(selectAuthStatus)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ВАША ОЦЕНКА</Title>
                {
                    trackStatus === 'success' && authUserStatus === 'success'
                    ?
                    <>
                    {
                        track.reviews.map((review: IReview) => review.userId).includes(authUser.id) ?
                            track.reviews.map((review: IReview) => {
                                if (review.userId === authUser.id) {
                                    return <ReviewCreate key={review.id} track={track} review={review} />
                                }
                            })
                        :
                        <ReviewCreate track={track} />
                    }
                    </>
                    : authUserStatus !== 'success' ?
                    <div className={styles.nonAuth}>
                        <InfoIcon />
                        <p className={styles.nonAuth__text}>Войдите, чтобы сохранять оценки</p>
                        <Link to={'/login'} className={styles.nonAuth__link}>
                            <Button color="accent" padding="14px 20px 10px 20px">Войти</Button>
                        </Link>
                    </div>
                    :
                    <LeaveReviewSkeleton />
                }
            </div>
        </div>
    )
}
