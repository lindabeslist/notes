import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface LabelingComponentProps {}

const LabelingComponent = ({ NoteText }: { NoteText: string }) => {
    const [text, setText] = useState<string>(NoteText);
    const [labels, setLabels] = useState<string[]>([]);

    const handleLabelSubmit = async () => {
        // Assuming you have a backend API endpoint for saving labeled data
        console.log(text);
        console.log(labels);
    };

    // @ts-ignore
    const renderers: ReactMarkdown.Renderers = {
        text: (text: string, { key }: any) => {
            // Create a regex pattern to match each label, considering spaces
            const labelRegex = new RegExp(
                labels
                    .map((label) => `(${label.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`)
                    .join('|'),
                'g'
            );

            // Split the text using the regex pattern
            const parts = text.split(labelRegex);

            return parts.map((part, index) => {
                const isLabel = labels.includes(part.trim());
                const elementKey = `${key}-${index}`;

                return isLabel ? (
                    <span key={elementKey} style={{ backgroundColor: 'yellow' }}>
                        {part}
                    </span>
                ) : (
                    part
                );
            });
        }
    };

    // @ts-ignore
    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
            />

            <div>
                <label>
                    Labels:
                    <input
                        type="text"
                        value={labels.join(',')}
                        onChange={(e) => setLabels(e.target.value.split(','))}
                        placeholder="Label1,Label2,Label3"
                    />
                </label>
            </div>

            <div>
                <button onClick={handleLabelSubmit}>Save Labels</button>
            </div>

            <div>
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
};

export default LabelingComponent;
