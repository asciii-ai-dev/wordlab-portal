import React from "react";
import BusinessLandingImage from "../../assets/images/Wordlab-business.png";
import ButtonCommon from "../Common/Button";

const BusinessLanding = ({handleVisible, icon}) => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center space-y-6">
      <div className="space-y-6 w-full md:w-[70%] flex flex-col items-center justify-center">
      <img
        src={BusinessLandingImage}
        alt="business_landing"
        className="w-[350px]  object-contain"
      />
      <p className="text-base-content font-[500] text-[20px]">Grow with Wordlab Business</p>
      <p className="text-[14px] font-[400] text-center text-light">
      Make AI write content in your own brand’s style with domain-specific knowledge. No more generic content and edits to add factual information about your product or services.
      </p>
      <ButtonCommon onClick={handleVisible} iconRight={icon} title="Register"  className="w-full md:w-[350px] text-[25px]"/>
      </div>
    </div>
  );
};

export default BusinessLanding;
