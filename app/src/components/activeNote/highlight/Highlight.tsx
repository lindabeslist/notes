import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Highlight.module.scss';
import reactStringReplace from 'react-string-replace';
import { HighlightedRange } from '../../Notes.interface';
import { AllLabel } from '../../labels/Labels.container';
interface Props {
    activeLabel: AllLabel;
    highlightedRanges: HighlightedRange[];
    setHighlightedRanges: (ranges: HighlightedRange[]) => void;
    text: string;
}

const Highlight = ({ text, activeLabel, highlightedRanges, setHighlightedRanges }: Props) => {
    const [renderedText, setRenderedText] = useState<ReactNode[] | string>(text);

    useEffect(() => {
        setRenderedText(text);
    }, [text]);

    const handleHighlight = (activeLabel: AllLabel) => {
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString().trim();
            setHighlightedRanges([
                ...highlightedRanges,
                {
                    selected_text: selectedText,
                    start_pos: range.startOffset,
                    end_pos: range.endOffset,
                    entity: activeLabel.entity
                }
            ]);
        }
    };

    useEffect(() => {
        let replaceText: ReactNode[] | string = renderedText;
        highlightedRanges.forEach(function (range) {
            replaceText = reactStringReplace(replaceText, range.selected_text, (match, i) => (
                <span key={match + i} className={styles[range.entity]}>
                    {match}
                </span>
            ));
        });

        setRenderedText(replaceText);
    }, [highlightedRanges]);

    return (
        <>
            <div onMouseUp={() => handleHighlight(activeLabel)}>{renderedText}</div>
        </>
    );
};

export default Highlight;
