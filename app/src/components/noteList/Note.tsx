import NoteList from './NoteList';
import React from 'react';
import { Note } from '../Notes.interface';
import styles from './Note.module.scss';

interface Props {
    note: Note;
    index: number;
}

const Note = ({ note, index }: Props) => {
    return (
        <div className={styles.note}>
            <span className={styles.note__state}>{note.has_enrichment ? 'O' : 'L'}</span>
            <span className={styles.note__prio}>{note.prio}</span>
            <span>{note.date_created}</span>
            <span className={styles.note__notification}>{`Melding ${index + 1}`}</span>
        </div>
    );
};

export default Note;
