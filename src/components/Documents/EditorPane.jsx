import { useState } from "react";
import TextEditor from "./TextEditor";
import TestComponent from "../../utils/TestComponent";

const EditorPane = ({
  introduction,
  outline,
  formValues,
  conclusion,
  blogTitle,
  submitDocument,
  docId,
  isDocLoading,
  editorRef,
  bussId,
  handleFeaturesCall,
  saveDoc,
  isLoading
}) => {
  return (
    <div id="container" className="flex-1 ">
      <TestComponent
        editorRef={editorRef}
        blogTitle={blogTitle}
        submitDocument={submitDocument}
        docId={docId}
        formValues={formValues}
        isLoading={isLoading}
        bussId={bussId}
        handleFeaturesCall={handleFeaturesCall}
        saveDoc={saveDoc}
      />
      {/* <TextEditor
        introduction={introduction}
        outline={outline}
        blogTitle={blogTitle}
        submitDocument={submitDocument}
        isDocLoading={isDocLoading}
        docId={docId}
        conclusion={conclusion}
        formValues={formValues}
        bussId={bussId}
      /> */}
    </div>
  );
};

export default EditorPane;
