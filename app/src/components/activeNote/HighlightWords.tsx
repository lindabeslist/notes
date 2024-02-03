import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';

const HighlightWords = ({ text }: { text: string }) => {
    const [highlightedRanges, setHighlightedRanges] = useState<
        { text: string; start: number; end: number }[]
    >([]);

    const handleHighlight = () => {
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString().trim();
            console.log([
                ...highlightedRanges,
                { text: selectedText, start: range.startOffset, end: range.endOffset }
            ]);
            setHighlightedRanges([
                ...highlightedRanges,
                { text: selectedText, start: range.startOffset, end: range.endOffset }
            ]);
        }
    };

    return (
        <div>
            <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={highlightedRanges.map((range) => range.text)} // Use a placeholder word for highlighting
                textToHighlight={text}
                onMouseUp={() => handleHighlight()}
                autoEscape={true}
            />
        </div>
    );
};

export default HighlightWords;

// <Highlighter
//     highlightClassName="YourHighlightClass"
//     searchWords={['and', 'or', 'the']}
//     autoEscape={true}
//     textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
// />
