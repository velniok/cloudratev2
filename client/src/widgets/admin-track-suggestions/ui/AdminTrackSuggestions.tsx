import { Modal, PaginationButtons, Title } from '@/shared/ui'
import styles from './AdminTrackSuggestions.module.scss'
import { useAppSelector, usePagination } from '@/shared/lib'
import { useState } from 'react'
import { getSuggestionList, selectSuggestionList, selectSuggestionListPagination, selectSuggestionListStatus, SuggestionUpdateForm, TrackSuggestionActions } from '@/features/suggestion'
import { ISuggestion, SuggestionFilter, SuggestionRow } from '@/entities/suggestion'
import { ArtistCreateForm } from '@/features/artist'

export const AdminTrackSuggestions = () => {

    const { hundleNextPage, hundlePrevPage, hundlePage, hundleFilter, filter } = usePagination(getSuggestionList, `/admin/suggestions-tracks`, 5, undefined, true)
    const suggestionList = useAppSelector(selectSuggestionList)
    const suggestionListPagination = useAppSelector(selectSuggestionListPagination)
    const suggestionListStatus = useAppSelector(selectSuggestionListStatus)

    const [updateSuggestion, setUpdateSuggestion] = useState<boolean>(false)
    const [suggestion, setSuggestion] = useState<ISuggestion | null>(null)
    const [createArtist, setCreateArtist] = useState<boolean>(false)
    const [suggestionId, setSuggestionId] = useState<number | null>(null)
    const [tempArtistId, setTempArtistId] = useState<string | null>(null)
    const [error, setError] = useState<{ id: number, error: string } | null>(null)

    const openModalHundler = (suggestionId: number, tempArtistId: string | null) => {
        setSuggestionId((prev) => prev = suggestionId)
        setTempArtistId((prev) => prev = tempArtistId)
        setCreateArtist(true)
    }

    const openUpdateModal = (suggestion: ISuggestion) => {
        setSuggestion(suggestion)
        setUpdateSuggestion(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ЗАЯВКИ НА ТРЕКИ</Title>
                <SuggestionFilter filterStatus={filter} setFilterStatus={(status: string) => hundleFilter(status)} />
                {
                    suggestionListStatus === 'success' && suggestionList && suggestionListPagination &&
                    <>
                    {
                        suggestionList.length === 0 ?
                        <>Пусто..</>
                        :
                        <>
                            <ul className={styles.list}>
                                {
                                    suggestionList.map((suggestion) => {
                                        if (error?.id === suggestion.id) return (
                                            <SuggestionRow
                                                key={suggestion.id}
                                                suggestion={suggestion}
                                                actions={<TrackSuggestionActions openUpdateModal={() => openUpdateModal(suggestion)} suggestion={suggestion} setError={(id: number, error: string) => setError((prev) => prev = {id, error})} />}
                                                openModalHundler={(suggestionId: number, tempArtistId: string | null) => openModalHundler(suggestionId, tempArtistId)}
                                                error={error.error}
                                                admin
                                            />
                                        )
                                        return <SuggestionRow
                                            key={suggestion.id}
                                            suggestion={suggestion}
                                            actions={<TrackSuggestionActions openUpdateModal={() => openUpdateModal(suggestion)} suggestion={suggestion} setError={(id: number, error: string) => setError((prev) => prev = {id, error})} />}
                                            openModalHundler={(suggestionId: number, tempArtistId: string | null) => openModalHundler(suggestionId, tempArtistId)}
                                            admin
                                        />
                                    })
                                }
                            </ul>
                            <div className={styles.bottom}>
                                <PaginationButtons
                                    page={suggestionListPagination.page}
                                    totalPages={suggestionListPagination.totalPages}
                                    hundleNextPage={hundleNextPage}
                                    hundlePrevPage={hundlePrevPage}
                                    hundlePage={hundlePage}
                                />
                            </div>
                        </>
                    }
                    </>
                }
            </div>
            <Modal
                width='520px'
                modalTitle='Новый артист'
                modalDesc='Заполните информацию об артисте'
                modalOpen={createArtist}
                modalClose={() => setCreateArtist(false)}
            >
                {
                    <ArtistCreateForm
                        modalClose={() => setCreateArtist(false)}
                        suggestionId={suggestionId}
                        tempId={tempArtistId}
                    />
                }
            </Modal>
            <Modal
                width='520px'
                modalTitle='Изменить заявку'
                modalDesc='Заполните информацию о заявке'
                modalOpen={updateSuggestion}
                modalClose={() => setUpdateSuggestion(false)}
            >
                {
                    suggestion &&
                    <SuggestionUpdateForm
                        modalClose={() => setUpdateSuggestion(false)}
                        suggestion={suggestion}
                    />
                }
            </Modal>
            
        </div>
    )
}
