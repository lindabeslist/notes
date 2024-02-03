import styles from './ActiveNote.module.scss';
import React from 'react';
import { days, months } from './date';
import LabelsContainer from '../labels/Labels.container';
interface Props {
    children: React.ReactNode;
    noteDate: Date;
    setActiveClass: (activeClass: string) => void;
}
const ActiveNote = ({ children, noteDate, setActiveClass }: Props) => {
    return (
        <div className={styles.activeNote}>
            <div className={styles.activeNote__date}>
                {`${days[noteDate.getDay()]} ${noteDate.getDate()} ${months[noteDate.getMonth()]} ${noteDate.getFullYear()}`}
            </div>
            <div className={styles.activeNote__note}>
                <span>{`${noteDate.getHours()}:${noteDate.getMinutes()}`}</span>
                {children}
            </div>
            <div className={styles.activeNote__labels}>
                <LabelsContainer setActiveClass={setActiveClass} />
            </div>
        </div>
    );
};

export default ActiveNote;
