import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    ActiveNote as ActiveNoteType,
    EnrichmentRequest,
    HighlightedRange
} from '../Notes.interface';
import Highlight from './Highlight';
import { ENRICHMENT } from './ActiveNote.gql';
import ActiveNote from './ActiveNote';
import Editor from '../editor/Editor';
import mapEnrichments from './mapActiveEnrichments';
import SaveButton from '../saveButton/SaveButton';
interface Props {
    activeNote?: ActiveNoteType;
}

interface QueryDataNote {
    enrichment: ActiveNoteType;
}

const ActiveNoteContainer = ({ activeNote }: Props) => {
    const [activeClassName, setActiveClassName] = useState('purple');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [editorValue, setEditorValue] = useState('');

    const [enrich] = useMutation<QueryDataNote, EnrichmentRequest>(ENRICHMENT);
    const [highlightedRanges, setHighlightedRanges] = useState<HighlightedRange[]>(
        mapEnrichments(activeNote?.enrichments)
    );

    useEffect(() => {
        setHighlightedRanges(mapEnrichments(activeNote?.enrichments));
        setEditorValue('');
        setIsButtonDisabled(true);
    }, [activeNote]);

    if (!activeNote) return null;

    const handleClick = () => {
        const enrichment = highlightedRanges.map((range) => {
            return {
                start_pos: range.start,
                end_pos: range.end,
                entity: range.text,
                description: editorValue
            };
        });
        enrich({
            variables: {
                noteId: activeNote.id,
                enrichment
            }
        });
        setIsButtonDisabled(true);
    };

    const setActiveClass = (activeClass: string) => {
        setActiveClassName(activeClass);
    };

    const handleSetHighlightedRanges = (highlightedRanges: HighlightedRange[]) => {
        setHighlightedRanges(highlightedRanges);
        setIsButtonDisabled(false);
    };

    const handleSetEditorValue = (content: string) => {
        setEditorValue(content);
        setIsButtonDisabled(false);
    };

    const date = new Date(activeNote.date_created);
    return (
        <>
            <ActiveNote noteDate={date} setActiveClass={setActiveClass}>
                <Highlight
                    highlightedRanges={highlightedRanges}
                    setHighlightedRanges={handleSetHighlightedRanges}
                    text={activeNote.text}
                    activeClass={activeClassName}
                />
            </ActiveNote>
            <div>
                <Editor editorValue={editorValue} setEditorValue={handleSetEditorValue} />
            </div>
            <SaveButton handleClick={handleClick} isButtonDisabled={isButtonDisabled} />
        </>
    );
};

export default ActiveNoteContainer;
