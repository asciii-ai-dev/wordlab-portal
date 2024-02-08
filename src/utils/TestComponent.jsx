import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { debounce } from "lodash";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";

const TestComponent = ({
  blogTitle,
  editorRef,
  docId,
  formValues: formVals,
  bussId,
  handleFeaturesCall,
  saveDoc,
  isLoading
}) => {
  const [contentLoading, setContentLoading] = useState(false);
  const [formValues, setFormValues] = useState(formVals || {})
  const [editorReady, setEditorReady] = useState(false);

  const { state } = useLocation();
  // const editorRef = useRef();
  // console.log(state?.richText)
  useEffect(() => {
    if (editorReady && editorRef.current && state?.richText) {
      editorRef.current.setContent(state.richText);
    }
  }, [editorReady, editorRef, state?.richText]);



  const { auth } = useSelector((state) => state);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };



  const debouncedSaveDocument = debounce(saveDoc, 1000)

  const handleKeyUp = () => {
    debouncedSaveDocument();
  };



  return (
    <div>
      <Editor
        ref={editorRef}
        onInit={(evt, editor) => {
          setEditorReady(true);
          editorRef.current = editor;

        }}

        apiKey="xu9ctv4zenbfeefna54r8l9om6tpxg7mpe6chkbrjyru088q"
        disabled={isLoading}
        init={{
          selector: 'textarea',  // change this value according to your html
          toolbar_location: 'top',
          toolbar_sticky: true,
          inline: false ,
          toolbar_sticky_offset: 60,
          setup: function (editor) {
            editor.ui.registry.addButton("rewriteBtn", {
              // text: "My Button",
              icon: "line",
              tooltip: "Rewrite",
              onAction: () => handleFeaturesCall('rewrite'),
              // enabled: false

            });
            editor.ui.registry.addButton("subHeadingBtn", {
              // text: "My Button",
              icon: "table-delete-column",
              tooltip: "Write Outline Copy",
              onAction: () => handleFeaturesCall('subheading'),
              // enabled: false

            });
            editor.ui.registry.addButton("extendTextBtn", {
              // text: "My Button",
              icon: "indent",
              tooltip: "Extend Copy",
              onAction: () => handleFeaturesCall('extendtext'),
              // enabled: false

            });

          },
          height: "95vh",
          menubar: "file edit view insert format tools table help",
          selector: 'textarea#default-editor',
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount textpattern",
          ],
          force_p_newlines: false,
          forced_root_block: false,
          force_br_newlines: true,
          textpattern_patterns: [
            { start: '*', end: '*', format: 'italic' },
            { start: '**', end: '**', format: 'bold' },
            { start: '#', format: 'h1' },
            { start: '##', format: 'h2' },
            { start: '###', format: 'h3' },
            { start: '####', format: 'h4' },
            { start: '#####', format: 'h5' },
            { start: '######', format: 'h6' },
            { start: '1. ', cmd: 'InsertOrderedList' },
            { start: '* ', cmd: 'InsertUnorderedList' },
            { start: '- ', cmd: 'InsertUnorderedList' },
            { start: '//brb', replacement: 'Be Right Back' }
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | rewriteBtn | subHeadingBtn | extendTextBtn",
          content_style: `
      body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 16px;
      }
    `,
        }}
        onKeyUp={handleKeyUp}
      />


    </div>
  );
};

export default TestComponent;
