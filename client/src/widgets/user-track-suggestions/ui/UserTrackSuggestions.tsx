import { LinksList, Title } from '@/shared/ui'
import styles from './UserTrackSuggestions.module.scss'
import { FC, useEffect, useState } from 'react'
import { IUser } from '@/entities/user'
import { getUserSuggestionsApi, getUserSuggestionsThunk, selectUserSuggestions, selectUserSuggestionsStatus } from '@/features/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { SuggestionFilter, SuggestionRow } from '@/entities/suggestion'

interface UserTrackSuggestionsProps {
    user: IUser
}

export const UserTrackSuggestions: FC<UserTrackSuggestionsProps> = ({ user }) => {

    const dispatch = useAppDispatch()
    const suggestionsList = useAppSelector(selectUserSuggestions)
    const suggestionsListStatus = useAppSelector(selectUserSuggestionsStatus)

    const [filterStatus, setFilterStatus] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getUserSuggestionsThunk({ id: user.id, filter: filterStatus }))
    }, [user, filterStatus])


    const links = [
        {
            title: 'Профиль',
            link: `/user/${user.username}`
        },
        {
            title: 'Заявки',
            link: 'last'
        }
    ]

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <LinksList links={links} />
                <Title>МОИ ЗАЯВКИ</Title>
                <SuggestionFilter filterStatus={filterStatus} setFilterStatus={(status: string | null) => setFilterStatus((prev) => prev = status)} />
                {
                    suggestionsListStatus === 'success' && suggestionsList &&
                    <ul className={styles.list}>
                        {
                            suggestionsList.map((suggestion) => {
                                return <SuggestionRow key={suggestion.id} suggestion={suggestion} />
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}
