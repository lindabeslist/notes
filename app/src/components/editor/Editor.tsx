import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichText = () => {
    const handleEditorChange = (content: any) => {
        console.log('Content was updated:', content);
    };

    const [value, setValue] = useState('');
    console.log(value);
    return (
        <div>
            {/*<ReactQuill theme="snow" value={value} onChange={setValue} />;*/}
            <Editor
                apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                // initialValue="<p>This is the initial content of the editor</p>"
                init={{
                    skin: 'snow',
                    icons: 'thin',
                    placeholder: 'Omschrijving...',
                    height: 200,
                    menubar: false,
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen textcolor ',
                    //     'insertdatetime media table paste code help wordcount'
                    // ],
                    textcolor_rows: '4',

                    toolbar:
                        'undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent '
                }}
                onEditorChange={handleEditorChange}
                // outputFormat="html"
                // toolbar="code"
            />
        </div>
    );
};

export default RichText;
