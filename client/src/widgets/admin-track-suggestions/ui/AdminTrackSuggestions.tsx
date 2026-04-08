import { Title } from '@/shared/ui'
import styles from './AdminTrackSuggestions.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { useEffect } from 'react'
import { getSuggestionList, selectSuggestionList, selectSuggestionListStatus } from '@/features/suggestion'
import { SuggestionRow } from '@/entities/suggestion'

export const AdminTrackSuggestions = () => {

    const dispatch = useAppDispatch()
    const suggestionList = useAppSelector(selectSuggestionList)
    const suggestionListStatus = useAppSelector(selectSuggestionListStatus)

    useEffect(() => {
        dispatch(getSuggestionList())
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>Заявки на треки</Title>
                {
                    suggestionListStatus === 'success' && suggestionList &&
                    <ul className={styles.list}>
                        {
                            suggestionList.map((suggestion) => {
                                return <SuggestionRow key={suggestion.id} suggestion={suggestion} />
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}
