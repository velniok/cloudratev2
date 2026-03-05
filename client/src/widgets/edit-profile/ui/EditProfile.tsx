import styles from './EditProfile.module.scss'
import { IUser } from '@/entities/user'
import { FC } from 'react'
import { TStatus } from '@/shared/types'
import { EditProfileForm } from '@/features/user'

interface EditProfileProps {
    user: IUser
    userStatus: TStatus
}

export const EditProfile: FC<EditProfileProps> = ({ user, userStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                {
                    userStatus === 'success' && <EditProfileForm user={user} /> 
                }
            </div>
        </div>
    )
}
