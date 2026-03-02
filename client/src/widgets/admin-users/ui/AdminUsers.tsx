import { DeleteIcon, EditIcon, Table, Title } from '@/shared/ui'
import styles from './AdminUsers.module.scss'
import { FC } from 'react'
import { IUser } from '@/entities/user'
import { TStatus } from '@/shared/types'

interface AdminUsersProps {
    userList: IUser[]
    userListStatus: TStatus
}

export const AdminUsers: FC<AdminUsersProps> = ({ userList, userListStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПОЛЬЗОВАТЕЛИ</Title>
                <Table
                    header={ ['пользователь', 'регистрация', 'роль', 'действия'] }
                    data={userList}
                    dataStatus={userListStatus}
                    actions={[
                        {
                            name: 'edit',
                            func: (id) => (
                            <div>
                                <EditIcon />
                            </div>
                            )
                        },
                        {
                            name: 'delete',
                            func: (id) => (
                            <div>
                                <DeleteIcon />
                            </div>
                            )
                        },
                    ]}
                />
            </div>
        </div>
    )
}
