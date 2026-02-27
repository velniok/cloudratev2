import type { FC } from "react"
import { UserHeaderInfo, type IUser } from "@/entities/user"
import styles from "./UserHeader.module.scss"
import type { TStatus } from "@/shared/types"
import { UserHeaderInfoSkeleton } from "@/entities/user"

interface UserHeaderProps {
    user: IUser | null
    userStatus: TStatus
}

export const UserHeader: FC<UserHeaderProps> = ({ user, userStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                {
                    userStatus === 'success' ?
                    <>
                        <UserHeaderInfo user={user} />
                    </>
                    :
                    <>
                        <UserHeaderInfoSkeleton />
                    </>
                }
            </div>
        </div>
    )
}
