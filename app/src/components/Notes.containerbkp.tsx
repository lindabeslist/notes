import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { ActiveNote, Note } from './Notes.interface';
import NoteListContainer from './noteList/NoteList.container';
import Notes from './Notes';
import Pagination from './pagination/Pagination';

const GET_NOTES = gql`
    query GetNotes($pageSize: Int!, $page: Int!, $hasEnrichment: Boolean) {
        getNotes(page_size: $pageSize, page: $page, has_enrichment: $hasEnrichment) {
            date_created
            has_enrichment
            id
            prio
            source_id
            text
        }
    }
`;

const GET_NOTE = gql`
    query GetNote($noteId: String) {
        getNote(note_id: $noteId) {
            Enrichments {
                start_pos
                end_pos
                selected_text
                entity
                description
            }
            id
            source_id
            prio
            text
            has_enrichment
            date_created
        }
    }
`;

interface QueryDataNotes {
    getNotes: Note[];
}

interface QueryDataNote {
    getNote: ActiveNote;
}

const NOTES_TO_FETCH = 15;

const NotesContainer = () => {
    const [showUnrated, setShowUnrated] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { loading, error, data } = useQuery<QueryDataNotes>(GET_NOTES, {
        variables: {
            pageSize: NOTES_TO_FETCH,
            page,
            hasEnrichment: showUnrated ? false : undefined
        }
    });

    const [getActiveNote, { data: activeNote }] = useLazyQuery<QueryDataNote>(GET_NOTE);

    const handleNoteClick = (noteId: string) => {
        getActiveNote({ variables: { noteId } });
    };

    // const handleShowmore = () => {
    //     if (!data) return;
    //     fetchMore({
    //         variables: {
    //             pageSize: NOTES_TO_FETCH,
    //             page: 2,
    //             hasEnrichment: showUnrated ? false : undefined
    //         }
    //     });
    // };

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
                    setShowUnrated={(toggle: boolean) => setShowUnrated(toggle)}>
                    <NoteListContainer handleclick={handleNoteClick} notes={data?.getNotes} />
                    <Pagination page={page} setPage={(page) => handlePagination(page)} />
                </Notes>
            )}
        </>
    );
};

export default NotesContainer;
