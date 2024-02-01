import React from 'react';
import styles from './Notes.module.scss';
import NotesTitle from './notesTitle/NotesTitle';

interface Props {
    children: React.ReactNode;
}

const Notes = ({ children }: Props) => {
    return (
        <div className={styles.notes}>
            <NotesTitle />
            {children}
        </div>
    );
};

export default Notes;
