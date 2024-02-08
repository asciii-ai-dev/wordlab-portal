import { useState } from "react";
import TemplateCtaImage from "../../assets/images/template-cta.png";
import ButtonCommon from "../Common/Button";
import FeedbackForm from "../Common/FeedbackForm";
import useFeedbackForm from "../../utils/helpers/feedbackHook";
import { useSelector } from "react-redux";

export default function TemplateCta({onClick}) {
  const [handleVisible] = useFeedbackForm()
  return (
    <>
    <div className="card lg:card-side bg-base-100 shadow-xl flex flex-wrap">
      <div className="card-body bg-primary justify-center items-center md:items-start w-full lg:w-[50%] overflow-hidden rounded-[15px] lg:!rounded-tl-[15px] lg:!rounded-bl-[15px] lg:!rounded-tr-[0px] lg:!rounded-br-[0px]   md:!rounded-b-[0px]">
        <div className="flex flex-col space-y-6 w-[100%] lg:w-[80%] items-center md:items-start ">
          <h4 className="text-white text-[18px] sm:text-[20px] font-[400]">
            Can't find your favorite template?
          </h4>
          <p className="text-white text-[12px] sm:text-[15px] font-[300] md:text-left text-center">
            Don't see a template for your use case? No problem. Let us know and
            we will do our best to make it available very soon.{" "}
          </p>
          <ButtonCommon
            className="bg-white !text-primary py-2 !w-[200px] !text-[16px]"
            title="Let us know!"
            onClick={() => handleVisible("Feature Request")}
          />
        </div>
      </div>
      <figure className="!hidden md:!block w-full lg:w-[50%]">
        <img src={TemplateCtaImage} className="h-full w-full object-cover" />
      </figure>
    </div>

    </>
  );
}
