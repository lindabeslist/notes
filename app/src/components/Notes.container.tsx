import React from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { ActiveNote, Note } from './Notes.interface';
import NoteListContainer from './noteList/NoteList.container';
import Notes from './Notes';

const GET_NOTES = gql`
    query GetNotes($pageSize: Int!, $page: Int!) {
        getNotes(page_size: $pageSize, page: $page) {
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

const NotesContainer = () => {
    const { loading, error, data } = useQuery<QueryDataNotes>(GET_NOTES, {
        variables: {
            pageSize: 30,
            page: 1
        }
    });

    const [getActiveNote, { data: activeNote }] = useLazyQuery<QueryDataNote>(GET_NOTE);

    const handleNoteClick = (noteId: string) => {
        getActiveNote({ variables: { noteId } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <>
            {data?.getNotes && (
                <Notes activeNote={activeNote?.getNote}>
                    <NoteListContainer handleclick={handleNoteClick} notes={data?.getNotes} />
                </Notes>
            )}
        </>
    );
};

export default NotesContainer;
