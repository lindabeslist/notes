import { ActiveNote as ActiveNoteType, EnrichmentRequest } from '../Notes.interface';
import React, { ReactElement, useEffect, useState } from 'react';
// import ActiveNote from './ActiveNote';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import ActiveNote from './ActiveNote';
import LabelingComponent from './Highlight';

interface Props {
    // handleclick: (noteId: string) => void;
    activeNote?: ActiveNoteType;
}

interface QueryDataNote {
    enrichment: ActiveNoteType;
}

var days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
var months = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December'
];

const ENRICHMENT = gql`
    mutation Enrichment($noteId: String, $enrichment: [EnrichmentsMutation]) {
        enrichment(note_id: $noteId, enrichment: $enrichment) {
            id
            source_id
            prio
            text
            has_enrichment
            date_created
            Enrichments {
                start_pos
                end_pos
                selected_text
                entity
                description
            }
        }
    }
`;

interface SelectedText {
    text: string;
    color: string;
}

const ActiveNoteContainer = ({ activeNote }: Props) => {
    const [enrich, { data, loading, error }] = useMutation<QueryDataNote, EnrichmentRequest>(
        ENRICHMENT
    );

    if (!activeNote) return null;

    const handleClick = () => {
        enrich({
            variables: {
                noteId: activeNote.id,
                enrichment: [
                    {
                        start_pos: 0,
                        end_pos: 10,
                        entity: 'LINDA',
                        description: 'A person'
                    },
                    {
                        start_pos: 0,
                        end_pos: 10,
                        entity: 'PERSON',
                        description: 'A person'
                    }
                ]
            }
        });
    };

    const date = new Date(activeNote.date_created);
    return (
        <>
            <span>{`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</span>
            {/*<div onClick={handleClick}>{note}</div>*/}
            {JSON.stringify(data)}
            <LabelingComponent NoteText={activeNote.text} />
        </>
    );
};

export default ActiveNoteContainer;
