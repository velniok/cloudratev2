import { DeleteIcon, EditIcon, Modal, ProfileIcon, Table, Title } from '@/shared/ui'
import styles from './AdminUsers.module.scss'
import { FC, useState } from 'react'
import { IUser } from '@/entities/user'
import { TStatus } from '@/shared/types'
import { DeleteUserModal, UpdateRoleModal } from '@/features/user'

interface AdminUsersProps {
    userList: IUser[]
    userListStatus: TStatus
}

export const AdminUsers: FC<AdminUsersProps> = ({ userList, userListStatus }) => {

    const [updateRole, setUpdateRole] = useState<boolean>(false)
    const [deleteUser, setDeleteUser] = useState<boolean>(false)

    const [userId, setUserId] = useState<number | null>(null)
    const [user, setUser] = useState<IUser | null>(null)

    const hundleUpdateRole = (id: number) => {
        setUser(prev => prev = userList.filter(user => user.id === id)[0])
        setUpdateRole(true)
    }

    const hundleDeleteUser = (id: number) => {
        setUserId((prev) => prev = id)
        setDeleteUser(true)
    }

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
                            name: 'role',
                            func: (id) => (
                            <div onClick={() => hundleUpdateRole(id)}>
                                <ProfileIcon />
                                <span>РОЛЬ</span>
                            </div>
                            )
                        },
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
                            <div onClick={() => hundleDeleteUser(id)}>
                                <DeleteIcon />
                            </div>
                            )
                        },
                    ]}
                />
                <Modal
                    width='420px'
                    modalTitle='Изменить роль'
                    modalDesc={`Изменить роль пользователю`}
                    modalOpen={updateRole}
                    modalClose={() => setUpdateRole(false)}
                >
                    <UpdateRoleModal user={user} modalClose={() => setUpdateRole(false)} />
                </Modal>
                <Modal
                    width='420px'
                    modalTitle='Удалить пользователя?'
                    modalDesc='Это действие нельзя отменить'
                    modalOpen={deleteUser}
                    modalClose={() => setDeleteUser(false)}
                >
                    <DeleteUserModal modalClose={() => setDeleteUser(false)} userId={userId} />
                </Modal>
            </div>
        </div>
    )
}
