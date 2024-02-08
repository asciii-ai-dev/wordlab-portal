import React from "react";
import { toast } from "react-hot-toast";
import { MdLoop } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";
import Loader from "../../utils/Loader";

const ContentModal = ({ content, regenerate, isLoading }) => {
  const refetchOutline = async () => {
    await regenerate(false);
  }
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content?.data)
      .then(() => {
        toast.success("Editor content copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy editor content to clipboard");
        console.log(error, " copy error");
      });
  };

  return (
    <div className="m-6 bg-red- h-full">
      <div className="grid gap-5">
        <div className="flex justify-end gap-x-2">
          <MdLoop
            onClick={() => refetchOutline()}
            className="cursor-pointer text-primary text-[17px]"
          />
          <RiFileCopyLine
            onClick={handleCopy}
            className="cursor-pointer text-primary text-[17px]"
          />
        </div>
        <p className="text-base-content text-[14px] font-[400] overflow-y-auto h-52">{isLoading ? 
        <div className=" h-full flex justify-center items-center">

          <Loader 
            h={50}
            w={50}
            color={"#096BDE"}
            type="threeCircles"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />


        </div> : content && content?.data}</p>
      </div>
    </div>
  );
};

export default ContentModal;
