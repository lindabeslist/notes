import React, { useState } from 'react';
import styles from './HighlightWithClass.module.scss';

const HighlightWithClass = ({ text, activeClass }: { text: string; activeClass: string }) => {
    const [highlightedRanges, setHighlightedRanges] = useState<
        { start: number; end: number; className: string }[]
    >([]);

    const handleHighlight = (className: string) => {
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            setHighlightedRanges([
                ...highlightedRanges,
                { start: range.startOffset, end: range.endOffset, className }
            ]);
        }
    };

    const renderHighlightedText = () => {
        const textToHighlight = text;

        console.log(highlightedRanges);
        let renderedText = textToHighlight;

        return (
            <div>
                {highlightedRanges.map((range, index) => {
                    return (
                        <>
                            {textToHighlight.substring(0, range.start)}
                            <span key={index} className={styles[range.className]}>
                                {textToHighlight.substring(range.start, range.end)}
                            </span>
                            {textToHighlight.substring(range.end)}
                        </>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <div onMouseUp={() => handleHighlight(activeClass)}>{text}</div>
            {renderHighlightedText()}
        </div>
    );
};

export default HighlightWithClass;
