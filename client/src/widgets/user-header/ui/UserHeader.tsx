import type { FC } from "react"
import { UserHeaderInfo, type IUser } from "@/entities/user"
import styles from "./UserHeader.module.scss"

interface UserHeaderProps {
    user: IUser
}

export const UserHeader: FC<UserHeaderProps> = ({ user }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <UserHeaderInfo user={user} />
            </div>
        </div>
    )
}
