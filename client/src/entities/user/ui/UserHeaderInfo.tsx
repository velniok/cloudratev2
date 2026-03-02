import { type FC } from "react"
import { Badges, Button, Cover, EditIcon, LinkIcon } from "@/shared/ui"
import type { IUser } from "../model/types"
import styles from "./UserHeaderInfo.module.scss"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/shared/lib"
import { selectAuthUser } from "@/features/auth"

interface UserHeaderInfoProps {
    user: IUser | null
}

export const UserHeaderInfo: FC<UserHeaderInfoProps> = ({ user }) => {

    const navigate = useNavigate()
    const auth = useAppSelector(selectAuthUser)

    return (
        <div className={styles.inner}>
            <Cover width="150px" height="150px" borderRadius="24px" url={user.avatarUrl} />
            <div className={styles.info}>
                <h2 className={styles.nickname}>
                    {user?.nickname}
                    {
                        user?.role !== 'user' && <Badges>{user?.role}</Badges>
                    }
                    </h2>
                <p className={styles.username}>{user?.email}</p>
                <a href="#!" className={styles.soundcloud}>
                    <LinkIcon />
                    SoundCloud
                </a>
                {
                    auth?.id === user.id &&
                    <div className={styles.editButton}>
                        <Button color="default" padding="10px 20px 10px 20px" onClick={() => navigate('edit')}>
                            <div className={styles.buttonInner}>
                                <EditIcon />
                                <span className={styles.buttonText}>Изменить профиль</span>
                            </div>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
