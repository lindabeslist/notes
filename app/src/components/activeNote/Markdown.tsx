import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { ReactMarkdownProps } from 'react-markdown';
// @ts-ignore
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface HighlightedPart {
    start: number;
    end: number;
    label: string;
}

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    // const [highlightedParts, setHighlightedParts] = useState<HighlightedPart[]>([]);
    //
    // const handleHighlight = (start: number, end: number, label: string) => {
    //     setHighlightedParts([...highlightedParts, { start, end, label }]);
    // };
    //
    // const renderers = {
    //     code: ({ language, value }: any) => {
    //         return (
    //             <SyntaxHighlighter language={language} style={dracula}>
    //                 {value}
    //             </SyntaxHighlighter>
    //         );
    //     },
    //     text: ({ children }) => {
    //         // You can add your own logic to handle highlighting and labeling here
    //         return <span>{children}</span>;
    //     }
    // };
    //
    // return <ReactMarkdown components={renderers}>{content}</ReactMarkdown>;
    return <>{content}</>;
};

export default MarkdownRenderer;
