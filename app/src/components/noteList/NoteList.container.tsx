import { Note as NoteType } from '../Notes.interface';
import React from 'react';
import NoteList from './NoteList';
import Note from './Note';
import Pagination from '../pagination/Pagination';

interface Props {
    activeNoteId: string | undefined;
    handleclick: (noteId: string) => void;
    notes: NoteType[];
    offset: number;
    page: number;
    setPage: (page: number) => void;
}

const NoteListContainer = ({ activeNoteId, handleclick, notes, page, setPage, offset }: Props) => {
    return (
        <NoteList>
            {notes.map((note, index) => {
                return (
                    <Note
                        active={activeNoteId === note.id}
                        key={note.id}
                        handleclick={handleclick}
                        note={note}
                        noteNumber={index + offset}
                    />
                );
            })}
            <Pagination page={page} setPage={setPage} />
        </NoteList>
    );
};

export default NoteListContainer;
