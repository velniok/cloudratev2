import { Button, DeleteIcon, EditIcon, Input, PlusIcon, Rating, Title } from '@/shared/ui'
import styles from './AdminArtists.module.scss'

export const AdminArtists = () => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>АРТИСТЫ</Title>
                <div className={styles.top}>
                    <Button color='accent' padding='10px 20px 10px 20px'>
                        <div className={styles.buttonInner}>
                            <PlusIcon />
                            <div className={styles.buttonText}>Добавить артиста</div>
                        </div>
                    </Button>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHead}>Артист</th>
                                <th className={styles.tableHead}>Треки</th>
                                <th className={styles.tableHead}>Рейтинг</th>
                                <th className={styles.tableHead}>Действия</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableData}>
                                    <div className={styles.artist}>
                                        <div className={styles.artistAvatar}></div>
                                        <p className={styles.artistNickname}>Темный принц</p>
                                    </div>
                                </td>
                                <td className={styles.tableData}>12</td>
                                <td className={styles.tableData}>
                                    <Rating>64</Rating>
                                </td>
                                <td className={styles.tableData}>
                                    <div className={styles.action}>
                                        <div className={styles.button}>
                                            <EditIcon />
                                        </div>
                                        <div className={styles.button}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableData}>
                                    <div className={styles.artist}>
                                        <div className={styles.artistAvatar}></div>
                                        <p className={styles.artistNickname}>Королевский XVII</p>
                                    </div>
                                </td>
                                <td className={styles.tableData}>10</td>
                                <td className={styles.tableData}>
                                    <Rating>54</Rating>
                                </td>
                                <td className={styles.tableData}>
                                    <div className={styles.action}>
                                        <div className={styles.button}>
                                            <EditIcon />
                                        </div>
                                        <div className={styles.button}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableData}>
                                    <div className={styles.artist}>
                                        <div className={styles.artistAvatar}></div>
                                        <p className={styles.artistNickname}>tewiq</p>
                                    </div>
                                </td>
                                <td className={styles.tableData}>15</td>
                                <td className={styles.tableData}>
                                    <Rating>32</Rating>
                                </td>
                                <td className={styles.tableData}>
                                    <div className={styles.action}>
                                        <div className={styles.button}>
                                            <EditIcon />
                                        </div>
                                        <div className={styles.button}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
