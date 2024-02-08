import React from "react";
import { MdArrowBack } from "react-icons/md";
import { IoMdPaper } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { AiOutlineMacCommand } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Loader from "../../utils/Loader";

const EditorHeader = ({
  blogTitle,
  setRightView,
  rightView,
  isDocLoading,
  clickTour,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center fixed top-0 z-50   bg-base-100 w-full  border border-b-[#E9EAEB] py-3.5 px-6">
      <div className="flex gap-x-6">
        <div
          onClick={() => navigate(-1)}
          className="flex gap-x-2 items-center justify-center cursor-pointer"
        >
          <MdArrowBack className="text-light text-[20px] " />
          <p className="text-light text-[13px]">Back</p>
        </div>
        <input
          value={blogTitle}
          disabled={true}
          placeholder="Untitled Document"
          className="border-[#E9EAEB] border hidden md:block text-[12px]  py-1 outline-none px-1.5  min-w-40 max-w-50 rounded-[4px] "
        />
      </div>
      <div className="flex-grow  flex justify-center items-center gap-x-4">
        <div
          onClick={() => setRightView("templates")}
          data-tip="Templates"
          className={`tooltip tooltip-left selector9 ${
            rightView == "templates" ? "bg-primary" : "bg-[#DEE5EFB2]"
          } py-1.5 px-3 rounded-[4px] cursor-pointer`}
        >
          <IoMdPaper
            className={`${
              rightView == "templates" ? "!text-white" : "text-dark"
            } text-[18px]`}
          />
        </div>
        <div
          onClick={() => setRightView("chat")}
          data-tip="Chat"
          className={`tooltip tooltip-bottom selector10 ${
            rightView == "chat" ? "bg-primary" : "bg-[#DEE5EFB2]"
          } py-1.5 px-3 rounded-[4px] cursor-pointer`}
        >
          <HiOutlineChatBubbleLeftRight
            className={`${
              rightView == "chat" ? "!text-white" : "text-dark"
            } text-[18px]`}
          />
        </div>
        <div
          onClick={() => setRightView("commands")}
          data-tip="Command"
          className={`tooltip tooltip-right  selector11 ${
            rightView == "commands" ? "bg-primary" : "bg-[#DEE5EFB2]"
          } py-1.5 px-3 rounded-[4px] cursor-pointer`}
        >
          <AiOutlineMacCommand
            className={`${
              rightView == "commands" ? "!text-white" : "text-dark"
            } text-[18px]`}
          />
        </div>
      </div>

      <div className="flex gap-x-4">
        {/* <div className="flex gap-x-2 items-center">
          {isDocLoading ? (
            <Loader w={18} h={18} color="#88909B" type="threeCircles" />
          ) : (
            <TiTick className="text-green-600 text-[17px] mb-1 -mr-1 font-semibold" />
          )}

          <p className="text-base-content text-[13px] font-semibold">Saved!</p>
        </div> */}
        {/* <p className="text-light text-[13px] font-semibold">{0} Words</p> */}
        <button
          onClick={clickTour}
          className="hidden sm:block text-xs overflow-hidden bg-gradient-to-r from-blue-700 via-blue-500 to-blue-200 text-white py-1 px-4 rounded-md transition-transform hover:scale-105"
        >
          <span className="text-[14px] pr-3  left-4 top-1/2 transform -translate-y-1/2 animate-pulse">
            &#9733;
          </span>
          Get Tour of Editor
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
