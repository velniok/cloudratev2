import styles from './EditProfile.module.scss'
import { IUser } from '@/entities/user'
import { FC } from 'react'
import { TStatus } from '@/shared/types'
import { EditProfileForm } from '@/features/user'

interface EditProfileProps {
    user: IUser
    getStatus: TStatus
}

export const EditProfile: FC<EditProfileProps> = ({ user, getStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                {
                    getStatus === 'success' && <EditProfileForm user={user} /> 
                }
            </div>
        </div>
    )
}
