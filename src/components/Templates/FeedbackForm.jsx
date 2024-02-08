import React, { useEffect, useState } from "react";
import { rateEmojiData } from "../../utils/data/feedbackForm";
import FormInput from "../Common/FormInput";
import ButtonCommon from "../Common/Button";
import { RxCross2 } from "react-icons/rx";
import { useVotingFeedbackMutation } from "../../features/templates/templateApi";
import { toast } from "react-hot-toast";
import Loader from "../../utils/Loader";

const FeedbackForm = ({
  handleFeedBack,
  showFeedBack,
  header,
  formValues,
  thumbsUp,
  output_ref
}) => {
  const [aboutExp, setAboutExp] = useState("");
  const [exp, setExp] = useState("");
  const [rating, setRating] = useState("");


  
  const handleRatingSelect = (val) => {
    if (rating === val) {
      setRating("");
    } else {
      setRating(val);
    }
  };

  const handleExpSelect = (val) => {
    if (exp === val) {
      setExp("");
    } else {
      setExp(val);
    }
  };

  const handleAboutExp = (e) => {
    setAboutExp(e.target.value);
  };

  const [sendFeedback, { isLoading, data, error }] =
    useVotingFeedbackMutation();


  const handleSubmitFeedBack = async () => {
   
    const loadingId = toast.loading("Loading...");
    try {
      const res = await sendFeedback({
        thumbs_up: thumbsUp,
        output_ref: output_ref || "",
        form_fields: formValues,
        extra_info: {
          rating,
          experience: exp,
          about_experience: aboutExp,
        },
      });
      if (res?.data) {
        toast.success(res?.data?.message, {
          id: loadingId,
        });
      } else {
        toast.error(res?.error?.data?.message, {
          id: loadingId,
        });
      }
    } catch (error) {
      toast.error("An Error Occured", {
        id: loadingId,
      });
    } finally {
      handleFeedBack();
    }
  };

  return (
    <div className="p-5 relative z-50 bg-base-200 ">
      <div className="space-y-7">
        {header && (
          <div>
            <div className="flex justify-between items-center">
              <p className="text-[15px] md:text-[15px] text-base-content font-[500]">
                Please share your feedback?
              </p>
              <RxCross2
                onClick={handleFeedBack}
                className="text-md md:text-lg cursor-pointer"
              />
            </div>

            <p className="pt-1 text-light text-[12px] w-[210px] ">
              Your feedback will help us improve your experience!
            </p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-base-content text-[12px] leading-4 font-[500]">
            How would you rate this output?
          </p>

          <div className="flex flex-wrap items-center gap-x-2 justify-between">
            {rateEmojiData.map((v, i) => (
              <div
                className={`${
                  rating === v?.value ? "bg-[#D9E8F9]" : "bg-[#F9F9F9]"
                }  hover:bg-[#D9E8F9]  cursor-pointer rounded shadow-sm p-3`}
                key={i}
                onClick={() => handleRatingSelect(v?.value)}
              >
                <p className="text-[15px] sm:text-[18px]">{v?.emoji}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-base-content text-[12px] leading-4 font-[500]">
            My overall experience using ASCIII was
          </p>
          <div className="btn-group !outline-none flex items-center justify-center btn-group-horizontal">
            <button
              onClick={() => handleExpSelect("Good")}
              className={`btn ${
                exp === "Good" ? "bg-[#D9E8F9]" : "bg-[#f9f9f9]"
              } hover:bg-[#D9E8F9] border hover:border-[#dee1e4] border-[#dee1e4] bg-[#f9f9f9] font-[400] capitalize  w-[80px] text-dark text-[11px]`}
            >
              Good
            </button>
            <button
              onClick={() => handleExpSelect("Bad")}
              className={`btn ${
                exp === "Bad" ? "bg-[#D9E8F9]" : "bg-[#f9f9f9]"
              } hover:bg-[#D9E8F9] border hover:border-[#dee1e4] bg-[#f9f9f9] border-[#dee1e4] font-[400] capitalize w-[80px] text-dark text-[11px]`}
            >
              Bad
            </button>
          </div>
          <div className="space-y-3">
            <p className="text-base-content text-[12px] leading-4 font-[500]">
              Tell us about your experience
            </p>
            <FormInput
              type="textarea"
              placeholder="Tell us something we can do to further improve your experience"
              value={aboutExp}
              onChange={handleAboutExp}
              // title="Tell us about your experience"
            />
          </div>
          <div>
            <ButtonCommon
              onClick={handleSubmitFeedBack}
              title={
                isLoading ? (
                  <Loader type="bars" w={20} h={15} />
                ) : (
                  "Send Feedback"
                )
              }
              className="py-3"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
