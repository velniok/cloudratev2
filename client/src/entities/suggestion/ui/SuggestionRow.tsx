import { FC } from 'react'
import styles from './SuggestionRow.module.scss'
import { ISuggestion } from '../model/types'
import { Badges, Cover } from '@/shared/ui'
import { getOptimizedAvatar } from '@/shared/lib'
import { useNavigate } from 'react-router-dom'

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
                    <h3 className={styles.item__title}>
                        {suggestion.title}
                    </h3>
                    <p className={styles.item__status}>На рассмотрении</p>
                </div>
                <div className={styles.item__artist} onClick={() => navigate(`/artist/${suggestion.artistId}`)}>
                    <Cover
                        url={getOptimizedAvatar(suggestion.artist.avatarUrl ?? '', 32, 32)}
                        width='32px'
                        height='32px'
                        borderRadius='50%'
                    />
                    <h4 className={styles.item__artistName}>{suggestion.artist.name}</h4>
                </div>
            </div>
            <div className={styles.item__user} onClick={() => navigate(`/user/${suggestion.user.username}`)}>
                <Cover
                    url={getOptimizedAvatar(suggestion.user.avatarUrl ?? '', 50, 50)}
                    width='50px'
                    height='50px'
                    borderRadius='50%'
                />
                <h4 className={styles.item__userNickname}>{suggestion.user.nickname}</h4>
                <Badges role={suggestion.user.role} size='small' />
            </div>
        </li>
    )
}
