import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

interface Props {
    editorValue: string;
    setEditorValue: (content: string) => void;
}

const Editor = ({ editorValue, setEditorValue }: Props) => {
    const handleEditorChange = (content: any) => {
        console.log('Content was updated:', content);
        setEditorValue(content);
    };

    console.log(editorValue);
    return (
        <div>
            <ReactQuill
                theme="snow"
                value={editorValue}
                onChange={handleEditorChange}
                preserveWhitespace
            />
        </div>
    );
};

export default Editor;
