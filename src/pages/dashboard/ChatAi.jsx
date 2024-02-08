import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdDeleteOutline, MdLoop } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";
import ChatBot from "../../assets/images/Ai-powered-chat.png";
import {
  useChatWithImageMutation,
  useGoogleSearchMutation,
  useLiveContextMutation,
  useNormalConverseMutation,
} from "../../features/chat/chatApi";
import { RotatingLines } from "react-loader-spinner";
import { handleCopy } from "../../utils/handleCopy";
import TypingEffect from "../../utils/TypingEffect";
import TagsInput from "react-tagsinput";
import remarkGfm from "remark-gfm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeBlock from "../../components/Common/CodeBlock";
import { useForm } from "react-hook-form";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import Loader from "../../utils/Loader";
import ButtonCommon from "../../components/Common/Button";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import FormInput from "../../components/Common/FormInput";
import { useFetchUserPlanInfoQuery } from "../../features/templates/templateApi";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatFeature from "../../components/Common/ChatFeature";
import MagicWandImage from "../../assets/images/magic-wand-active.png";
import MagicWandWhite from "../../assets/images/magic-wand-white.png";
import { RxCross1 } from "react-icons/rx";
import CommonModal from "../../components/Common/CommonModal";

const ChatAi = () => {
  const [open, setOpen] = useState(false);
  const [msgStats, setMsgStats] = useState({ receivedMsgs: 0, totalMsgs: 0 });
  const [page, setPage] = useState(1);
  const [conversation, setConversation] = useState([]);
  const [inputHeight, setInputHeight] = useState("2.5rem"); // Initial height
  const [googleSearch, setGoogleSearch] = useState(false);
  const [liveSiteSearch, setLiveSiteSearch] = useState(false);
  const [isChatImage, setIsChatImage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [urls, setUrls] = useState([]);
  const { register, handleSubmit, resetField } = useForm();
  const chatContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isBsheet, setIsBsheet] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleBsheet = () => {
    setIsBsheet((prev) => !prev);
  };
  const [files, setFiles] = useState([]);
  const handleFileChange = (file) => {
    setFiles([...files, file[0]]);
  };
  console.log(files);

  const handleRemoveImg = (id) => {
    return setFiles(() => {
      return files?.filter((v) => v.lastModified !== id);
    });
  };

  const [selectedCC, setSelectedCC] = useState("US");

  const { data: userData } = useFetchUserPlanInfoQuery();

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (
      chatContainer.scrollTop <
      chatContainer.scrollHeight - chatContainer.clientHeight
    ) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const handleScrollDown = () => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
    setShowScrollButton(false);
  };

  const customComponents = {
    code: CodeBlock,
  };

  function handleUrls(url) {
    setUrls(url);
  }

  const handleTypingComplete = () => {
    setShowSource(true); // Set showDiv to true when typing is complete
  };

  const handleLiveSiteSearch = () => {
    if (!liveSiteSearch) {
      handleVisible();
    }
    setLiveSiteSearch(!liveSiteSearch);
    setGoogleSearch(false);
    setIsChatImage(false);
  };

  /// APIS
  const [postMessage, { isLoading: isNormalMsgLoading }] =
    useNormalConverseMutation();
  const [postGoogleMessage, { isLoading: isGoogleLoading, error }] =
    useGoogleSearchMutation();
  const [postLiveSiteMessage, { isLoading: isLiveSiteLoading }] =
    useLiveContextMutation();
  const [postChatImage, { isLoading: isChatImageLoading }] =
    useChatWithImageMutation();

  const { auth } = useSelector((state) => state);

  const controller = new AbortController();
  const signal = controller.signal;

  // Function to fetch chat data
  async function fetchChatData() {
    if (
      msgStats?.receivedMsgs !== 0 &&
      msgStats?.receivedMsgs >= msgStats?.totalMsgs
    )
      return;
    try {
      setIsFetching(true); // Set loading state to true
      const response = await fetch(
        `${BASE_URL}/chat/fetch?limit=${5}&step=${page}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          signal,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chat data");
      }
      const data = await response.json();
      setMsgStats((prev) => ({
        receivedMsgs: prev?.receivedMsgs + data?.payload.messages?.length,
        totalMsgs: data?.payload?.total_messages,
      }));
      setConversation([...data?.payload.messages, ...conversation] || []);
      setPage(page + 1);
    } catch (error) {
      console.log(error, " CHAT FETCH ERROR");
      // console.error(error?.message);
      return null;
    } finally {
      setIsFetching(false);
    }
  }

  // Function to delete chat data
  async function deleteChatData() {
    try {
      const loadingId = toast.loading("Loading..");
      const response = await fetch(`${BASE_URL}/chat/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setDeleteModal(false);
      if (response.ok) {
        setConversation([]);
        fetchChatData();
      }
      const data = await response.json();
      console.log(data);
      if (data?.success == true) {
        toast.success(data?.message, {
          id: loadingId,
        });
      } else {
        toast.error(data?.message, {
          id: loadingId,
        });
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  useEffect(() => {
    fetchChatData();
    () => {
      controller.abort();
    };
  }, []);

  // Loading State
  const isLoading =
    isNormalMsgLoading ||
    isGoogleLoading ||
    isLiveSiteLoading ||
    isChatImageLoading;

  const handleVisible = () => {
    if (!urls?.length) {
      setLiveSiteSearch(false);
    }
    setOpen((prev) => !prev);
  };
  const inputRef = useRef(null);

  const scrollToDown = () => {
    const chatContainer = chatContainerRef?.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isLoading == false) {
      if (!event.shiftKey) {
        event.preventDefault();
        handleSubmit(sendMessage)();
      }
    }
  };
  
  const messageTypes = ["live-site-search","image-search","google-search"]

  const sendMessage = async ({ msg }) => {
    if (isBsheet) setIsBsheet(() => false);
    if (googleSearch) setGoogleSearch(false);
    if (liveSiteSearch) setLiveSiteSearch(false);
    if (isChatImage) setIsChatImage(false);
    setConversation((prev) => [
      ...prev,
      {
        content: msg,
        role: "user",
      },
    ]);
    inputRef.current.style.height = "auto";

    try {
      const newMessage = msg;
      let result;
      resetField("msg");
      if (!googleSearch && !liveSiteSearch && !isChatImage) {
        const context = conversation.map(
          ({ sources, _id, isNewResponse, message_type, ...rest }) => rest
        );
        result = await postMessage({
          context,
          newMessage,
        });
      } else if (googleSearch) {
        result = await postGoogleMessage({
          query: newMessage,
          country_code: selectedCC,
        });
      } else if (liveSiteSearch) {
        result = await postLiveSiteMessage({
          question: newMessage,
          urls,
        });
      } else {
        const formData = new FormData();
        formData.append("question", newMessage);

        files.forEach((file, index) => {
          formData.append("images", file);
        });
        result = await postChatImage(formData);
      }
      if (result?.data?.payload) {
        setConversation((prev) => [
          ...prev,
          { ...result?.data?.payload?.message, isNewResponse: true },
        ]);
      }
      if (result?.error) {
        toast.error(result?.error?.data?.message || "");
      }
      // }
    } catch (error) {
      console.log(error.message, " ER");
      toast.error("ERROR OCCURED! ");
    }
  };

  const handleInput = (event) => {
    // Handle input value and adjust the textarea's height
    if (inputRef?.current) {
      inputRef.current.style.height = "auto"; // Reset height to auto to calculate new height
      inputRef.current.style.height = `${inputRef.current?.scrollHeight}px`;
    }
  };

  const { ref, ...rest } = register("msg", { required: true });

  const isFeatureChip = (type) => {
    if(messageTypes.includes(type)) return true;
    return false;
  }

  return (
    <div className="bg-base-100 relative min-w-screen flex flex-col justify-between h-full overflow-hidden">
      <div className="flex justify-between m-4 items-center">
        <h1 className="text-base-content text-[16px] sm:text-[19px] font-[500] ">
          Wordlab Chat
        </h1>
        <ButtonCommon
          title={"Clear Chat"}
          onClick={() => setDeleteModal(!deleteModal)}
          className="py-2 !text-[11px]  !w-fit !rounded-md  bg-white font-semibold !text-[#de2209b9]  border-[#de2209b9] hover:shadow-none border max-h-[40px]  shadow-none"
          iconLeft={
            <MdDeleteOutline className="text-[#de2209b9] text-[16px] font-semibold" />
          }
        />
      </div>

      <div
        ref={chatContainerRef}
        id="scrollableDiv"
        onScroll={handleScroll}
        className="flex-1 px-5 relative  pb-10 h-full "
        style={{
          height: 300,
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          scrollBehavior: "smooth",
        }}
      >
        <InfiniteScroll
          dataLength={msgStats?.receivedMsgs} //This is important field to render the next data
          next={fetchChatData}
          hasMore={msgStats?.receivedMsgs < msgStats?.totalMsgs}
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          inverse={true} //
          loader={
            <div className="flex justify-center items-center h-full">
              <Loader type="bars" color="#096BDE" h={38} w={38} />
            </div>
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: "center", fontSize: "12px" }}>
              <b>No more messages to load..</b>
            </p>
          }
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {isFetching && (
            <div className="flex justify-center items-center h-full">
              <Loader type="bars" color="#096BDE" h={40} w={40} />
            </div>
          )}
          <div
            className={`pt-9 pb-5 flex-1 flex flex-col  ${
              !conversation.length && "justify-center"
            }`}
          >
            {!conversation.length && !isFetching && (
              <div className="flex flex-col gap-y-6 justify-center overflow-y-scroll items-center">
                <img
                  src={ChatBot}
                  alt="ChatBot"
                  className="object-contain h-[300px] w-[300px]"
                />
                <h2 className="text-[18px] text-base-content font-[600]">
                  Ask Something!
                </h2>
                <p className="text-[#88909B] text-center font-[400] text-[11.5px]">
                  Ask a question, search the internet or extract information
                  from live websites.
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            {showScrollButton ? (
              <div
                className="bg-base-300 flex p-2 w-10 h-10 rounded-full items-center -p-4 cursor-pointer justify-center shadow-lg text-base-content  fixed bottom-28 right-2 md:right-6 z-30"
                onClick={handleScrollDown}
              >
                <ArrowDownIcon className="w-[16px] h-6 text-bold text-base-content" />
              </div>
            ) : null}
            <div className="flex relative flex-col gap-y-6">
              {conversation.length
                ? conversation?.map((v, i) =>
                    v?.role == "user" ? (
                      <div key={v?.id || i} className="chat chat-end pt-5">
                        
                        <div className="chat-bubble space-y-3 shadow bg-primary text-[12px] text-left  ">
                        <RiFileCopyLine
                                onClick={() => handleCopy(v?.content)}
                                className="cursor-pointer float-right   text-white text-[17px]"
                              />
                          <p className="text-white pt-4 leading-6 whitespace-pre-wrap">
                            {v.content || ""}
                          </p>
                        </div>
                      </div>
                    ) : (
                      v?.role == "assistant" && (
                        <div
                          key={v?.id || i}
                          className="chat md:max-w-[90%] chat-start"
                        >
                          <div className="chat-bubble py-3  shadow text-[12px] text-left bg-[#F6F9FD]">
                            <div
                              className={`flex ${
                                !isFeatureChip(v?.message_type)
                                  ? "justify-end"
                                  : "justify-between"
                              } gap-x-2`}
                            >
                              {isFeatureChip(v?.message_type) ? (
                                <div className="bg-primary flex flex-row-reverse gap-x-2 py-1 items-center px-1.5 rounded-md p-1.5">
                                  <p className="text-[10px] text-white">
                                    {v?.message_type === "google-search"
                                      ? "Google Search"
                                      : v?.message_type === "live-site-search"
                                      ? "Live Site Search"
                                      : "Image Search"}
                                  </p>
                                  <img
                                    src={MagicWandWhite}
                                    className="w-[13px] h-[13px] object-cover"
                                    alt="MagicWandWhite"
                                  />
                                </div>
                              ) : null}
                              {/* <MdLoop className="cursor-pointer text-primary text-[17px]" /> */}
                              <RiFileCopyLine
                                onClick={() => handleCopy(v?.content)}
                                className="cursor-pointer  text-primary text-[17px]"
                              />
                            </div>

                            {v?.content && (
                              <div className="text-dark text-xs pt-4 leading-6 whitespace-pre-wrap">
                                {v?.isNewResponse ? (
                                  <TypingEffect
                                    onComplete={handleTypingComplete}
                                    isNewResponse={v?.isNewResponse}
                                    text={v?.content}
                                  />
                                ) : (
                                  <ReactMarkdown
                                    components={customComponents}
                                    remarkPlugins={[remarkGfm]}
                                  >
                                    {v?.content || ""}
                                  </ReactMarkdown>
                                )}
                              </div>
                            )}
                            {v?.sources?.length > 0 ? (
                              <div className="bg-[#EFF5FA] space-y-2 mt-4 py-4 px-3 w-fit shadow rounded-md">
                                <p className="text-black font-[500] text-[18px] pl-1 ">
                                  Sources
                                </p>
                                <div className="pt-1">
                                  <ol className="space-y-1 ">
                                    {v?.sources &&
                                      v?.sources.map((src, j) => (
                                        <li key={src?._id}>
                                          <a
                                            target="_blank"
                                            // rel="noopener noreferrer"
                                            className="flex gap-x-3 mt-2 items-center "
                                            href={src?.urls}
                                          >
                                            <img
                                              src={src?.favicon}
                                              className="object-cover rounded-full w-[22px] h-[22px]"
                                              alt="source_fav"
                                            />
                                            <p className="md:text-[13px] mb-2 chat-link text-justify max-w-full text-primary underline font-semibold opacity-80 hover:underline hover:text-orange-300">
                                              {src?.titles}
                                              {src?.age && (
                                                <small className="text-gray-900 ml-2">
                                                  ({src?.age})
                                                </small>
                                              )}
                                            </p>
                                          </a>
                                        </li>
                                      ))}
                                  </ol>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )
                    )
                  )
                : null}
              {isLoading && (
                <div className="mt-6 w-full flex justify-center fixed bottom-32 md:-right-10 ">
                  <div className="flex items-center justify-center shadow-md bg-base-300 p-3">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="22"
                      visible={true}
                    />
                    <p className="text-center pl-2 text-base-content text-[13px]">
                      {" "}
                      Generating...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </InfiniteScroll>
      </div>
      <div className="absolute z-50 bottom-0 w-full">
        <div className=" b-sheet bg-base-100 rounded-t-3xl gap-y-1 flex-col smooth justify-center max-h-[350px] overflow-y-auto h-fit py-4  px-4">
          <div className="flex w-full gap-x-2 sm:gap-x-4 justify-between ">
            {!isBsheet ? (
              <button
                onClick={handleBsheet}
                className="bg-primary p-2 mt-.5 w-fit h-fit rounded-lg flex justify-center items-center shadow-lg"
              >
                <img
                  src={MagicWandImage}
                  className="w-[21px] h-[21px] object-contain"
                  alt="magic_wand"
                />
              </button>
            ) : (
              <button
                onClick={handleBsheet}
                className="bg-base-100 w-10 h-10   rounded-lg flex justify-center items-center shadow-lg"
              >
                <RxCross1 className="text-[12px] sm:text-[15px]" />
              </button>
            )}
            <div className=" relative bg-base-200 rounded-lg shadow-sm flex  h-fit w-full  px-3 pt-2">
              <textarea
                {...rest}
                name="msg"
                ref={(e) => {
                  ref(e);
                  inputRef.current = e; // you can still assign to ref
                }}
                className="text-[12px] overflow-y-auto outline-none max-h-[200px] flex-grow bg-transparent"
                placeholder="Write here what you want to ask"
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                style={{ height: inputHeight }}
              />
              <button
                className="bottom-2 right-3 absolute"
                disabled={isLoading}
                onClick={handleSubmit(sendMessage)}
              >
                {isLoading ? (
                  <Loader type={"threeDots"} color={"#096BDE"} h={30} w={30} />
                ) : (
                  <AiOutlineArrowRight className="text-primary text-[23px] cursor-pointer ml-2" />
                )}
              </button>
            </div>
          </div>
          <div
            className={`transition ease-in-out duration-300 ${
              isBsheet ? "flex flex-col gap-y-5 mt-4   " : "hidden"
            }`}
          >
            <ChatFeature
              actionType="cc"
              title="Country Code"
              setSelectedCC={setSelectedCC}
              value={selectedCC}
              descp="Pick the country code for your search."
            />
            <ChatFeature
              actionType="google"
              title="Google Search"
              descp="Browse the internet to collect the latest information."
              value={googleSearch}
              onChange={() => {
                setGoogleSearch(!googleSearch);
                setLiveSiteSearch(false);
                setIsChatImage(false);
              }}
            />
            <ChatFeature
              actionType="liveSearch"
              title="Live Site Search"
              descp="Extract and analyze information from any live webpage."
              value={liveSiteSearch}
              onChange={handleLiveSiteSearch}
              isPro={["Pro", "Standard"].includes(userData?.plan_info?.name)}
            />
            {liveSiteSearch &&
            ["Pro", "Standard"].includes(userData?.plan_info?.name) ? (
              <TagsInput
                className="bg-base-300 bg-opacity-60 px-2  text-base-content rounded-xl"
                value={urls}
                onChange={handleUrls}
                onlyUnique
                maxTags={3}
                inputProps={{
                  placeholder: "Enter URL",
                  className: "react-tagsinput-input w-fit",
                }}
                placeholder="Hello"
              />
            ) : null}
            <ChatFeature
              title="Chat with Image"
              actionType="chatImage"
              descp="Ask questions or extract information about images."
              handleFileChange={handleFileChange}
              handleRemoveImg={handleRemoveImg}
              isPro={["Pro"].includes(userData?.plan_info?.name)}
              images={files}
              value={isChatImage}
              onChange={() => {
                setIsChatImage(!isChatImage);
                setLiveSiteSearch(false);
                setGoogleSearch(false);
              }}
            />
          </div>
        </div>
      </div>
      <CommonModal
        title="Delete Chat"
        open={deleteModal}
        handleOpen={() => setDeleteModal(!deleteModal)}
        btnText="Delete"
        className="space-y-6 !h-fit !w-11/12"
        showActions={true}
        onClick={deleteChatData}
        btnClass="!bg-red-600"
        //  btnDisabled={isDe}
      >
        <p className="text-light text-xs sm:text-sm sm:pr-6 my-3">
          You are about to delete this chat context, it will be lost forever and
          you will be presented with a fresh new window for new chat.
        </p>
      </CommonModal>
    </div>
  );
};

export default ChatAi;
