import type { FC } from "react"
import { LinkIcon } from "@/shared/ui"
import type { IArtist } from "../model/types"
import styles from "./ArtistHeaderInfo.module.scss"

interface ArtistHeaderInfoProps {
    artist: IArtist
}

export const ArtistHeaderInfo: FC<ArtistHeaderInfoProps> = ({ artist }) => {
    return (
        <div className={styles.inner}>
            <div className={styles.avatar}></div>
            <div className={styles.info}>
                <h2 className={styles.name}>{artist.name}</h2>
                <a href={`${artist.soundcloudUrl}`} className={styles.soundcloud}>
                <LinkIcon />
                SoundCloud
                </a>
            </div>
        </div>
    )
}