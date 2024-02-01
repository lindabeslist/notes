import { Note as NoteType } from '../Notes.interface';
import React from 'react';
import NoteList from './NoteList';
import Note from './Note';

interface Props {
    notes: NoteType[];
}

const NoteListContainer = ({ notes }: Props) => {
    return (
        <NoteList>
            {notes.map((note, index) => {
                return <Note note={note} index={index} />;
            })}
        </NoteList>
    );
};

export default NoteListContainer;
