import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
// interface HighlightedPart {
//     start: number;
//     end: number;
//     label: string;
// }

interface MarkdownRendererProps {
    content: string;
    // eslint-disable-next-line no-unused-vars
    handleHighlight: (start: number, end: number, label: string) => void;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, handleHighlight }) => {
    // const renderers = {
    //     code: ({ language, value }: any) => {
    //         return (
    //             <SyntaxHighlighter language={language} style={dracula}>
    //                 {value}
    //             </SyntaxHighlighter>
    //         );
    //     },
    //     text: ({ children }: { children: string }) => {
    //         // You can add your own logic to handle highlighting and labeling here
    //         return <span onClick={() => handleHighlight(0, 5, 'highlight-label')}>{children}</span>;
    //     }
    // };
    //
    // return <ReactMarkdown components={renderers}>{content}</ReactMarkdown>;

    return (
        <ReactMarkdown
            components={{
                // eslint-disable-next-line no-unused-vars
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');

                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={dracula}
                            PreTag="div"
                            language={match[1]}
                            {...props}>
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code
                            className={className}
                            {...props}
                            onClick={() => handleHighlight(0, 10, 'highlight-label')}>
                            {children}
                        </code>
                    );
                }
            }}>
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
