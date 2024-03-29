import React from 'react';
import styles from './Labels.module.scss';

interface Props {
    entity: string;
    isChecked: boolean;
    label: string;
    checkHandler: () => void;
    index: number;
}

export const Labels = ({ entity, isChecked, label, checkHandler, index }: Props) => {
    return (
        <label className={styles.labels}>
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
            />
            <span className={styles.labels__checkmark}></span>
            <span className={styles[`labels--${entity}`]}>{label}</span>
        </label>
    );
};

export default Labels;
