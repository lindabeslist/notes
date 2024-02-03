import {
    ActiveNote as ActiveNoteType,
    EnrichmentRequest,
    HighlightedRange
} from '../Notes.interface';
import React, { ReactElement, useEffect, useState } from 'react';
// import ActiveNote from './ActiveNote';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import ActiveNote from './ActiveNote';
import LabelingComponent from './Highlight';
import MarkdownRenderer from './Highlight';
import HighlightParts from './HighlightParts';
import HighlightWords from './HighlightWords';
import HighlightWithClass from './HighlightWithClass';
import Labels from '../labels/Labels';

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

const ActiveNoteContainer = ({ activeNote }: Props) => {
    const [activeClassName, setActiveClassName] = useState('red');
    const [enrich, { data, loading, error }] = useMutation<QueryDataNote, EnrichmentRequest>(
        ENRICHMENT
    );

    if (!activeNote) return null;

    const handleClick = (ranges: HighlightedRange[]) => {
        const enrichment = ranges.map((range) => {
            return {
                start_pos: range.start,
                end_pos: range.end,
                entity: range.text,
                description: ''
            };
        });
        enrich({
            variables: {
                noteId: activeNote.id,
                enrichment
            }
        });
    };

    const setActiveClass = (activeClass: string) => {
        setActiveClassName(activeClass);
    };

    const date = new Date(activeNote.date_created);
    return (
        <>
            <span>{`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</span>
            <HighlightWithClass
                saveEnrichment={handleClick}
                text={activeNote.text}
                activeClass={activeClassName}
                highLightedRange={
                    activeNote.enrichments
                        ? activeNote.enrichments.map((enrichment) => ({
                              start: enrichment.start_pos,
                              end: enrichment.end_pos,
                              text: enrichment.entity,
                              className: ''
                          }))
                        : []
                }
            />
            <Labels setActiveClass={setActiveClass} />
        </>
    );
};

export default ActiveNoteContainer;
