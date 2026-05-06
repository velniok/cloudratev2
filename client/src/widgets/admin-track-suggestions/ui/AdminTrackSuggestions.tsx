import { Modal, Title } from '@/shared/ui'
import styles from './AdminTrackSuggestions.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { useEffect, useState } from 'react'
import { getSuggestionList, selectSuggestionList, selectSuggestionListStatus, TrackSuggestionActions } from '@/features/suggestion'
import { SuggestionRow } from '@/entities/suggestion'
import { ArtistCreateForm } from '@/features/artist'

export const AdminTrackSuggestions = () => {

    const dispatch = useAppDispatch()
    const suggestionList = useAppSelector(selectSuggestionList)
    const suggestionListStatus = useAppSelector(selectSuggestionListStatus)

    useEffect(() => {
        dispatch(getSuggestionList())
    }, [])

    const [createArtist, setCreateArtist] = useState<boolean>(false)
    const [suggestionId, setSuggestionId] = useState<number | null>(null)
    const [tempArtistId, setTempArtistId] = useState<string | null>(null)
    const [error, setError] = useState<{ id: number, error: string } | null>(null)

    const openModalHundler = (suggestionId: number, tempArtistId: string | null) => {
        setSuggestionId((prev) => prev = suggestionId)
        setTempArtistId((prev) => prev = tempArtistId)
        setCreateArtist(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ЗАЯВКИ НА ТРЕКИ</Title>
                {
                    suggestionListStatus === 'success' && suggestionList &&
                    <>
                    {
                        suggestionList.length === 0 ?
                        <>Пусто..</>
                        :
                        <ul className={styles.list}>
                            {
                                suggestionList.map((suggestion) => {
                                    if (error?.id === suggestion.id) return (
                                        <SuggestionRow
                                            key={suggestion.id}
                                            suggestion={suggestion}
                                            actions={<TrackSuggestionActions suggestion={suggestion} setError={(id: number, error: string) => setError((prev) => prev = {id, error})} />}
                                            openModalHundler={(suggestionId: number, tempArtistId: string | null) => openModalHundler(suggestionId, tempArtistId)}
                                            error={error.error}
                                            admin
                                        />
                                    )
                                    return <SuggestionRow
                                        key={suggestion.id}
                                        suggestion={suggestion}
                                        actions={<TrackSuggestionActions suggestion={suggestion} setError={(id: number, error: string) => setError((prev) => prev = {id, error})} />}
                                        openModalHundler={(suggestionId: number, tempArtistId: string | null) => openModalHundler(suggestionId, tempArtistId)}
                                        admin
                                    />
                                })
                            }
                        </ul>
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
        </div>
    )
}
