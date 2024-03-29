import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    ActiveNote as ActiveNoteType,
    EnrichmentRequest,
    HighlightedRange
} from '../Notes.interface';
import Highlight from './highlight/Highlight';
import { ENRICHMENT } from './ActiveNote.gql';
import ActiveNote from './ActiveNote';
import Editor from '../editor/Editor';
import mapEnrichments from './mapActiveEnrichments';
import SaveButton from '../saveButton/SaveButton';
import { allLabels, AllLabel } from '../labels/Labels.container';

interface Props {
    activeNote?: ActiveNoteType;
}

interface QueryDataNote {
    enrichment: ActiveNoteType;
}

const ActiveNoteContainer = ({ activeNote }: Props) => {
    const [activeLabel, setActiveLabel] = useState<AllLabel>(allLabels[0]);
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

    const handleClick = () => {
        if (!activeNote?.id) return;
        const enrichment = highlightedRanges.map((range) => {
            return {
                start_pos: range.start_pos,
                end_pos: range.end_pos,
                entity: range.entity,
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

    const handleSetActiveLabel = (label: AllLabel) => {
        setActiveLabel(label);
    };

    const handleSetHighlightedRanges = (highlightedRanges: HighlightedRange[]) => {
        setHighlightedRanges(highlightedRanges);
        setIsButtonDisabled(false);
    };

    const handleSetEditorValue = (content: string) => {
        setEditorValue(content);
        setIsButtonDisabled(false);
    };
    if (!activeNote) return null;

    const date = new Date(activeNote.date_created);
    return (
        <>
            <ActiveNote noteDate={date} setActiveLabel={handleSetActiveLabel}>
                <Highlight
                    highlightedRanges={highlightedRanges}
                    setHighlightedRanges={handleSetHighlightedRanges}
                    text={activeNote.text}
                    activeLabel={activeLabel}
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
