import React from "react";
import AuthLeft from "../../components/Auth/AuthLeft";
import SignupRight from "../../components/Auth/SignupRight";

const SignUp = () => {
  return (
    <div className="flex h-screen bg-base-100 overflow-hidden ">
      {/* left side  */}

      <AuthLeft />

      {/* right side  */}
      <SignupRight />
    </div>
  );
};

export default SignUp;
