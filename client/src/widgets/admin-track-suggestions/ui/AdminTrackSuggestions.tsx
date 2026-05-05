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
    const [tempId, setTempId] = useState<string | null>(null)

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>Заявки на треки</Title>
                {
                    suggestionListStatus === 'success' && suggestionList &&
                    <ul className={styles.list}>
                        {
                            suggestionList.map((suggestion) => {
                                return <SuggestionRow
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    actions={<TrackSuggestionActions suggestion={suggestion} />}
                                    openModal={() => setCreateArtist(true)}
                                    setSuggestionId={(id: number) => setSuggestionId((prev) => prev = id)}
                                    setTempId={(id: string | null) => setTempId((prev) => prev = id)}
                                />
                            })
                        }
                    </ul>
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
                        tempId={tempId}
                    />
                }
            </Modal>
        </div>
    )
}
