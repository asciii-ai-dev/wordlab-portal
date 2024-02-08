import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdArrowBack, MdDeleteOutline, MdLoop } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";
import CommonModal from "../../components/Common/CommonModal";
import ChatBot from "../../assets/images/Ai-powered-chat.png";
import {
  useClearChatMutation,
  useGetChatQuery,
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

const Chat = ({setRightView}) => {
  const [open, setOpen] = useState(false);
  const [msgStats, setMsgStats] = useState({ receivedMsgs: 0, totalMsgs: 0 });
  const [page, setPage] = useState(1);
  const [conversation, setConversation] = useState([]);
  const [inputHeight, setInputHeight] = useState("2.5rem"); // Initial height
  const [googleSearch, setGoogleSearch] = useState(false);
  const [liveSiteSearch, setLiveSiteSearch] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [urls, setUrls] = useState([]);
  const { register, handleSubmit, resetField } = useForm();
  const chatContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedCC, setSelectedCC] = useState("US");
  const countryCodes = [
    { country: "USA", code: "US" },
    { country: "UK", code: "GB" },
    { country: "New Zealand", code: "NZ" },
    { country: "Australia", code: "AU" },
    { country: "Belgium", code: "BE" },
    { country: "Brazil", code: "BR" },
    { country: "Germany", code: "DE" },
    { country: "Hong Kong", code: "HK" },
    { country: "India", code: "IN" },
  ];
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
  };

  /// APIS
  const [postMessage, { isLoading: isNormalMsgLoading }] =
    useNormalConverseMutation();
  const [postGoogleMessage, { isLoading: isGoogleLoading, error }] =
    useGoogleSearchMutation();
  const [postLiveSiteMessage, { isLoading: isLiveSiteLoading }] =
    useLiveContextMutation();

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
  const isLoading = isNormalMsgLoading || isGoogleLoading || isLiveSiteLoading;

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

  const sendMessage = async ({ msg }) => {
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
      if (!googleSearch && !liveSiteSearch) {
        const context = conversation.map(
          ({ sources, _id, isNewResponse, ...rest }) => rest
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
      } else {
        result = await postLiveSiteMessage({
          question: newMessage,
          urls,
        });
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
  return (
    <div
      data-aos="fade-in"
      className={`flex justify-between flex-col text-center w-full overflow-hidden bg-base-100`}
      style={{ height: "100%" }}
    >
      <div className="h-10 sticky bg-base-100 z-40 shadow-md top-0 px-4 py-6 flex justify-between items-center">
        <MdArrowBack
          onClick={() => setRightView("templates")}
          className="text-base-content text-[18px] cursor-pointer"
        />
        <div className="">
          <h1 className="text-[13px] font-[600]">Chat</h1>
        </div>
        <div />
      </div>

      <div className="bg-base-100 flex flex-col justify-between h-full overflow-hidden">
        <div className="flex justify-between  items-center">
          <h1 className="text-base-content text-[19px] font-[500] p-5">
            Wordlab Chat
          </h1>
          <button
            disabled={isLoading}
            onClick={deleteChatData}
            className="md:mr-3 mr-1 cursor-pointer"
          >
            <MdDeleteOutline className="text-red-500 active:text-red-400 text-[22px] " />
          </button>
        </div>
        <div
        ref={chatContainerRef}
        id="scrollableDiv"
        onScroll={handleScroll}
        className="flex-1 px-5 relative  pb-5 h-full "
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
            {showScrollButton && (
              <div
                className="bg-base-300 flex p-2 w-10 h-10 rounded-full items-center -p-4 cursor-pointer justify-center shadow-lg text-base-content  fixed bottom-36 right-2 md:right-6 z-50"
                onClick={handleScrollDown}
              >
                <ArrowDownIcon className="w-[16px] h-6 text-bold text-base-content" />
              </div>
            )}
            <div className="flex relative flex-col gap-y-6">
              {conversation.length
                ? conversation?.map((v, i) =>
                    v?.role == "user" ? (
                      <div key={v?.id || i} className="chat chat-end pt-5">
                        <div className="chat-bubble  shadow bg-primary text-[12px] text-left  ">
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
                            <div className="flex justify-end gap-x-2">
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
                <div className="mt-6 w-full flex justify-center fixed bottom-36 md:-right-10 ">
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

        <div className="">
          <div className=" b-sheet bg-base-100 gap-y-1 flex-col flex justify-center h-fit pt-5 pb-3  px-4">
            <div className="bg-base-200 rounded-lg shadow-sm flex items-center h-fit w-full  px-3 py-2">
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
              <button disabled={isLoading} onClick={handleSubmit(sendMessage)}>
                <AiOutlineArrowRight className="text-primary text-[23px] cursor-pointer ml-2" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mx-2">
              <div className="form-control flex flex-row">
                <label className="cursor-pointer label gap-x-2">
                  <span className="label-text text-base-content font-[500] text-[10px]">
                    Google Search
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-xs toggle-success	"
                    checked={googleSearch}
                    onChange={() => {
                      setGoogleSearch(!googleSearch);
                      setLiveSiteSearch(false);
                    }}
                  />
                </label>
                {
                ["Pro", "Standard"].includes(userData?.plan_info?.name) &&
                <label className="cursor-pointer label gap-x-2">
                <span className="label-text text-base-content font-[500] text-[10px]">
                  Live Site Search
                </span>
                <input
                  // onClick={handleVisible}
                  type="checkbox"
                  className="toggle toggle-xs toggle-success	"
                  checked={liveSiteSearch}
                  onChange={handleLiveSiteSearch}
                />
              </label>
              }
              </div>
              <div>
                <div className="dropdown dropdown-top dropdown-end ">
                  <label
                    tabIndex={0}
                    className="text-xs font-semibold cursor-pointer"
                  >
                    {"CC: "}{" "}
                    <span className="text-green-500">{selectedCC}</span>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {countryCodes.map((code, index) => (
                      <li key={index}>
                        <a onClick={() => setSelectedCC(code?.code)}>
                          {code?.country}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommonModal
          className="!w-[100%] !h-[80%] p-0 pb-2 md:pb-0  "
          title="Live Site Search"
          btnText="Continue"
          handleOpen={() => {
            setUrls([]);
            handleVisible();
            setLiveSiteSearch(!liveSiteSearch);
          }}
          onClick={handleVisible}
          open={open}
          headerClass="border-b border-[#091E4224] py-4 px-5"
          actionsClass="p-5"
          smallScreenActions={false}
        >
          <div className="px-5  space-y-4">
            <p className="text-[12px] md:text-[13px] pt-4 font-[400] text-light">
              Please provide the URLs from which you would like me to source the
              content. This will allow me to gather the information
              professionally and assist you effectively.
            </p>
            <TagsInput
              className="bg-base-300 bg-opacity-60 p-2 text-base-content rounded-xl"
              value={urls}
              onChange={handleUrls}
              onlyUnique
              inputProps={{
                placeholder: "Enter URL",
                className: "react-tagsinput-input w-fit",
              }}
              placeholder="Hello"
            />
          </div>
        </CommonModal>
      </div>
    </div>
  );
};

export default Chat;
