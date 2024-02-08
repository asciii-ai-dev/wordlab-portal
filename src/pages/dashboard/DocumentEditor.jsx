import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "../../components/Documents/EditorHeader";
import LeftPane from "../../components/Documents/LeftPane";
import EditorPane from "../../components/Documents/EditorPane";
import RightPane from "../../components/Documents/RightPane";
import { useTemplateOutputMutation } from "../../features/templates/templateApi";
import { useDocumentSaveMutation } from "../../features/document/documentApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { docValidation } from "../../validators/document";
import Drawer from "react-modern-drawer";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { BiLeftIndent } from "react-icons/bi";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";
import { steps } from "../../utils/data/stepsTour";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebase";
import { BASE_URL } from "../../utils/constants";

const DocumentEditor = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(docValidation),
  });

  const valuesOfForm = {
    audience: watch("audience"),
    kw: watch("kw"),
    sound: watch("sound"),
    tone: watch("tone"),
    title: watch('title')
  };
  const blogTitle = watch("title");
  const [isLoading, setIsLoading] = useState(false)
  const [introduction, setIntroduction] = useState("");
  const [outline, setOutline] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [rightView, setRightView] = useState("templates");
  const [startTour, setStartTour] = useState(false);
  const [bussId, setBussId] = useState("");
  const editorRef = useRef(null);
  let loadingId;

  const handleBussId = (e) => {
    setBussId(e);
  };
  const [docId, setDocId] = useState("");

  const toggleLeftPane = React.useCallback(() => {
    setOpenLeft((drawer) => !drawer);
  }, []);

  const toggleRightPane = React.useCallback(() => {
    setOpenRight((drawer) => !drawer);
  }, []);


  const { auth } = useSelector((state) => state);


  const conclusionBody = {
    query: bussId ? `?business_id=${bussId}` : "",
    token: auth?.token,
    template_id: "document-conclusion",
    form_fields: {
      title: blogTitle,
      outline,
      audience: watch("audience"),
      tone: watch("tone"),
    },
  }

  const introBody = {
    query: bussId ? `?business_id=${bussId}` : "",
    template_id: "document-intro",
    form_fields: {
      title: blogTitle,
      audience: watch("audience"),
      tone: watch("tone"),
      sound: watch("sound"),
    },
  }

  const outlineBody = {
    query: bussId ? `?business_id=${bussId}` : "",
    token: auth?.token,
    template_id: "document-outline",
    form_fields: {
      title: blogTitle,
      audience: watch("audience"),
      tone: watch("tone"),
      sound: watch("sound"),
    },
  }

  // Create an AbortController
  const controller = new AbortController();

  const fetchContent = async (body) => {
    loadingId = toast.loading("Loading...");
    setIsLoading(true);

    const response = await fetch(`${BASE_URL}/output/generate-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal, // Pass the signal directly
    });

    const reader = response.body.getReader();

    let content = editorRef.current ? editorRef.current.getContent() + '\n' : '';

    const readStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            saveDoc();
            break;
          }

          const text = new TextDecoder().decode(value);
          content += text;

          if (editorRef.current) {
            const formattedContent = content.replace(/\r?\n/g, '<br>');
            editorRef.current.setContent(formattedContent);
          }
        }
      } finally {
        // Cleanup logic here
        if (body.template_id === "document-intro") {
          setIntroduction(content);
        } else if (body.template_id === "document-outline") {
          setOutline(content);
        } else {
          setConclusion(content);
        }

        toast.dismiss(loadingId);
        setOpenLeft(false);
        setOpenRight(false);
        setIsLoading(false);
      }
    };

    // Start reading the stream
    readStream();
  };

  useEffect(() => {
    return () => {
      toast.dismiss(loadingId);
      controller.abort(); // Abort the fetch request when the component unmounts
    };
  }, []);

  const handleFeaturesCall = async (type) => {
    const editor = editorRef.current;
    loadingId = toast.loading("Loading...");
    setIsLoading(true)

    if (editor) {
      const selectedText = editor.selection.getContent();
      const rewriteBody = {
        "template_id": "document-rewritetext",
        "form_fields": {
          "content": selectedText,
          "tone": watch('tone'),
        }
      }

      const subHeadingBody = {
        "template_id": "document-subheading",
        "form_fields": {
          "title": watch('title'),
          "subheading": selectedText,
          "tone": watch('tone')
        }
      }

      const extendTextBody = {
        "template_id": "document-extendtext",
        "form_fields": {
          "content": selectedText
        }
      }

      if (selectedText) {
        try {
          // Make an asynchronous API call to fetch streaming content
          const response = await fetch(`${BASE_URL}/output/generate-stream`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth?.token}`,
            },
            body: type === "rewrite" ? JSON.stringify(rewriteBody) : type === "subheading" ?
              JSON.stringify(subHeadingBody) : JSON.stringify(extendTextBody),
          });

          // Check if the response is OK before processing the streaming content
          if (response.ok) {
            const reader = response.body.getReader();


            // Function to continuously read chunks of data from the stream
            if (type === "subheading") {
              editor.selection.setContent(selectedText + '<br />');
            }
            // if (type === "extendtext") {
            //   editor.selection.setContent(selectedText + '');
            // }
            const readStream = async () => {
              while (true) {
                const { done, value } = await reader.read();

                if (done) {
                  toast.dismiss(loadingId);
                  setIsLoading(false)
                  saveDoc()
                  break;
                }

                const text = new TextDecoder().decode(value);
                editor.selection.setContent(text);
              }
            };

            // Start reading the stream
            readStream();

          } else {
            // Handle the case when the API request is not successful
            console.error('Failed to fetch streaming content:', response.statusText);
          }
        } catch (error) {
          // Handle any other errors that may occur during the API call
          console.error('Error fetching streaming content:', error);
        }
      }
    }
  };

  const [documentId, setDocumentId] = useState("");
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);
  const { state } = useLocation()

  const saveDoc = () => {
    const currentContent = editorRef.current.getContent();
    console.log(watch('title'))
    // Create or update the document
    if (state?.id || documentId) {

      // Update the existing document in Firestore
      const docRef = doc(db, "userDocs", state?.id || documentId);
      updateDoc(docRef, {
        userId: auth?.user?._id,
        rich_text: currentContent,
        title: watch('title') || "",
        audience: watch('audience') || "",
        tone: watch('tone') || '',
        kw: watch('kw') || "",
        updatedAt: new Date(),
      })
        .then((docRef) => {

          console.log("Document updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
    }
    else if (!state?.id && !documentId && !isCreatingDocument) {
      {
        setIsCreatingDocument(true);
        // Create a new document in Firestore
        addDoc(collection(db, "userDocs"), {
          userId: auth?.user?._id,
          rich_text: currentContent,
          image: "",
          title: watch('title') || "",
          audience: watch('audience') || "",
          tone: watch('tone') || '',
          kw: watch('kw') || "",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
          .then((docRef) => {
            console.log("New document created successfully!");
            if (docRef.id) {
              setDocumentId(docRef.id);

            }
            setIsCreatingDocument(false);
          })
          .catch((error) => {
            setIsCreatingDocument(false);
            console.error("Error creating document:", error);
          });
      }
    }
  };


  return (
    <main className=" overflow-hidden flex flex-col max-h-screen max-w-screen relative">
      <Steps
        enabled={startTour}
        steps={steps}
        initialStep={0}
        onBeforeExit={() => setStartTour(false)}
        onExit={() => setStartTour(false)}
      />
      <EditorHeader
        setRightView={setRightView}
        rightView={rightView}
        blogTitle={blogTitle}
        clickTour={() => setStartTour(!startTour)}
      />
      <div class="flex max-h-screen max-w-screen pt-[60px]">
        {/* Left Pane  */}
        <LeftPane
          bussId={bussId}
          handleBussId={handleBussId}
          fetchIntroduction={() => fetchContent(introBody)}
          fetchOutline={() => fetchContent(outlineBody)}
          fetchConclusion={() => fetchContent(conclusionBody)}
          isLoading={isLoading}
          outline={outline}

          introduction={introduction}
          conclusion={conclusion}
          formFuncs={{
            register,
            handleSubmit,
            control,
            getValues,
            watch,
            errors,
          }}
          className={"hidden lg:block"}
        />

        <EditorPane
          introduction={introduction}
          outline={outline}
          conclusion={conclusion}
          blogTitle={blogTitle}
          // submitDocument={submitDocument}
          handleFeaturesCall={handleFeaturesCall}
          isLoading={isLoading}
          saveDoc={saveDoc}
          editorRef={editorRef}
          docId={docId}
          formValues={valuesOfForm}
          bussId={bussId}
        />
        <RightPane
          rightView={rightView}
          setRightView={setRightView}
          className={"hidden lg:block overflow-y-auto"}
        />

        {/* DRAWERS FOR MOBILE VIEW    */}

        <div className="block lg:hidden">
          <Drawer
            open={openRight}
            onClose={(prev) => setOpenRight(!prev)}
            direction="right"
            className="!overflow-y-auto"
            style={{ height: "100%", width: "75%" }}
          >
            <RightPane
              setRightView={setRightView}
              rightView={rightView}
              className="!w-full overflow-y-auto"
            />
          </Drawer>
        </div>

        <div
          onClick={toggleLeftPane}
          className="block lg:hidden bg-primary rounded-full p-3.5  fixed shadow-xl cursor-pointer bottom-4 left-3 z-50"
        >
          <BiLeftIndent className="text-white text-[23px]" />
        </div>

        <div
          onClick={toggleRightPane}
          className="block lg:hidden bg-primary rounded-full p-3.5 fixed shadow-xl cursor-pointer bottom-4 right-3 z-50"
        >
          <BsBoxArrowInUpRight className="text-white text-[23px]" />
        </div>
      </div>
      {window.innerWidth <= 1025 && (
        <Drawer
          open={openLeft}
          onClose={(prev) => setOpenLeft(!prev)}
          direction="left"
          className="!overflow-y-auto"
          style={{ height: "100%", width: "75%" }}
        >
          <LeftPane
            bussId={bussId}
            handleBussId={handleBussId}
            fetchIntroduction={() => fetchContent(introBody)}
            fetchOutline={() => fetchContent(outlineBody)}
            fetchConclusion={() => fetchContent(conclusionBody)}

            isLoading={isLoading}
            outline={outline}
            introduction={introduction}
            conclusion={conclusion}
            formFuncs={{
              register,
              handleSubmit,
              control,
              getValues,
              watch,
              errors,
            }}
            className={"!w-full block lg:hidden"}
          />
        </Drawer>
      )}
    </main>
  );
};

export default DocumentEditor;
