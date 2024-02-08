import React, { useEffect } from "react";
import { RiFileCopyFill, RiFileCopyLine, RiTranslate } from "react-icons/ri";
import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";
import { handleCopy } from "../../utils/handleCopy";
import { languagesArray } from "../../utils/data/languages";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTemplateOutputMutation } from "../../features/templates/templateApi";

const ContentActions = ({
  content,
  handleFeedBack,
  thumbs,
  showFeedBack,
  setThumbsUp,
  setTranslatedOutput,
  
}) => {
  const [language, setLanguage] = useState(null);
  const handleThumbs = (val) => {
    if (!showFeedBack) {
      handleFeedBack();
      setThumbsUp(() => val);
    }
  };

  const [generateOutput, { isLoading }] = useTemplateOutputMutation();

  const submitTranslate = async () => {
    const loadingId = toast.loading("Translating ...");
    try {
      const response = await generateOutput({
        template_id: "translate",
        form_fields: { text: content, language, buss_id: "" },
      });
      if (response?.data?.message) {
        setTranslatedOutput(response.data?.payload?.data);
        toast.success("Translated Successfully!", { id: loadingId });
      } else {
        toast.error(response?.error?.data?.message || "Error", {
          id: loadingId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occured", { id: loadingId });
      // reset();
    }
  };

  useEffect(() => {
    if (language !== null) {
      submitTranslate();
    }
  }, [language]);

  const handleTranslate = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex gap-x-3 justify-end">
      {thumbs ? (
        <select
          disabled={isLoading}
          onChange={handleTranslate}
          value={language}
          className="select select-bordered  select-xs w-fit max-w-xs"
        >
          <option value={null} disabled selected>
            Select language
          </option>
          {languagesArray.map((lang) => (
            <option
              value={lang}
              className="!p-1.5 text-base-content"
              key={lang}
            >
              {lang}
            </option>
          ))}
        </select>
      ) : null}
      {thumbs && (
        <>
          <HiOutlineThumbDown
            onClick={() => handleThumbs(false)}
            className="cursor-pointer text-[#88909B]"
          />
          <HiOutlineThumbUp
            onClick={() => handleThumbs(true)}
            className="cursor-pointer text-[#88909B]"
          />
        </>
      )}

      <RiFileCopyLine
        onClick={() => handleCopy(content)}
        className="cursor-pointer text-[#88909B]"
      />
    </div>
  );
};

export default ContentActions;
