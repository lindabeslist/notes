import styles from './ActiveNote.module.scss';
import React from 'react';
import { days, months } from './date';
interface Props {
    children: React.ReactNode;
    noteDate: Date;
}
const ActiveNote = ({ children, noteDate }: Props) => {
    return (
        <div>
            <div className={styles.activeNote__date}>
                {`${days[noteDate.getDay()]} ${noteDate.getDate()} ${months[noteDate.getMonth()]} ${noteDate.getFullYear()}`}
            </div>
            {children}
        </div>
    );
};

export default ActiveNote;
