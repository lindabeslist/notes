import styles from './ActiveNote.module.scss';
import React from 'react';
import { days, months } from './date';
import LabelsContainer, { AllLabel } from '../labels/Labels.container';
interface Props {
    children: React.ReactNode;
    noteDate: Date;
    setActiveLabel: (label: AllLabel) => void;
}
const ActiveNote = ({ children, noteDate, setActiveLabel }: Props) => {
    return (
        <div className={styles.activeNote}>
            <div className={styles.activeNote__date}>
                {`${days[noteDate.getDay()]} ${noteDate.getDate()} ${months[noteDate.getMonth()]} ${noteDate.getFullYear()}`}
            </div>
            <div className={styles.activeNote__note}>
                <span>{`${noteDate.getHours()}:${('0' + noteDate.getMinutes()).slice(-2)}`}</span>
                {children}
            </div>
            <div className={styles.activeNote__labels}>
                <LabelsContainer setActiveLabel={setActiveLabel} />
            </div>
        </div>
    );
};

export default ActiveNote;
