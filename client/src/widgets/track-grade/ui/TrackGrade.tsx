import { Title } from '@/shared/ui'
import styles from './TrackGrade.module.scss'
import { FC  } from 'react'
import { ITrack } from '@/entities/track'
import { useAppSelector } from '@/shared/lib'
import { selectAuthStatus, selectAuthUser } from '@/features/auth'
import { IReview, LeaveReviewSkeleton } from '@/entities/review'
import { TStatus } from '@/shared/types'
import { ReviewCreate } from '@/features/review'

interface TrackGradeProps {
    track: ITrack
    trackStatus: TStatus
}

export const TrackGrade: FC<TrackGradeProps> = ({ track, trackStatus }) => {

    const user = useAppSelector(selectAuthUser)
    const userStatus = useAppSelector(selectAuthStatus)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ВАША ОЦЕНКА</Title>
                {
                    trackStatus === 'success' && userStatus === 'success'
                    ?
                    <>
                    {
                        track.reviews.map((review: IReview) => review.userId).includes(user.id) ?
                            track.reviews.map((review: IReview) => {
                                if (review.userId === user.id) {
                                    return <ReviewCreate track={track} review={review} />
                                }
                            })
                        :
                        <ReviewCreate track={track} />
                    }
                    </>
                    :
                    <LeaveReviewSkeleton />
                }
            </div>
        </div>
    )
}
