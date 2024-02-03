import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
    page: number;
    setPage: (page: number) => void;
}
const Pagination = ({ page, setPage }: Props) => {
    return (
        <>
            <nav className={styles.pagination}>
                {page > 1 && (
                    <span
                        className={styles.pagination__previous}
                        onClick={() => setPage(page - 1)}
                    />
                )}

                {page === 1 && (
                    <div
                        className={`${styles.pagination__previous} ${styles['pagination--disabled']}`}
                    />
                )}

                <span className={styles.pagination__page}>pagina {page}</span>

                <span
                    className={styles.pagination__next}
                    data-cy="pagination__next"
                    onClick={() => setPage(page + 1)}
                />
            </nav>
        </>
    );
};

export default Pagination;
