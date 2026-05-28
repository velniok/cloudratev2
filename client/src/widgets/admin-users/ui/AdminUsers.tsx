import { Input, Modal, PaginationButtons, Title } from '@/shared/ui'
import styles from './AdminUsers.module.scss'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { IUser, UserRowAdmin } from '@/entities/user'
import { DeleteUserModal, getUserListThunk, selectUserList, selectUserListPagination, selectUserListStatus, UpdateRoleModal } from '@/features/user'
import { useAppDispatch, useAppSelector, usePagination } from '@/shared/lib'

export const AdminUsers= () => {
    const userList = useAppSelector(selectUserList)
    const userListStatus = useAppSelector(selectUserListStatus)
    const userListPagination = useAppSelector(selectUserListPagination)

    const { hundleNextPage, hundlePrevPage, hundlePage, limit, hundleSearch, search } = usePagination(getUserListThunk, '/admin/users', 10, undefined, undefined, true)
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        hundleSearch(e.target.value)
    }

    const [updateRole, setUpdateRole] = useState<boolean>(false)
    const [deleteUser, setDeleteUser] = useState<boolean>(false)

    const [userId, setUserId] = useState<number | null>(null)
    const [user, setUser] = useState<IUser | null>(null)

    const hundleUpdateRole = (e: MouseEvent, id: number) => {
        e.preventDefault()
        if (userList) {
            setUser(prev => prev = userList.filter(user => user.id === id)[0])
            setUpdateRole(true)
        }
    }

    const hundleDeleteUser = (e: MouseEvent, id: number) => {
        e.preventDefault()
        setUserId((prev) => prev = id)
        setDeleteUser(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПОЛЬЗОВАТЕЛИ</Title>
                <Input
                    placeholder='Поиск по никнейму артисту...'
                    type='text'
                    isGray={true}
                    onChange={onChangeSearch}
                    value={search}
                />
                <ul className={styles.header}>
                    <li className={styles.header__item}>ID</li>
                    <li className={styles.header__item}>ПОЛЬЗОВАТЕЛЬ</li>
                    <li className={styles.header__item}>EMAIL</li>
                    <li className={styles.header__item}>РОЛЬ</li>
                    <li className={styles.header__item}>ДАТА РЕГ.</li>
                    <li className={styles.header__item} style={{ textAlign: 'right' }}>ДЕЙСТВИЯ</li>
                </ul>
                {
                    userListStatus === 'success' && userList && userListPagination &&
                    <>
                        <ul className={styles.list}>
                            {
                                userList.map((user) => {
                                    return <UserRowAdmin
                                        key={user.id}
                                        user={user}
                                        hundleUpdateRole={(e: MouseEvent, id: number) => hundleUpdateRole(e, id)}
                                        hundleDeleteUser={(e: MouseEvent, id: number) => hundleDeleteUser(e, id)}
                                    />
                                }) 
                            }
                        </ul>
                        <div className={styles.bottom}>
                            <div className={styles.left}>
                                <p className={styles.text}>Показано {((userListPagination.page - 1) * limit) + 1}-{limit * userListPagination.page} из {userListPagination.total}</p>
                            </div>
                            <PaginationButtons
                                page={userListPagination.page}
                                totalPages={userListPagination.totalPages}
                                hundleNextPage={hundleNextPage}
                                hundlePrevPage={hundlePrevPage}
                                hundlePage={hundlePage}
                            />
                        </div>
                    </>
                }
                <Modal
                    width='420px'
                    modalTitle='Изменить роль'
                    modalDesc={`Изменить роль пользователю`}
                    modalOpen={updateRole}
                    modalClose={() => setUpdateRole(false)}
                >
                    { user && <UpdateRoleModal user={user} modalClose={() => setUpdateRole(false)} /> }
                </Modal>
                <Modal
                    width='420px'
                    modalTitle='Удалить пользователя?'
                    modalDesc='Это действие нельзя отменить'
                    modalOpen={deleteUser}
                    modalClose={() => setDeleteUser(false)}
                >
                   { userId && <DeleteUserModal modalClose={() => setDeleteUser(false)} userId={userId} /> }
                </Modal>
            </div>
        </div>
    )
}
