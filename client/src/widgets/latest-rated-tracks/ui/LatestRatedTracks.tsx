import { TrackCard, type ITrack } from "@/entities/track"
import { Title } from "@/shared/ui"
import styles from "./LatestRatedTracks.module.scss"
import { FC } from "react"
import { IUser } from "@/entities/user"
import { TStatus } from "@/shared/types"
import { IReview } from "@/entities/review"

interface LatestRatedTracksProps {
    user: IUser
    userStatus: TStatus
}

export const LatestRatedTracks: FC<LatestRatedTracksProps> = ({ user, userStatus }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>НЕДАВНИЕ ОЦЕНКИ</Title>
                <div className={styles.list}>
                    {
                        userStatus === 'success'
                        ?
                        <>
                        {
                            user.reviews.map((review: IReview) => {
                                return <TrackCard key={review.id} track={review.track} />
                            })
                        }
                        </>
                        :
                        <>Загрузка</>
                    }
                </div>
            </div>
        </div>
    )
}
