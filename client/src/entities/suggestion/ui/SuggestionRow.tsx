import { FC, ReactNode } from 'react'
import styles from './SuggestionRow.module.scss'
import { ISuggestion } from '../model/types'
import { Badges, Cover } from '@/shared/ui'
import { getMonth, getOptimizedAvatar } from '@/shared/lib'
import { useNavigate } from 'react-router-dom'

interface SuggestionRowProps {
    suggestion: ISuggestion
    actions?: ReactNode
    openModalHundler?: (suggestionId: number, tempArtistId: string | null) => void
    admin?: boolean
}

export const SuggestionRow: FC<SuggestionRowProps> = ({ suggestion, actions, openModalHundler, admin }) => {

    const navigate = useNavigate()

    return (
        <li className={styles.item}>
            <div className={styles.item__left}>
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
                    {
                        suggestion.artist ?
                            <div className={styles.item__artist} onClick={() => navigate(`/artist/${suggestion.artistId}`)}>
                                <Cover
                                    url={getOptimizedAvatar(suggestion.artist.avatarUrl ?? '', 25, 25)}
                                    width='25px'
                                    height='25px'
                                    borderRadius='50%'
                                />
                                <h4 className={styles.item__artistName}>{suggestion.artist.name}</h4>
                            </div>
                        : admin && openModalHundler ?
                            <div className={styles.item__artist} onClick={() => openModalHundler(suggestion.id, null)}>
                                <h4 className={`${styles.item__artistName} ${styles.item__artistNameTemp}`}>{suggestion.tempArtist?.name ?? 'Удалено'}</h4>
                            </div>
                        :
                            <div className={styles.item__artist}>
                                <h4 className={`${styles.item__artistName} ${styles.item__artistNameTemp}`}>{suggestion.tempArtist?.name ?? 'Удалено'}</h4>
                            </div>
                    }
                    <ul className={styles.item__feat}>
                        {
                            (suggestion.tempFeatArtists?.length > 0 || suggestion.featArtists?.length > 0) && <p className="">feat.</p>
                        }
                        {
                            suggestion.featArtists?.map((artist) => {
                                return (
                                    <h4 key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)} className={styles.item__featName}>{artist.name}</h4>  
                                )
                            })
                        }
                        {
                            admin && openModalHundler ?
                            suggestion.tempFeatArtists?.map((tempArtist) => {
                                return (
                                    <h4 key={tempArtist.id} onClick={() => openModalHundler(suggestion.id, tempArtist.id)} className={`${styles.item__featName} ${styles.item__featNameTemp}`}>{tempArtist.name}</h4>
                                )
                            })
                            :
                            suggestion.tempFeatArtists?.map((tempArtist) => {
                                return (
                                    <h4 key={tempArtist.id} className={`${styles.item__featName} ${styles.item__featNameTemp}`}>{tempArtist.name}</h4>
                                )
                            })
                        }
                    </ul>
                    <p className={styles.item__release}>
                        <i className='ph ph-calendar-blank'></i>
                        {new Date(suggestion.releaseData).toLocaleDateString()}
                    </p>
                </div>
                {
                    admin &&
                    <div className={styles.item__user}>
                        <div className={styles.item__userProfile} onClick={() => navigate(`/user/${suggestion.user.username}`)}>
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
                        <p className={styles.item__userCreated}>
                            <i className="ph ph-clock"></i>
                            {new Date(suggestion.createdAt).getUTCDate()} {getMonth(suggestion.createdAt, 'pluralize')} {new Date(suggestion.createdAt).getUTCFullYear()}
                        </p>
                    </div>
                }
            </div>
            <div className={styles.item__right}>
                <div className={styles.item__status}>
                    <p className={`${styles.item__statusBadge} ${styles[suggestion.status]}`}>
                        {
                            suggestion.status === 'pending' ?
                            <>
                                <i className="ph-fill ph-clock"></i>
                                На рассмотрении
                            </>
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
                </div>
                    {
                        suggestion.status !== 'pending' && suggestion.reviewedByUser && admin &&
                        <div className={styles.item__admin}>
                            <p className={styles.item__adminText}>Модератор:</p>
                            <div className={styles.item__adminUser} onClick={() => navigate(`/user/${suggestion.reviewedByUser?.username}`)}>
                                <Cover
                                    url={getOptimizedAvatar(suggestion.reviewedByUser.avatarUrl ?? '', 20, 20)}
                                    width='20px'
                                    height='20px'
                                    borderRadius='50%'
                                />
                                <p className={styles.item__adminNickname}>{suggestion.reviewedByUser.nickname}</p>
                            </div>
                        </div>
                    }
                    {
                        suggestion.status === 'accepted' && suggestion.reviewedAt &&
                        <div className={styles.item__accept}>
                            <p className={styles.item__userCreated}>
                                <i className="ph ph-clock"></i>
                                {new Date(suggestion.reviewedAt).getUTCDate()} {getMonth(suggestion.reviewedAt, 'pluralize')} {new Date(suggestion.reviewedAt).getUTCFullYear()}
                            </p>
                            <p className={styles.item__acceptLink} onClick={() => navigate(`/track/${suggestion.trackId}`)}>Перейти к треку</p>
                        </div>
                    }
                    {
                        suggestion.status === 'rejected' && suggestion.reviewedAt &&
                        <>
                            <div className={styles.item__reject}>
                                <p className={styles.item__rejectTitle}>Причина:</p>
                                <p className={styles.item__rejectText}>{suggestion.rejectReason}</p>
                            </div>
                            <p className={styles.item__userCreated}>
                                <i className="ph ph-clock"></i>
                                {new Date(suggestion.createdAt).getUTCDate()} {getMonth(suggestion.createdAt, 'pluralize')} {new Date(suggestion.reviewedAt).getUTCFullYear()}
                            </p>
                        </>
                    }
                    {
                        suggestion.status === 'pending' &&
                        <>
                            {actions}
                            <p className={styles.item__userCreated}>
                                <i className="ph ph-clock"></i>
                                {new Date(suggestion.createdAt).getUTCDate()} {getMonth(suggestion.createdAt, 'pluralize')} {new Date(suggestion.createdAt).getUTCFullYear()}
                            </p>
                        </>
                    }
                </div>
        </li>
    )
}
