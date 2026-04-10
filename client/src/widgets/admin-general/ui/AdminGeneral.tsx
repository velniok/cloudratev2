import { Title } from '@/shared/ui'
import styles from './AdminGeneral.module.scss'
import { GeneralItem } from '@/entities/general'
import { GeneralItemSkeleton } from '@/entities/general/ui/GeneralItemSkeleton'
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib'
import { getGeneralThunk, selectGeneral, selectGeneralStatus } from '@/features/general'
import { useEffect } from 'react'

export const AdminGeneral = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const general = useAppSelector(selectGeneral)
    const generalStatus = useAppSelector(selectGeneralStatus)

    useEffect(() => {
        dispatch(getGeneralThunk()).unwrap()
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>АДМИН-ПАНЕЛЬ</Title>
                <ul className={styles.statsList}>
                {
                    generalStatus === 'success' && general
                    ?
                    <>
                        <GeneralItem title='Пользователи' count={general.users ?? '0'} />
                        <GeneralItem title='Артисты' count={general.artists ?? '0'} />
                        <GeneralItem title='Треки' count={general.tracks ?? '0'} />
                        <GeneralItem title='Оценки' count={general.reviews ?? '0'} />
                        <GeneralItem title='Заявки на трек' count={general.trackSuggestions ?? '0'} />
                    </>
                    :
                    <>
                        <GeneralItemSkeleton title='Пользователи' />
                        <GeneralItemSkeleton title='Артисты' />
                        <GeneralItemSkeleton title='Треки' />
                        <GeneralItemSkeleton title='Оценки'/>
                        <GeneralItemSkeleton title='Заявки на трек'/>
                    </>
                }
                </ul>
            </div>
        </div>
    )
}
