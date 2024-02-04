import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Highlight.module.scss';
import reactStringReplace from 'react-string-replace';
import { HighlightedRange } from '../Notes.interface';
interface Props {
    activeClass: string;
    highlightedRanges: HighlightedRange[];
    setHighlightedRanges: (ranges: HighlightedRange[]) => void;
    text: string;
}

const Highlight = ({ text, activeClass, highlightedRanges, setHighlightedRanges }: Props) => {
    const [renderedText, setRenderedText] = useState<ReactNode[] | string>(text);

    useEffect(() => {
        setRenderedText(text);
    }, [text]);

    const handleHighlight = (className: string) => {
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString().trim();
            setHighlightedRanges([
                ...highlightedRanges,
                { text: selectedText, start: range.startOffset, end: range.endOffset, className }
            ]);
        }
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
        <>
            <div onMouseUp={() => handleHighlight(activeClass)}>{renderedText}</div>
        </>
    );
};

export default Highlight;
