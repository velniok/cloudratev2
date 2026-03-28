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
    const [createReviewLoading, setCreateReviewLoading] = useState<boolean>(false)

    const onSubmit = async (req: IReviewReq) => {

        if (createReviewLoading) return false
        if (req.text !== '' && req.text.length < 300) return setErrorText(prev => prev = 'Отзыв должен содержать минимум 300 символов')

        setCreateReviewLoading(true)
        await createReviewApi(req)
            .then(() => {
                notify('Трек оценён', 'Вы успешно оставили оценку', 'success')
                dispatch(getOneTrackThunk({ trackId: track.id, userId: user.id }))
                setCreateReviewLoading(false)
            })
    }

    const onSubmitText = async (req: { id: number, req: { text: string, userId: number } }) => {

        if (createReviewLoading) return false
        if (req.req.text !== '' && req.req.text.length < 300) return setErrorText(prev => prev = 'Отзыв должен содержать минимум 300 символов')

        setCreateReviewLoading(true)
        await addTextReviewApi(req)
            .then(() => {
                notify('Отзыв оставлен', 'Вы успешно оставили отзыв к оценке', 'success')
                dispatch(getOneTrackThunk({ trackId: track.id, userId: user.id }))
                setCreateReviewLoading(false)
            })
    }

    if (!review) {
        return <LeaveReview onSubmit={onSubmit} createReviewLoading={createReviewLoading} trackId={track.id} userId={user.id} errorText={errorText} clearErrorText={() => setErrorText('')} />
    }

    if (!review.text) {
        return <LeaveReview onSubmit={onSubmitText} createReviewLoading={createReviewLoading} trackId={track.id} userId={user.id} review={review} textOnly={true} errorText={errorText} clearErrorText={() => setErrorText('')} />
    }

    return <LeavedReview review={review} />
}
