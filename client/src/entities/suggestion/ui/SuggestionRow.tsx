import { FC } from 'react'
import styles from './SuggestionRow.module.scss'
import { ISuggestion } from '../model/types'
import { Badges, Cover } from '@/shared/ui'
import { getOptimizedAvatar } from '@/shared/lib'
import { useNavigate } from 'react-router-dom'
import { acceptTrackSuggestionApi, rejectTrackSuggestionApi } from '@/features/suggestion'

interface SuggestionRowProps {
    suggestion: ISuggestion
}

export const SuggestionRow: FC<SuggestionRowProps> = ({ suggestion }) => {

    const navigate = useNavigate()

    return (
        <li className={styles.item}>
            <Cover
                url={getOptimizedAvatar(suggestion.coverUrl ?? '', 100, 100)}
                width='100px'
                height='100px'
                borderRadius='12px'
            />
            <div className={styles.item__track}>
                <div className={styles.item__trackInfo}>
                    <h3 className={styles.item__title}>{suggestion.title}</h3>
                    <a href={suggestion.soundcloudUrl} className={styles.item__soundcloud}>
                        <i className="ph ph-link"></i>
                    </a>
                </div>
                <div className={styles.item__artist} onClick={() => navigate(`/artist/${suggestion.artistId}`)}>
                    <Cover
                        url={getOptimizedAvatar(suggestion.artist.avatarUrl ?? '', 25, 25)}
                        width='25px'
                        height='25px'
                        borderRadius='50%'
                    />
                    <h4 className={styles.item__artistName}>{suggestion.artist.name}</h4>
                </div>
                <ul className={styles.item__feat}>
                    {
                        suggestion.featArtists?.length > 0 && <p className="">feat.</p>
                    }
                    {
                        suggestion.featArtists?.map((artist) => {
                            return (
                                <h4 key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)} className={styles.item__featName}>{artist.name}</h4>  
                            )
                        })
                    }
                </ul>
                <p className={styles.item__release}>
                    <i className='ph ph-calendar-blank'></i>
                    {new Date(suggestion.releaseData).toLocaleDateString()}
                </p>
            </div>
            <div className={styles.item__user} onClick={() => navigate(`/user/${suggestion.user.username}`)}>
                <Cover
                    url={getOptimizedAvatar(suggestion.user.avatarUrl ?? '', 50, 50)}
                    width='50px'
                    height='50px'
                    borderRadius='50%'
                />
                <h4 className={styles.item__userNickname}>
                    {suggestion.user.nickname}
                    <Badges role={suggestion.user.role} size='small' />
                </h4>
            </div>
            <p className={`${styles.item__status} ${styles[suggestion.status]}`}>
                {
                    suggestion.status === 'pending' ? <>На рассмотрении</>
                    :
                    suggestion.status === 'accepted' ?
                    <>
                        <i className="ph-fill ph-check-circle"></i>
                        Принято
                    </>
                    :
                    suggestion.status === 'rejected' &&
                    <>
                        <i className="ph-fill ph-x-circle"></i>
                        Отказано
                    </>
                }
                </p>
                {
                    suggestion.status === 'pending' ?
                    <div className={styles.item__actions}>
                        <div className={`${styles.item__actionsButton} ${styles.item__actionsSuccess}`} onClick={() => acceptTrackSuggestionApi({suggestion: suggestion})}>
                            <i className="ph ph-bold ph-check"></i>
                        </div>
                        <div className={`${styles.item__actionsButton} ${styles.item__actionsDelete}`} onClick={() => rejectTrackSuggestionApi({suggestion: suggestion})}>
                            <i className="ph ph-bold ph-x"></i>
                        </div>
                        <div className={`${styles.item__actionsButton} ${styles.item__actionsEdit}`}>
                            <i className="ph ph-pencil-simple"></i>
                        </div>
                    </div>
                    :
                    <>{suggestion.reviewedByUser.nickname}</>
                }
        </li>
    )
}
