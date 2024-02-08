import React from "react";
import ButtonCommon from "../../Common/Button";
import FormInput from "../../Common/FormInput";

const SetPassword = ({ step, errors, register }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="space-y-5 text-center">
        <p className="text-light text-[15px] font-[500]">
          Step {step + 1} of 3
        </p>
        <h2 className="text-base-content text-[26px] font-[600]">Set Password</h2>
        <p className="text-light text-[15px] font-[400]">
          Lorem ipsum dolor sit amet consectetur!
        </p>
      </div>

      <div className="space-y-6 py-5 w-full">
        <FormInput
          error={errors?.password?.message}
          register={register}
          name="password"
          title="Password"
          inputType={"password"}
          placeholder="Enter your password here"
        />
        <FormInput
          error={errors?.confirmPassword?.message}
          register={register}
          name="confirmPassword"
          title="Confirm Password"
          inputType={"password"}
          placeholder="Enter your password here"
        />
      </div>

      {/* <div className="w-full mt-5">
        <ButtonCommon onClick={submitForm} title="Continue" />
      </div> */}
    </div>
  );
};

export default SetPassword;
