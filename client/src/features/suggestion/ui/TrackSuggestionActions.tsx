import { FC } from 'react'
import { acceptTrackSuggestionApi, rejectTrackSuggestionApi } from '../api/suggestionApi'
import styles from './TrackSuggestionActions.module.scss'
import { ISuggestion } from '@/entities/suggestion'
import { useAppDispatch, useNotification } from '@/shared/lib'
import { acceptSuggestionThunk, rejectSuggestionThunk } from '../model/slice'

interface TrackSuggestionActionsProps {
    suggestion: ISuggestion
}

export const TrackSuggestionActions: FC<TrackSuggestionActionsProps> = ({ suggestion }) => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()

    const onAccept = () => {
        dispatch(acceptSuggestionThunk({ suggestion: suggestion })).unwrap()
            .then(() => {
                notify('Заявка принята', 'Вы успешно приняли заявку', 'success')
            })
    }

    const onReject = () => {
        dispatch(rejectSuggestionThunk({ suggestion: suggestion })).unwrap()
            .then(() => {
                notify('Заявка отменена', 'Вы успешно отменили заявку', 'delete')
            })
    }

    return (
        <div className={styles.actions}>
            <div className={`${styles.actions__button} ${styles.actions__success}`} onClick={onAccept}>
                <i className="ph ph-bold ph-check"></i>
            </div>
            <div className={`${styles.actions__button} ${styles.actions__delete}`} onClick={onReject}>
                <i className="ph ph-bold ph-x"></i>
            </div>
            <div className={`${styles.actions__button} ${styles.actions__edit}`}>
                <i className="ph ph-pencil-simple"></i>
            </div>
        </div>
    )
}
