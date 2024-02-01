import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Note } from './Notes.interface';
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

interface QueryData {
    getNotes: Note[];
}

const NotesContainer = () => {
    const { loading, error, data } = useQuery<QueryData>(GET_NOTES, {
        variables: {
            pageSize: 10,
            page: 1
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <>
            {data?.getNotes && (
                <Notes>
                    <NoteListContainer notes={data?.getNotes} />
                </Notes>
            )}
        </>
    );
};

export default NotesContainer;
