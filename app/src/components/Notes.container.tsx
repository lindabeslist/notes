import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

interface Note {
    id: string;
    source_id: string;
    prio: number;
    text: string;
    has_enrichment: string;
    date_created: string;
}

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
            {data?.getNotes.map(({ id, text }) => {
                return <span key={id}>{text}</span>;
            })}
        </>
    );
};

export default NotesContainer;
