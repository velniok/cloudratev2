import { Button, InputRange, Rating } from '@/shared/ui'
import styles from './ReviewCreate.module.scss'
import { addTextReviewApi, createReviewApi } from '../api/reviewApi'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { selectAuthUser } from '@/features/auth'
import { ITrack } from '@/entities/track'
import { getOneTrackThunk } from '@/features/track'
import { IReview, LeavedReview, LeaveReview } from '@/entities/review'
import { IReviewReq } from '../api/reviewApiTypes'

interface ReviewCreateProps {
    track: ITrack
    review?: IReview
}

export const ReviewCreate: FC<ReviewCreateProps> = ({ track, review }) => {
 
    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const user = useAppSelector(selectAuthUser)

    const [errorText, setErrorText] = useState<string>('')

    const onSubmit = async (req: IReviewReq) => {

        if (req.text !== '' && req.text.length < 300) return setErrorText(prev => prev = 'Отзыв должен содержать минимум 300 символов')

        await createReviewApi(req)
            .then(() => {
                notify('Трек оценён', 'Вы успешно оставили оценку', 'success')
                dispatch(getOneTrackThunk({ trackId: track.id, userId: user.id }))
            })
    }

    const onSubmitText = async (req: { id: number, req: { text: string } }) => {

        if (req.req.text !== '' && req.req.text.length < 300) return setErrorText(prev => prev = 'Отзыв должен содержать минимум 300 символов')

        await addTextReviewApi(req)
            .then(() => {
                notify('Отзыв оставлен', 'Вы успешно оставили отзыв к оценке', 'success')
                dispatch(getOneTrackThunk({ trackId: track.id, userId: user.id }))
            })
    }

    if (!review) {
        return <LeaveReview onSubmit={onSubmit} trackId={track.id} userId={user.id} errorText={errorText} clearErrorText={() => setErrorText('')} />
    }

    if (!review.text) {
        return <LeaveReview onSubmit={onSubmitText} trackId={track.id} userId={user.id} review={review} textOnly={true} errorText={errorText} clearErrorText={() => setErrorText('')} />
    }

    return <LeavedReview review={review} />
}
