import React, { useState } from "react";
import TemplateOutput from "../../assets/images/Output-idle.png";
import RecentOutput from "./RecentOutput";
import ContentActions from "./ContentActions";
import CommonModal from "../Common/CommonModal";
import FeedbackForm from "./FeedbackForm";
import { useRecentOutputsQuery } from "../../features/templates/templateApi";
import { formatNumberedText } from "../../utils/helpers/formatText";
import Loader from "../../utils/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      wrapLines={true}
      showLineNumbers={true}
      language={match[1]}
      style={a11yDark}
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default function OutputTemplate({
  outputContent,
  template_id,
  formValues,
  output_ref,
  generateLoading,
  pageContent,
}) {
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [outputTab, setOutputTab] = useState("outputs");
  const activeClass = `text-[#0C66E4] text-[14px] font-[600]`;
  const [thumbsUp, setThumbsUp] = useState();
  const [translatedOutput, setTranslatedOutput] = useState(null);
  // Recent outputs api
  const { data, isLoading, error, refetch } = useRecentOutputsQuery(
    {
      limit: 5,
      template_id: template_id || "",
    },
    {
      enabled: !!template_id, // If 'template_id' is present, enable the query
    }
  );

  // React.useEffect(() => {
  //   refetch();
  // }, [outputContent]);

  const isMarkdown = (text) => {
    // You can use a regular expression to detect Markdown content here
    // For simplicity, let's assume any text starting with '|' is considered Markdown
    if (text?.length) {
      return text.trim().startsWith("|");
    }
  };

  const handleFeedBack = () => setShowFeedBack(!showFeedBack);
  // const isMarkdownText = isMarkdown(outputContent);
  const formattedText = outputContent ? formatNumberedText(outputContent) : "";
  const customComponents = {
    code: CodeBlock,
  };

  return (
    <div className={`flex flex-col h-full ${pageContent?.length && "pb-20"}`}>
      <div className="md:hidden">
        <CommonModal
          handleOpen={handleFeedBack}
          open={showFeedBack}
          className=" !w-[80%] !h-fit !max-w-lg p-0 pb-2 md:pb-0  "
          title="Please share your feedback"
          headerClass="border-b border-[#091E4224] py-4 px-5"
          headerText="Your feedback will help us improve your experience!"
        >
          <FeedbackForm
            output_ref={output_ref}
            recents={data}
            thumbsUp={thumbsUp}
            formValues={formValues}
            handleFeedBack={handleFeedBack}
          />
        </CommonModal>
      </div>

      {/* Tabs Buttons */}
      <div>
        <div className="flex gap-x-3">
          <div
            onClick={() => setOutputTab("outputs")}
            className="w-fit cursor-pointer duration-200  space-y-0.5"
          >
            <h4
              className={`${
                outputTab === "outputs"
                  ? activeClass
                  : "text-base-content text-[14px] font-[500]"
              } `}
            >
              Output
            </h4>
            {outputTab === "outputs" && (
              <div className="w-full h-0.5 bg-[#0C66E4]"></div>
            )}
          </div>
          <div
            onClick={() => setOutputTab("recent_outputs")}
            className="w-fit cursor-pointer duration-200  space-y-0.5"
          >
            <h4
              className={`${
                outputTab === "recent_outputs"
                  ? activeClass
                  : "text-base-content text-[14px] font-[500]"
              } `}
            >
              Recent Outputs
            </h4>
            {outputTab === "recent_outputs" && (
              <div className="w-full h-0.5 bg-[#0C66E4]"></div>
            )}
          </div>
        </div>
        <div className="h-[2px] bg-[#091E4224] w-full mt-0.5" />
      </div>

      {/* Output Tab */}
      <div className="flex-grow h-full overflow-y-auto scrollbar-hide">
        {outputTab === "outputs" &&
          (!outputContent && !generateLoading && !pageContent?.length > 0 ? (
            <div className="flex flex-col items-center py-10 sm:py-5 justify-center h-full">
              <img
                src={TemplateOutput}
                alt="template_output"
                width={240}
                height={240}
              />
              <p className="text-base-content text-[19px] font-[500]  text-center pt-14">
                Fill the form to see the magic!
              </p>
            </div>
          ) : generateLoading ? (
            <div className="w-full flex items-center justify-center h-full md:pb-10">
              <Loader type="threeDots" color="#096BDE" w={80} h={80} />
            </div>
          ) : pageContent?.length ? (
            pageContent?.map((page, i) => (
              <div key={i}>
                <div className="mt-4 w-full h-full  overflow-y-auto scrollbar-hide">
                  <div
                    style={{ wordWrap: "break-word" }}
                    className="md-table text-[13.5px] text-light font-[500] leading-6 whitespace-pre-wrap"
                  >
                    <ContentActions
                      handleFeedBack={handleFeedBack}
                      setThumbsUp={setThumbsUp}
                      showFeedBack={showFeedBack}
                      content={page?.content}
                    />
                    <h6 className="pb-2">{page?.title}</h6>
                    {page?.content}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="my-5 relative">
              <ContentActions
                handleFeedBack={handleFeedBack}
                thumbs={true}
                setThumbsUp={setThumbsUp}
                showFeedBack={showFeedBack}
                content={outputContent}
                setTranslatedOutput={setTranslatedOutput}
              />
              <div></div>
              <div className="mt-4 w-full h-full pb-20 overflow-y-auto scrollbar-hide">
                <div
                  style={{ wordWrap: "break-word" }}
                  className="md-table text-[13.5px] text-light font-[500] leading-6 whitespace-pre-wrap"
                >
                  <ReactMarkdown
                    components={customComponents}
                    remarkPlugins={[remarkGfm]}
                  >
                    {translatedOutput ? translatedOutput : outputContent || ""}
                  </ReactMarkdown>
                </div>
              </div>
              {showFeedBack && (
                <div
                  data-aos="fade-up"
                  className="bg-white hidden md:block shadow-lg fixed z-50 top-16 right-36 h-fit"
                >
                  <FeedbackForm
                    output_ref={output_ref}
                    thumbsUp={thumbsUp}
                    formValues={formValues}
                    handleFeedBack={handleFeedBack}
                    header={true}
                  />
                </div>
              )}
            </div>
          ))}
        {outputTab === "recent_outputs" && (
          <div className="mt-8 mb-24 gap-y-4 relative">
            {isLoading ? (
              <h5>Loading...</h5>
            ) : !data?.data ? (
              <h5>No Recents Found!</h5>
            ) : (
              data?.data?.map((v) => (
                <RecentOutput
                  key={v?._id}
                  handleFeedBack={handleFeedBack}
                  showFeedBack={showFeedBack}
                  output_text={v?.output_text}
                  formatNumberedText={formatNumberedText}
                  createdAt={v?.created_at}
                  customComponents={customComponents}
                />
              ))
            )}

            {showFeedBack && (
              <div
                data-aos="fade-up"
                className="bg-white hidden md:block shadow-lg fixed  top-16 right-36 h-fit"
              >
                <FeedbackForm handleFeedBack={handleFeedBack} header={true} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
