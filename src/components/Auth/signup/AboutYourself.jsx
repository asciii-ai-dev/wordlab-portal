import React from "react";
import ButtonCommon from "../../Common/Button";
import FormInput from "../../Common/FormInput";

const AboutYourself = ({ step, register, errors, control }) => {
  const options = [
    { value: "freelancer", label: "Freelancer" },
    { value: "marketer", label: "Marketer" },
    { value: "business owner", label: "Business Owner" },
    { value: "other", label: "Other" },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="space-y-5 text-center">
        <p className="text-light text-[15px] font-[500]">
          Step {step + 1} of 3
        </p>
        <h2 className="text-base-content text-[26px] font-[600]">
          Tell Us About Yourself
        </h2>
      </div>

      <div className="space-y-6 py-5 w-full">
        <FormInput
          selectOptions={options}
          control={control}
          type="select"
          error={errors?.user_industry?.message}
          register={register}
          name="user_industry"
          title="Are you a?"
          placeholder="Select"
        />
        <FormInput
          error={errors?.company?.message}
          register={register}
          name="company"
          title="Company"
          placeholder="Example: Ascii"
        />
        <FormInput
          error={errors?.domain?.message}
          register={register}
          name="domain"
          title="Domain (Recommended)"
          placeholder="ascii.ai"
        />
      </div>

      {/* <div className="w-full mt-5">
        <ButtonCommon onClick={submitForm} title="Continue" />
      </div> */}
    </div>
  );
};

export default AboutYourself;
