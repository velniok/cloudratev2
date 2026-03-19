import type { FC, ReactNode } from "react"
import { Cover, LinkIcon, Rating } from "@/shared/ui"
import type { IArtist } from "../model/types"
import styles from "./ArtistHeaderInfo.module.scss"
import { pluralize } from "@/shared/lib"

interface ArtistHeaderInfoProps {
    artist: IArtist
    actions: ReactNode
}

export const ArtistHeaderInfo: FC<ArtistHeaderInfoProps> = ({ artist, actions }) => {
    return (
        <div className={styles.inner}>
            <Cover className={styles.avatar} width='180px' height='180px' borderRadius='12px' url={artist.avatarUrl} />
            <div className={styles.info}>
                <h2 className={styles.name}>{artist.name}</h2>
                <a href={`${artist.soundcloudUrl}`} className={styles.soundcloud}>
                <LinkIcon />
                SoundCloud
                </a>
                <ul className={styles.stats__list}>
                    <li className={styles.stats__item}>
                        <span className={styles.stats__count}>{artist.follow.followersCount}</span>
                        <p className={styles.stats__title}>{pluralize(artist.follow.followersCount, 'подписчик', 'подписчика', 'подписчиков')}</p>
                    </li>
                    <li className={styles.stats__item}>
                        <span className={styles.stats__count}>52</span>
                        <p className={styles.stats__title}>Средний рейтинг</p>
                    </li>
                </ul>
                {
                    actions && actions
                }
            </div>
        </div>
    )
}