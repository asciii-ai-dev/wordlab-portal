import React from "react";
import ContentActions from "./ContentActions";
import useClipboard from "react-use-clipboard";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useState } from "react";
import { handleCopy } from "../../utils/handleCopy";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const RecentOutput = ({
  output_text,
  handleFeedBack,
  showFeedBack,
  formatNumberedText,
  createdAt,
  customComponents,
}) => {
  const [seeMore, setSeeMore] = useState(false);
  let text = formatNumberedText(output_text);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center ">
        <p className="text-light text-[13px]">
          {createdAt && moment(createdAt).fromNow()}
        </p>
        <ContentActions
          handleFeedBack={handleFeedBack}
          thumbs={false}
          content={text}
        />
      </div>
      <div className="py-3">
        <p className="text-base-content text-[13px]">
          <ReactMarkdown
            components={customComponents}
            remarkPlugins={[remarkGfm]}
          >
            {!seeMore ? text.slice(0, 150) : text}
          </ReactMarkdown>
        </p>
      </div>
      <div className="flex justify-end">
        {text.length >= 150 && (
          <p
            onClick={() => setSeeMore(!seeMore)}
            className="text-primary text-[14px] underline font-[500] cursor-pointer"
          >
            See {!seeMore ? "More" : "Less"}
          </p>
        )}
      </div>
      <div className="w-full h-[0.5px] bg-[#ebe8e8] mt-4"></div>
    </div>
  );
};

export default RecentOutput;
