import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Highlight.module.scss';
import reactStringReplace from 'react-string-replace';
import { HighlightedRange } from '../Notes.interface';
interface Props {
    activeClass: string;
    highLightedRange: HighlightedRange[];
    saveEnrichment: (ranges: HighlightedRange[]) => void;
    text: string;
}

const Highlight = ({ text, activeClass, highLightedRange, saveEnrichment }: Props) => {
    const [highlightedRanges, setHighlightedRanges] =
        useState<HighlightedRange[]>(highLightedRange);

    const [renderedText, setRenderedText] = useState<ReactNode[] | string>(text);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleHighlight = (className: string) => {
        const selection = window.getSelection();
        if (selection) {
            setIsButtonDisabled(false);
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString().trim();
            setHighlightedRanges([
                ...highlightedRanges,
                { text: selectedText, start: range.startOffset, end: range.endOffset, className }
            ]);
        }
    };

    const handleSaveButtonClick = () => {
        saveEnrichment(highlightedRanges);
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        let replaceText: ReactNode[] | string = renderedText;
        highlightedRanges.forEach(function (range, index) {
            replaceText = reactStringReplace(replaceText, range.text, (match, i) => (
                <span key={index} className={styles[range.className]}>
                    {match}
                </span>
            ));
        });

        setRenderedText(replaceText);
    }, [highlightedRanges]);

    return (
        <div>
            <div onMouseUp={() => handleHighlight(activeClass)}>{renderedText}</div>
            <button onClick={handleSaveButtonClick} type="button" disabled={isButtonDisabled}>
                Bewaar notitie
            </button>
        </div>
    );
};

export default Highlight;
