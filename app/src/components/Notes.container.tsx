import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ActiveNote as ActiveNoteType, Note } from './Notes.interface';
import NoteListContainer from './noteList/NoteList.container';
import Notes from './Notes';
import { GET_NOTE, GET_NOTES } from './Notes.gql';

interface QueryDataNotes {
    getNotes: Note[];
}

interface QueryDataNote {
    getNote: ActiveNoteType;
}

const NOTES_TO_FETCH = 10;

const NotesContainer = () => {
    const [showUnrated, setShowUnrated] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [activeNoteId, setActiveNoteId] = useState<string | undefined>();
    const { loading, error, data } = useQuery<QueryDataNotes>(GET_NOTES, {
        variables: {
            pageSize: NOTES_TO_FETCH,
            page,
            hasEnrichment: showUnrated ? false : undefined
        }
    });

    const [getActiveNote, { data: activeNote }] = useLazyQuery<QueryDataNote>(GET_NOTE);

    const handleNoteClick = (noteId: string) => {
        setActiveNoteId(noteId);
        getActiveNote({ variables: { noteId } });
    };

    const handleShowUnratedClick = (toggle: boolean) => {
        setPage(1);
        setShowUnrated(toggle);
    };

    const handlePagination = (page: number) => {
        setPage(page);
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <>
            {data?.getNotes && (
                <Notes
                    activeNote={activeNote?.getNote}
                    showUnrated={showUnrated}
                    setShowUnrated={(toggle: boolean) => handleShowUnratedClick(toggle)}>
                    <NoteListContainer
                        activeNoteId={activeNoteId}
                        handleclick={handleNoteClick}
                        notes={data?.getNotes}
                        offset={(page - 1) * NOTES_TO_FETCH}
                        page={page}
                        setPage={(page) => handlePagination(page)}
                    />
                </Notes>
            )}
        </>
    );
};

export default NotesContainer;
