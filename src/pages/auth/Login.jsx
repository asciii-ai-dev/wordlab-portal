import React from "react";
import AuthLeft from "../../components/Auth/AuthLeft";
import LoginRight from "../../components/Auth/LoginRight";

const Login = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden ">
      {/* left side  */}

      <AuthLeft />

      {/* right side */}
      <LoginRight />
    </div>
  );
};

export default Login;
