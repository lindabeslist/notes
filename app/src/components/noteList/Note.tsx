import NoteList from './NoteList';
import React from 'react';
import { Note } from '../Notes.interface';
import styles from './Note.module.scss';

interface Props {
    index: number;
    handleclick: (noteId: string) => void;
    note: Note;
}
// 2024-01-31T15:10:23.640548
const Note = ({ handleclick, note, index }: Props) => {
    const date = new Date(note.date_created);

    return (
        <div className={styles.note} onClick={() => handleclick(note.id)}>
            <span className={styles.note__state}>{note.has_enrichment ? 'O' : 'L'}</span>
            <span className={styles.note__prio}>{note.prio}</span>
            <div className={styles.note__date}>
                <span>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
                <span>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}`}</span>
            </div>
            <span className={styles.note__notification}>{`Melding ${index + 1}`}</span>
        </div>
    );
};

export default Note;
