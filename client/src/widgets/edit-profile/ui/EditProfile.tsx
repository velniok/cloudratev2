import styles from './EditProfile.module.scss'
import { IUser } from '@/entities/user'
import { FC } from 'react'
import { TStatus } from '@/shared/types'
import { EditProfileForm } from '@/features/user'
import { LinksList } from '@/shared/ui'

interface EditProfileProps {
    user: IUser
    userStatus: TStatus
}

export const EditProfile: FC<EditProfileProps> = ({ user, userStatus }) => {

    const links = [
        {
            title: 'Профиль',
            link: `/user/${user?.username}`
        },
        {
            title: 'Настройки',
            link: 'last'
        }
    ]

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <LinksList links={links} />
                {
                    userStatus === 'success' && <EditProfileForm user={user} /> 
                }
            </div>
        </div>
    )
}
