import React from 'react';
import styles from './Notes.module.scss';
import NotesTitle from './notesTitle/NotesTitle';
import { ActiveNote as ActiveNoteType } from './Notes.interface';
import ActiveNoteContainer from './activeNote/ActiveNote.container';

interface Props {
    children: React.ReactNode;
    activeNote?: ActiveNoteType;
}

const Notes = ({ activeNote, children }: Props) => {
    return (
        <div className={styles.notes}>
            <NotesTitle />
            {children}
            <div className={styles.notes__activeNote}>
                <ActiveNoteContainer activeNote={activeNote} />
            </div>
        </div>
    );
};

export default Notes;
