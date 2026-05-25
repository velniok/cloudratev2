import { LinksList, PaginationButtons, Title } from '@/shared/ui'
import styles from './UserSuggestionsPagination.module.scss'
import { FC, useState } from 'react'
import { IUser } from '@/entities/user'
import { getUserSuggestionsThunk, selectUserSuggestions, selectUserSuggestionsPagination, selectUserSuggestionsStatus } from '@/features/user'
import { useAppSelector, usePagination } from '@/shared/lib'
import { SuggestionFilter, SuggestionRow, SuggestionRowSkeleton } from '@/entities/suggestion'

interface UserSuggestionsPaginationProps {
    user: IUser
}

export const UserSuggestionsPagination: FC<UserSuggestionsPaginationProps> = ({ user }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage, hundleFilter, filter } = usePagination(getUserSuggestionsThunk, `/user/${user.username}/track-suggestions`, 5, user.id, true)
    const suggestionsList = useAppSelector(selectUserSuggestions)
    const suggestionsListStatus = useAppSelector(selectUserSuggestionsStatus)
    const suggestionsListPagination = useAppSelector(selectUserSuggestionsPagination)

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
                <SuggestionFilter filterStatus={filter} setFilterStatus={(status: string) => hundleFilter(status)} />
                {
                    suggestionsListStatus === 'success' && suggestionsList && suggestionsListPagination ?
                    <>
                    {
                        suggestionsList.length > 0 ?
                        <>
                            <ul className={styles.list}>
                                {
                                    suggestionsList.map((suggestion) => {
                                        return <SuggestionRow key={suggestion.id} suggestion={suggestion} />
                                    })
                                }
                            </ul>
                            <div className={styles.bottom}>
                                <PaginationButtons
                                    page={suggestionsListPagination.page}
                                    totalPages={suggestionsListPagination.totalPages}
                                    hundleNextPage={hundleNextPage}
                                    hundlePrevPage={hundlePrevPage}
                                    hundlePage={hundlePage}
                                />
                            </div>
                        </>
                        :
                        <p className={styles.none}>Заявок нет</p>
                    }
                    </>
                    :
                    <ul className={styles.list}>
                        {
                            Array.from({ length: 5 }).map((_, index) => {
                                return <SuggestionRowSkeleton key={index} />
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}
