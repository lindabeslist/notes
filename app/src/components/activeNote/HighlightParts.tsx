import React, { useState } from 'react';
import MarkdownRenderer from './Markdown2';

interface HighlightedPart {
    start: number;
    end: number;
    label: string;
}

type MarkdownRendererProps = {
    children: string;
};

const HighlightParts = ({ children: markdown }: MarkdownRendererProps) => {
    const [content] = useState<string>(`
    # Sample Markdown Content

    This is a sample paragraph that can be highlighted.

    \`\`\`javascript
    const example = "Hello, World!";
    console.log(example);
    \`\`\`
  `);

    const [highlightedParts, setHighlightedParts] = useState<HighlightedPart[]>([]);

    const handleHighlight = (start: number, end: number, label: string) => {
        setHighlightedParts([...highlightedParts, { start, end, label }]);
        console.log([...highlightedParts, { start, end, label }]);
    };

    const handleHighlightButtonClick = () => {
        // Example: Highlight the first 5 characters of the text
        handleHighlight(0, 5, 'highlight-label');
    };

    const saveToDatabase = () => {
        // Add logic to save highlightedParts to the database
        console.log('Highlighted parts:', highlightedParts);
    };

    return (
        <div>
            <MarkdownRenderer content={markdown} handleHighlight={handleHighlight} />
            <button onClick={handleHighlightButtonClick}>Highlight First 5 Characters</button>
            <button onClick={saveToDatabase}>Save to Database</button>
        </div>
    );
};

export default HighlightParts;
