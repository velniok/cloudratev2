import { TrackCard, TrackCardSekelton, type ITrack } from "@/entities/track"
import { Slider, Title } from "@/shared/ui"
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
                <Slider>
                    {
                        userStatus === 'success'
                        ?
                        <>
                        {
                            user.reviews.length > 0 ?
                            user.reviews.map((review: IReview) => {
                                return <TrackCard key={review.id} review={review} track={review.track} />
                            })
                            :
                            <>Пользователь ничего не оценил</>
                        }
                        </>
                        :
                        Array.from({ length: 5 }).map((_, index) => {
                            return <TrackCardSekelton key={index} />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
