import React, { useState } from 'react';
import { saveAs } from 'file-saver';
// import {saveAs} from 'file-saver'
import { Packer, Document, Paragraph } from 'docx';

interface DocxEditorProps {
  setDocxContent: (content: string) => void;
}

const DocxEditor: React.FC<DocxEditorProps> = ({ setDocxContent }) => {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(content)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const reader = new FileReader();
    reader.onloadend = () => {
      setDocxContent(reader.result as string);
    };
    reader.readAsArrayBuffer(blob);
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <button type="button" onClick={handleSave}>
        Save DOCX Content
      </button>
    </div>
  );
};

export default DocxEditor;
