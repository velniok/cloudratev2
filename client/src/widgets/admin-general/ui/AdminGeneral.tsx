import { Title } from '@/shared/ui'
import styles from './AdminGeneral.module.scss'
import { FC } from 'react'
import { TStatus } from '@/shared/types'
import { GeneralItem, IGeneral } from '@/entities/general'
import { GeneralItemSkeleton } from '@/entities/general/ui/GeneralItemSkeleton'

interface AdminGeneralProps {
    general: IGeneral
    generalStatus: TStatus
}

export const AdminGeneral: FC<AdminGeneralProps> = ({ general, generalStatus }) => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>АДМИН-ПАНЕЛЬ</Title>
                <ul className={styles.statsList}>
                {
                    generalStatus === 'success'
                    ?
                    <>
                        <GeneralItem title='Пользователи' count={general.users} />
                        <GeneralItem title='Артисты' count={general.artists} />
                        <GeneralItem title='Треки' count={general.tracks} />
                        <GeneralItem title='Оценки' count={general.reviews} />
                    </>
                    :
                    <>
                        <GeneralItemSkeleton title='Пользователи' />
                        <GeneralItemSkeleton title='Артисты' />
                        <GeneralItemSkeleton title='Треки' />
                        <GeneralItemSkeleton title='Оценки'/>
                    </>
                }
                </ul>
            </div>
        </div>
    )
}
