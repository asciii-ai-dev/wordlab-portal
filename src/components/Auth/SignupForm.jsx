import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import FormInput from "../Common/FormInput";
import ButtonCommon from "../Common/Button";
import { NavLink } from "react-router-dom";
import { getItem } from "../../utils/localSotrage";

const SignupForm = ({
  handleStepCompletion,
  handleGoogleAuth,
  register,
  errors,
  isLoading,
}) => {

  const [terms, setTerms] = useState(true)
  return (
    <>
      <h1 className="text-[26px] text-base-content font-[600]">Sign Up</h1>
      {/* <p className="text-light text-[15px] font-[400]">
        Lorem ipsum dolor sit amet consectetur!
      </p> */}

      {/* Signin Button Google  */}
      <GoogleButton onClick={handleGoogleAuth} title={"Sign Up With Google"} />

      {/* Or Separator  */}
      <div className="flex justify-center items-center mt-6 pt-3 ">
        <div className="border-t border-[#091E4224]-300 flex-grow mr-3" />
        <div className="text-[15px] text-[#626F86] font-[400]">Or</div>
        <div className="border-t border-[#091E4224]-300 flex-grow ml-3" />
      </div>

      {/* Form  */}
      <div className="space-y-4">
        <FormInput
          error={errors?.name?.message}
          register={register}
          name="name"
          title={"Name"}
          placeholder={"Enter your name here"}
        />
        <FormInput
          error={errors?.email?.message}
          register={register}
          name="email"
          title={"Email"}
          placeholder={"Enter your email here"}
        />
      </div>
      <div className="!mt-5 -ml-3 flex items-center">
        <FormInput
          type="checkbox"
          value={terms}
          onChange={(e) => setTerms(!terms)}
        />
        <p className="text-sm">       I have read and agree to the  <a href="https://wordlab.ai/terms-of-service/ " target="_blank" className=" pt-0.5 text-blue-800 underline">Terms and Conditions</a>
        </p>
      </div>

      {/* Login / Continue Button  */}

      <ButtonCommon
        disabled={isLoading || terms}
        onClick={handleStepCompletion}
        title={isLoading ? "loading.." : "Continue"}
      />

      {/* Dont have an account  */}

      <NavLink to="/login" className="flex pt-2 justify-center">
        <p>Already have an account?</p>
        <p className="font-[500] text-[15px] underline text-primary cursor-pointer pl-1">
          Login
        </p>
      </NavLink>
    </>
  );
};

export default SignupForm;
