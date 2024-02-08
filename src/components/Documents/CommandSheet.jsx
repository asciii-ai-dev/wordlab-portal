import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdArrowBack, MdLoop } from "react-icons/md";
import NoteTaking from "../../assets/images/note_taking.png";
import { RiFileCopyLine } from "react-icons/ri";
import { useTemplateOutputMutation } from "../../features/templates/templateApi";
import Loader from "../../utils/Loader";
import { toast } from "react-hot-toast";
import useClipboard from "react-use-clipboard";
import { formatNumberedText } from "../../utils/helpers/formatText";

const CommandSheet = ({ setRightView }) => {
  const [msg, setMsg] = useState(false);
  const [command, setCommand] = useState("");
  const [isCopied, setCopied] = useClipboard(msg);

  const handleCopied = () => {
    if (!isCopied) {
      setCopied();
      toast("Copied To Clipboard", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#096BDE"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6  text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
      });
    }
  };

  const [generateOutput, { isLoading, data }] = useTemplateOutputMutation();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        fetchCommand();
      }
    };

   command?.length > 0 ?  document.addEventListener("keydown", handleKeyPress) : null;

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [command]);

  const fetchCommand = async () => {
    try {
      const response = await generateOutput({
        template_id: "commands",
        form_fields: {
          context: "",
          command,
        },
      });
      if (response?.data?.message) {
        const formatedMsg = formatNumberedText(response?.data?.payload?.data)
        setMsg(formatedMsg);
      } else {
        toast.error(response?.error?.data?.message);
        setMsg("");
      }
    } catch (error) {
      toast.error("An Error Occured");
      setMsg("");
    }
  };
  return (
    <div
      data-aos="fade-in"
      className={`flex justify-between flex-col text-center w-full overflow-hidden bg-base-200 bg-opacity-40`}
      style={{ height: "100%" }}
    >
      <div className="h-10 sticky bg-base-100 z-40 shadow-md top-0 px-4 py-6 flex justify-between items-center">
        <MdArrowBack
          onClick={() => setRightView("templates")}
          className="text-base-content text-[18px] cursor-pointer"
        />
        <div className="">
          <h1 className="text-[13px] font-[600]">Commands</h1>
        </div>
        <div />
      </div>

      <div
        className={`pt-9 pb-5 flex-1 overflow-y-auto px-4 flex flex-col items-center ${
          !msg && "justify-center"
        }`}
      >
        {msg && !isLoading && (
          <div className="bg-[#F6F9FD] p-5 shadow rounded-[4px]  overflow-x-auto">
            <div className="flex justify-end gap-x-2">
              <MdLoop
                onClick={fetchCommand}
                className="cursor-pointer text-primary text-[17px]"
              />
              <RiFileCopyLine
                onClick={handleCopied}
                className="cursor-pointer text-primary text-[17px]"
              />
            </div>
            <p className="text-dark font-[300] text-[11.5px] pt-4 text-justify">
              {msg}
            </p>
          </div>
        )}
        {!msg && !isLoading && (
          <div className="flex flex-col gap-y-8 justify-center items-center">
            <img
              width={200}
              height={200}
              src={NoteTaking}
              className="object-contain"
              alt="note_taking"
            />
            <p className="text-[#88909B] text-center font-[400] text-[11px]">
            Give commands to generate any desired output.
            </p>
          </div>
        )}
        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <Loader type="threeCircles" color="#096BDE" h={60} w={60} />
          </div>
        )}
      </div>

      <div className="b-sheet-foot bg-base-100 flex items-center justify-center  h-fit py-5  px-4">
        <div className="bg-base-200 rounded-lg shadow-sm flex justify-between items-center px-3 w-full h-10 ">
          <input
            type="text"
            className="text-[11px] outline-none w-full h-full bg-inherit"
            placeholder="Write here what you want to ask"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button
            onClick={fetchCommand}
            disabled={!command || isLoading ? true : false}
          >
            <AiOutlineArrowRight
              className={`text-primary text-[23px] ${
                command ? "cursor-pointer" : "cursor-disable"
              }  `}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandSheet;
