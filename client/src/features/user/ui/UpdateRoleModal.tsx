import { Button, SuccessIcon } from '@/shared/ui'
import styles from './UpdateRoleModal.module.scss'
import { FC, useEffect, useState } from 'react'
import { IUser } from '@/entities/user'
import { axios } from '@/shared/api'
import { useNotification } from '@/shared/lib'

interface UpdateRoleModalProps {
    modalClose: () => void
    user: IUser
}

export const UpdateRoleModal: FC<UpdateRoleModalProps> = ({ modalClose, user }) => {

    const { notify } = useNotification()
    const [active, setActive] = useState<string>('')

    useEffect(() => {
        setActive(user?.role)
    }, [user])

    const roles = [
        {
            name: 'user',
            title: 'Пользователь',
            desc: 'Базовый доступ, просмотр и оценка треков',
        },
        {
            name: 'admin',
            title: 'Администратор',
            desc: 'Польный доступ ко всем функциям',
        },
    ]

    const onSubmit = async () => {
        await axios.patch(`/user/updateRole/${user?.id}`, { role: active })
            .then(() => {
                notify('Роль изменена', 'Вы успешно изменили роль', 'success')
                hundleCancel()
            })
    }

    const hundleCancel = () => {
        modalClose()
    }

    return (
        <>
            <ul className={styles.list}>
                {
                    roles.map((role, index) => {
                        return (
                        <li key={index} className={`${styles.item} ${styles[role.name]} ${role.name === active ? styles.active : ''}`} onClick={() => setActive(role.name)}>
                            <div className={styles.dot}></div>
                            <div className={styles.info}>
                                <h3 className={styles.title}>{role.title}</h3>
                                <p className={styles.desc}>{role.desc}</p>
                            </div>
                            <div className={`${styles.checkbox} ${role.name === active ? styles.active : ''}`}>
                                {role.name === active && <SuccessIcon />}
                            </div>
                        </li>
                        )
                    })
                }
            </ul>
            <div className={styles.footer}>
                <Button fontSize='12px' color='default' padding='12px 20px 10px 20px' onClick={hundleCancel}>ОТМЕНА</Button>
                <Button fontSize='12px' color='accent' padding='12px 20px 10px 20px' onClick={onSubmit}>ИЗМЕНИТЬ РОЛЬ</Button>
            </div>
        </>
    )
}
