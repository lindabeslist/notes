import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    ActiveNote as ActiveNoteType,
    EnrichmentRequest,
    HighlightedRange
} from '../Notes.interface';
import Highlight from './Highlight';
import { ENRICHMENT } from './ActiveNote.gql';
import ActiveNote from './ActiveNote';
import RichText from '../editor/Editor';

interface Props {
    // handleclick: (noteId: string) => void;
    activeNote?: ActiveNoteType;
}

interface QueryDataNote {
    enrichment: ActiveNoteType;
}

const ActiveNoteContainer = ({ activeNote }: Props) => {
    const [activeClassName, setActiveClassName] = useState('purple');
    const [enrich] = useMutation<QueryDataNote, EnrichmentRequest>(ENRICHMENT);

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
            <ActiveNote noteDate={date} setActiveClass={setActiveClass}>
                <Highlight
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
            </ActiveNote>
            <div>
                <RichText />
            </div>
        </>
    );
};

export default ActiveNoteContainer;
