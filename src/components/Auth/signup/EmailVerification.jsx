import React, { useState, useEffect } from "react";
import ButtonCommon from "../../Common/Button";
import OtpInput from "react18-input-otp";
import {
  useRequestOptMutation,
  useVerifyEmailMutation,
} from "../../../features/auth/authApi";

const EmailVerification = ({
  step,
  submitForm,
  otp,
  handleOtp,
  isLoading,
  handleReqOTP,
}) => {
  const [showResendCode, setShowResendCode] = useState(true);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setShowResendCode(true);
    }
  }, [seconds]);

  const handleResendCode = async () => {
    handleReqOTP(true).then((e) => {
      console.log(e, " ee");
      setShowResendCode(false);
      setSeconds(60);
    });
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="space-y-5">
        <p className="text-light text-[15px] font-[500]">
          Step {step + 1} of 4
        </p>
        <h2 className="text-base-content text-[26px] font-[600]">
          Email Verification
        </h2>
        <p className="text-light text-[15px] font-[400]">
          Please enter the OTP below you received via email to verify your
          account
        </p>
      </div>

      <div className="mt-12 mb-8 space-y-8 w-full">
        <OtpInput
          value={otp}
          onChange={handleOtp}
          numInputs={6}
          className="!bg-base-100"
          containerStyle={{
            display: "flex",
            justifyContent: "space-between",
            margin: 5,
            // backgroundColor:'white'
          }}
          inputStyle={{
            width: 40,
            borderBottom: "1px solid #88909B",
            padding: "0 10px",
            outline: "none",
            fontSize: 18,
            color: "#88909B",
            // backgroundColor:'white'
          }}
        />

        {showResendCode ? (
          <button
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-primary underline text-[15px] font-[600] pt-4"
          >
            Resend Code
          </button>
        ) : (
          <p className="text-primary underline text-[15px] font-[600] pt-4">
            0:{seconds}
          </p>
        )}
      </div>

      <div className="w-full">
        {/* <ButtonCommon title="Continue" onClick={submitForm} /> */}
      </div>
    </div>
  );
};

export default EmailVerification;
