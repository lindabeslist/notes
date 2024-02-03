import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

const RichText = () => {
    const [value, setValue] = useState('');
    const handleEditorChange = (content: any) => {
        console.log('Content was updated:', content);
        setValue(content);
    };

    console.log(value);
    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleEditorChange}
                preserveWhitespace
            />
        </div>
    );
};

export default RichText;
