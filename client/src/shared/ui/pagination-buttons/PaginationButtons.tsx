import { FC } from 'react'
import { Button } from '../button'
import styles from './PaginationButtons.module.scss'

interface PaginationButtonsProps {
    page: number
    totalPages: number
    hundlePrevPage: () => void
    hundleNextPage: () => void
    hundlePage: (fixPage: number) => void
}

export const PaginationButtons: FC<PaginationButtonsProps> = ({ page, totalPages, hundlePrevPage, hundleNextPage, hundlePage }) => {
    return (
        <div className={styles.pagination}>
            {
                totalPages !== 1 &&
                <>
                    <Button padding='10px 14px 7px 14px' color='default' onClick={hundlePrevPage}>Назад</Button>
        
                    <Button padding='10px 14px 7px 14px' color='default' active={page === 1} onClick={() => hundlePage(1)}>1</Button>
                                        
                    {
                        page + 1 > 3 &&
                        <>
                            <p className={styles.text}>...</p>
                            <Button padding='10px 14px 7px 14px' color='default' onClick={() => hundlePage(page - 1)}>{page - 1}</Button>
                        </>
                    }
                    {
                        page > 1 && page < totalPages &&
                        <>
                            <Button padding='10px 14px 7px 14px' color='default' active={true}>{page}</Button>
                        </>
                    }
                    {
                        page + 1 < totalPages &&
                        <>
                            <Button padding='10px 14px 7px 14px' color='default' onClick={() => hundlePage(page + 1)}>{page + 1}</Button>
                            <p className={styles.text}>...</p>
                        </>
                    }
        
                    <Button padding='10px 14px 7px 14px' color='default' active={totalPages === page} onClick={() => hundlePage(totalPages)}>{totalPages}</Button>
                    
                    <Button padding='10px 14px 7px 14px' color='default' onClick={hundleNextPage}>Вперед</Button>
                </>
            }
        </div>
    )
}
