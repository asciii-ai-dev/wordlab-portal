import { RichUtils } from "draft-js";
import {
  EditorState,
  ContentState,
  Modifier,
  genKey,
  ContentBlock,
  convertToRaw,
  convertFromRaw,
  SelectionState,
} from "draft-js";
import { debounce } from "lodash";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CommonModal from "../Common/CommonModal";
import ContentModal from "./ContentModal";
import { useTemplateOutputMutation } from "../../features/templates/templateApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Pencil from "../../assets/images/pencil.png";
import Expand from "../../assets/images/expand.svg";
import Outline from "../../assets/images/outline.svg";
import Copy from "../../assets/images/copy.png";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const TextEditor = ({
  introduction,
  outline,
  docId,
  blogTitle,
  submitDocument,
  isDocLoading,
  conclusion,
  formValues,
  bussId
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [selectedOutlineText, setSelectedOutlineText] = useState("");
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);
  const { auth } = useSelector((state) => state);
  const editorRef = useRef(null);
  const storage = getStorage();
  // const timestamp = serverTimestamp();

  const { state } = useLocation();
  const timeoutRef = useRef(null);
  // console.log({state: state?.id, documentId})

  useEffect(() => {
    document.title = state?.blogTitle;
    if (state?.richText) {
      const contentState = convertFromRaw(state.richText);

      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [state?.richText, state?.blogTitle]);

  const [generateOutput, { isLoading, data, error }] =
    useTemplateOutputMutation();
  const handleVisible = (vis) => {
    if (vis) {
      setOpen(vis);
    } else {
      setOpen(() => !open);
    }
  };


  const saveDoc = () => {
    const contentState = editorState.getCurrentContent();
    const content = convertToRaw(contentState);
    // Get the current timestamp

    // Create or update the document
    if (!documentId && !state?.id && !isCreatingDocument) {
      setIsCreatingDocument(true);
      // Create a new document in Firestore
      addDoc(collection(db, "userDocs"), {
        userId: auth?.user?._id,
        rich_text: content,
        title: blogTitle || "",
        image: "",
        audience: formValues?.audience || "",
        tone: formValues?.tone || "",
        sound: formValues?.sound || "",
        kw: formValues?.kw || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then((docRef) => {
          console.log("New document created successfully!");
          setDocumentId(docRef.id);
          setIsCreatingDocument(false);
        })
        .catch((error) => {
          setIsCreatingDocument(false);
          console.error("Error creating document:", error);
        });
    } else if (state?.id || documentId) {
      // Update the existing document in Firestore
      const docRef = doc(db, "userDocs", state?.id || documentId);
      updateDoc(docRef, {
        userId: auth?.user?._id,
        rich_text: content,
        title: blogTitle || "",
        audience: formValues?.audience || "",
        tone: formValues?.tone || "",
        sound: formValues?.sound || "",
        kw: formValues?.kw || "",
        updatedAt: new Date(),
      })
        .then(() => {
          console.log("Document updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(saveDoc, 1000); // Delay of 1 second (adjust as needed)
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current); // Clean up the timeout on component unmount
    };
  }, []);

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleFetchContentTool = async (
    isModal,
    content,
    tempId,
    regenerate = false
  ) => {
    // if(selectedText?.length){
    const body = !isModal
      ? { content }
      : {
          title: blogTitle,
          subheading: content,
          tone: "Professional",
        };
    const loadingId = toast.loading("Loading...");
    try {
      const response = await generateOutput({
        token: auth?.token,
        template_id: tempId,
        form_fields: body,
        query: bussId ? `?business_id=${bussId}` : "",
      });
      if (response?.data?.message) {
        toast.success(`${response?.data.message} successfully!`);
        setOutputContent(response.data?.payload);
        if (isModal === false) return response.data?.payload?.data;
        if (isModal && regenerate) {
          console.log("open");
          handleVisible(true);
        } else {
          console.log("close");
          handleVisible();
        }
        //  if(regenerate === false) handleVisible(false);
        return response.data?.payload?.data;
      }
    } catch (error) {
      toast.error("An Error Occured");
    } finally {
      setTimeout(() => {
        toast.dismiss(loadingId);
      }, 2000);
    }
  };

  const writeOutline = async (vis) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const currentBlock = contentState.getBlockForKey(
        selectionState.getStartKey()
      );
      const startOffset = selectionState.getStartOffset();
      const endOffset = selectionState.getEndOffset();
      const selectedText = currentBlock.getText().slice(startOffset, endOffset);
      setSelectedOutlineText(selectedText);
      await handleFetchContentTool(true, selectedText, "document-subheading");
    }
  };

  const regenerateOutline = async (vis) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const currentBlock = contentState.getBlockForKey(
        selectionState.getStartKey()
      );
      const startOffset = selectionState.getStartOffset();
      const endOffset = selectionState.getEndOffset();
      const selectedText = currentBlock.getText().slice(startOffset, endOffset);
      setSelectedOutlineText(selectedText);
      await handleFetchContentTool(
        true,
        selectedText || selectedOutlineText,
        "document-subheading",
        true
      );
    }
  };

  const replaceSelectedText = async () => {
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const currentBlock = contentState.getBlockForKey(
        selectionState.getStartKey()
      );
      const startOffset = selectionState.getStartOffset();
      const endOffset = selectionState.getEndOffset();
      const selectedText = currentBlock.getText().slice(startOffset, endOffset);
      const res = await handleFetchContentTool(
        false,
        selectedText,
        "document-rewritetext"
      );
      const replacedContentState = Modifier.replaceText(
        contentState,
        selectionState,
        " " + res
      );

      const newEditorState = EditorState.push(
        editorState,
        replacedContentState,
        "replace-text"
      );

      setEditorState(newEditorState);
      editorRef.current.focus;
    }
  };

  // Custom condition to determine if a space should be added before fetchedText
  const shouldAddSpace = (selectedText) => {
    // Add your logic here to determine if a space should be added
    // Example: Add a space if the last character of selectedText is not a punctuation mark
    const punctuationMarks = [".", ",", ";", "!"];
    const lastCharacter = selectedText.trim().slice(-1);
    return !punctuationMarks.includes(lastCharacter);
  };

  const expandText = async () => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(
      selectionState.getStartKey()
    );
    const selectedText = currentBlock
      .getText()
      .slice(selectionState.getStartOffset(), selectionState.getEndOffset());

    if (selectedText.trim() !== "") {
      try {
        const response = await handleFetchContentTool(
          false,
          selectedText,
          "document-extendtext"
        );
        const fetchedText = response; // Extract the desired text from the API response

        const spaceToAdd = shouldAddSpace(selectedText) ? " " : ""; // Custom condition to determine if a space should be added

        const newContentState = Modifier.replaceText(
          contentState,
          selectionState,
          selectedText + spaceToAdd + fetchedText // Concatenate selectedText, space, and fetchedText
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "insert-characters"
        );

        setEditorState(newEditorState);
        editorRef.current.focus();
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    }
  };

  const insertOutlineText = async () => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    if (!selectionState.isCollapsed()) {
      const startKey = selectionState.getStartKey();
      const startOffset = selectionState.getStartOffset();
      const block = contentState.getBlockForKey(startKey);
      const selectedText = block
        .getText()
        .slice(startOffset, selectionState.getEndOffset());

      const textToInsert =
        "\n" +
        selectedText +
        (outputContent?.data ? "\n" + outputContent.data : "");

      const contentWithSplitBlock = Modifier.splitBlock(
        contentState,
        selectionState
      );
      const selectionAfterSplit = contentWithSplitBlock.getSelectionAfter();

      const newContentState = Modifier.insertText(
        contentWithSplitBlock,
        selectionAfterSplit,
        textToInsert
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-characters"
      );

      setEditorState(
        EditorState.forceSelection(newEditorState, selectionAfterSplit)
      );
      handleVisible();
    }
  };

  const pushFetchedContent = (cnt) => {
    if (cnt && cnt.length > 0) {
      const contentState = ContentState.createFromText(cnt);
      const newContentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        "\n" + cnt
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-characters"
      );
      setEditorState(newEditorState);
    }
  };

  // const pushFetchedContent = (cnt) => {
  //   if (cnt && cnt.length > 0) {
  //     let currentIndex = 0;
  //     const interval = setInterval(() => {
  //       if (currentIndex >= cnt.length) {
  //         clearInterval(interval);
  //       } else {
  //         const currentText = cnt.slice(0, currentIndex + 1);
  //         const contentState = ContentState.createFromText(currentText);
  //         const newContentState = Modifier.replaceText(
  //           editorState.getCurrentContent(),
  //           editorState.getSelection(),
  //           "\n" + currentText
  //         );
  //         const newEditorState = EditorState.push(
  //           editorState,
  //           newContentState,
  //           "insert-characters"
  //         );
  //         setEditorState(newEditorState);
  //         currentIndex++;
  //       }
  //     }, 0); // adjust typing speed here (in milliseconds)
  //     () => {
  //       clearInterval(interval);
  //       editorRef.current.focus;
  //     };
  //   }
  // };

  useEffect(() => {
    if (introduction && introduction.length > 0) {
      pushFetchedContent(introduction);
    }
  }, [introduction]);

  useEffect(() => {
    if (outline && outline.length > 0) {
      pushFetchedContent(outline);
    }
  }, [outline]);

  useEffect(() => {
    if (conclusion && conclusion.length > 0) {
      pushFetchedContent(conclusion);
    }
  }, [conclusion]);

  useEffect(() => {
    // Clear the previous typing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new typing timeout
    const newTypingTimeout = setTimeout(() => {
      html2canvas(document.getElementById("divId")).then((canvas) => {
        // Convert the canvas to a Blob object
        canvas.toBlob((blob) => {
          // Generate a unique filename for the image
          const filename = `${Date.now()}.png`;

          // Create a reference to the storage location
          const storageRef = ref(storage, `images/${filename}`);

          // Upload the screenshot image to Firebase Storage
          uploadBytes(storageRef, blob)
            .then(() => {
              // Get the download URL of the uploaded image
              getDownloadURL(storageRef).then((downloadURL) => {
                const contentState = editorState.getCurrentContent();
                const content = convertToRaw(contentState);
                // Update the document in Firestore with the download URL
                const docRef = doc(db, "userDocs", state?.id || documentId);
                updateDoc(docRef, {
                  userId: auth?.user?._id,
                  rich_text: content,
                  title: blogTitle || "",
                  image: downloadURL,
                  updatedAt: new Date(),
                })
                  .then(() => {
                    console.log("Document updated successfully!");
                  })
                  .catch((error) => {
                    console.error("Error updating document:", error);
                  });
              });
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        });
      });
    }, 2000); // Auto-save after 2 seconds of inactivity

    setTypingTimeout(newTypingTimeout);

    return () => {
      if (newTypingTimeout) {
        clearTimeout(newTypingTimeout);
      }
    };
  }, [editorState]);

  const updateEditorState = debounce(
    (blogTitle, editorState, setEditorState) => {
      const currentContentState = editorState.getCurrentContent();
      const currentBlockMap = currentContentState.getBlockMap();

      const titleBlock = currentBlockMap.first(); // Assuming the title block is the first block in the editor

      if (titleBlock) {
        const titleRange = SelectionState.createEmpty(
          titleBlock.getKey()
        ).merge({
          anchorOffset: 0,
          focusOffset: titleBlock.getLength(),
        });

        const updatedContentState = Modifier.replaceText(
          currentContentState,
          titleRange,
          blogTitle
        );

        const newEditorState = EditorState.push(
          editorState,
          updatedContentState,
          "change-block-data"
        );

        setEditorState(newEditorState);
      }
    },
    200
  ); // Debounce delay of 300 milliseconds

  useEffect(() => {
    document.title = blogTitle || "Untitled Document";
    updateEditorState(blogTitle, editorState, setEditorState);
  }, [blogTitle]);

  const handleCopy = () => {
    const editorContent = editorState.getCurrentContent();
    const editorText = editorContent.getPlainText();

    navigator.clipboard
      .writeText(editorText)
      .then(() => {
        toast.success("Editor content copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy editor content to clipboard");
        console.log(error, " copy error");
      });
  };

  const toolbarCustomButtons = useMemo(
    () => [
      <button
        onClick={replaceSelectedText}
        className="rdw-option-wrapper selector12"
        title="Re-write"
        key="custom-button"
        disabled={isLoading}
      >
        <img src={Pencil} alt="copy" />
      </button>,
      <button
        className="rdw-option-wrapper selector13"
        title="Write outline copy"
        key="custom-button"
        disabled={isLoading}
        onClick={writeOutline}
      >
        <img src={Outline} alt="outline" />
      </button>,
      <button
        className="rdw-option-wrapper selector14"
        title="Expand copy"
        key="custom-button"
        disabled={isLoading}
        onClick={expandText}
      >
        <img src={Expand} alt="expand" />
      </button>,
      <button
        className="rdw-option-wrapper selector15"
        title="Copy to clipboard"
        key="custom-button"
        onClick={handleCopy}
      >
        <img src={Copy} alt="copy" />
      </button>,
    ],
    [replaceSelectedText, writeOutline, expandText, handleCopy, isLoading]
  );

  return (
    <>
      {/* <button onClick={handleSaveDoc}>Click</button> */}
      <CommonModal
        className="!w-[90%] lg:!w-[50%] !max-w-5xl p-0  md:pb-0 pr-3 !pb-3 !overflow-y-hidden"
        title={"Generated Output Outline"}
        btnText="Insert"
        handleOpen={() => handleVisible(false)}
        open={open}
        headerClass="border-b border-[#091E4224] py-4 px-5"
        showActions={true}
        actionsClass="!m-10 md:!m-0"
        onClick={insertOutlineText}
      >
        <ContentModal
          isLoading={isLoading}
          regenerate={regenerateOutline}
          content={outputContent}
        />
      </CommonModal>
      <div
        id="divId"
        className="bg-base-200 bg-opacity-40 pb-16 min-h-screen relative "
      >
        <Editor
          ref={editorRef}
          // readOnly={isDocLoading}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="flex top-0 bg-base-100 sticky z-20 justify-center mx-auto"
          toolbarCustomButtons={toolbarCustomButtons}
          editorClassName="classEditor text-[13px] sm:text-[15px]  mt-6 bg-base-100 text-base-content shadow-lg  min-w-3xl max-w-[95%] mx-auto mb-12 border p-4 sm:p-10 min-h-[70vh]"
          // toolbar={{
          //   image: {
          //     urlEnabled: true,
          //     uploadEnabled: true,
          //     alignmentEnabled: true,
          //     uploadCallback: async (file) => {
          //       try {
          //         const storageRef = ref(
          //           storage,
          //           `blogEditor/${auth?.user?._id}/${file.name}`
          //         );
          //         await uploadBytes(storageRef, file);
          //         const downloadURL = await getDownloadURL(storageRef);
          //         return { data: { link: downloadURL } };
          //       } catch (error) {
          //         console.error("Error uploading image:", error);
          //         throw new Error("Failed to upload image");
          //       }
          //     },
          //   },
          // }}
        />
      </div>
    </>
  );
};

export default TextEditor;
