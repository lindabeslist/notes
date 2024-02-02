import { Note as NoteType } from '../Notes.interface';
import React from 'react';
import NoteList from './NoteList';
import Note from './Note';

interface Props {
    handleclick: (noteId: string) => void;
    notes: NoteType[];
}

const NoteListContainer = ({ handleclick, notes }: Props) => {
    return (
        <NoteList>
            {notes.map((note, index) => {
                return <Note handleclick={handleclick} note={note} index={index} />;
            })}
        </NoteList>
    );
};

export default NoteListContainer;
