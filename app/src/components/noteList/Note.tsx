import React from 'react';
import { Note as NoteType } from '../Notes.interface';
import styles from './Note.module.scss';

interface Props {
    active: boolean;
    noteNumber: number;
    handleclick: (noteId: string) => void;
    note: NoteType;
}
// 2024-01-31T15:10:23.640548
const Note = ({ active, handleclick, note, noteNumber }: Props) => {
    const date = new Date(note.date_created);

    return (
        <div
            className={`${styles.note} ${active ? styles['note--active'] : ''}`}
            onClick={() => handleclick(note.id)}>
            <span
                className={`${styles.note__state} ${note.has_enrichment ? styles['note__state--l'] : styles['note__state--o']}`}>
                {note.has_enrichment ? 'L' : 'O'}
            </span>
            <span className={`${styles.note__prio} ${styles[`note__prio--${note.prio}`]}`}>
                {note.prio}
            </span>
            <div className={styles.note__date}>
                <span
                    className={
                        styles.note__time
                    }>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
                <span>{`${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear().toString().substr(-2)}`}</span>
            </div>
            <span className={styles.note__notification}>{`Melding ${noteNumber + 1}`}</span>
        </div>
    );
};

export default Note;
