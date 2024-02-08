import React from 'react'
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
import { convertToRaw } from 'draft-js';

const useTextEditor = (editorState) => {
    const timestamp = serverTimestamp();

    const saveDoc = ({blogTitle, formValues, state, documentId, isCreatingDocument, setDocumentId, setIsCreatingDocument,auth}) => {
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
           title: blogTitle,
           image: "",
           audience: formValues?.audience || "",
           kw: formValues?.kw || "",
           createdAt: timestamp,
           updatedAt: timestamp,
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
           title: blogTitle,
           audience: formValues?.audience || "",
           kw: formValues?.kw || "",
           updatedAt: timestamp,
         })
           .then(() => {
             console.log("Document updated successfully!");
           })
           .catch((error) => {
             console.error("Error updating document:", error);
           });
       }
     }

     return {
        saveDoc
     }
}

export default useTextEditor