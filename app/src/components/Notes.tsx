import React from 'react';
import styles from './Notes.module.scss';
import NotesTitle from './notesTitle/NotesTitle';
import { ActiveNote as ActiveNoteType } from './Notes.interface';
import ActiveNoteContainer from './activeNote/ActiveNote.container';
import RichText from './editor/Editor';
import Toggle from './toggle/Toggle';

interface Props {
    children: React.ReactNode;
    activeNote?: ActiveNoteType;
    showUnrated: boolean;
    setShowUnrated: (toggle: boolean) => void;
}

const Notes = ({ activeNote, children, setShowUnrated, showUnrated }: Props) => {
    return (
        <div className={styles.notes}>
            <NotesTitle />
            {children}
            <div className={styles.notes__activeNote}>
                <ActiveNoteContainer activeNote={activeNote} />
            </div>
            <div className={styles.notes__edit}>
                <RichText />
            </div>
            <Toggle
                label="Toon alleen onbeoordeelde meldingen"
                id="notes"
                isChecked={showUnrated}
                onChange={setShowUnrated}
            />
        </div>
    );
};

export default Notes;
