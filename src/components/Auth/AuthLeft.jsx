import React from "react";
import Logo from "../../assets/images/wordlab-logo-dark.png";
import VectorLeft from "../../assets/images/Login-Signup.png";
import { Link } from "react-router-dom";

const LoginLeft = () => {
  return (
    <div className="w-2/5  hidden md:flex h-full  flex-col bg-primary">
      <Link to="/login" className="  pt-8 ml-10">
        <img src={Logo} alt="ascii_logo" className="h-6  object-contain" />
      </Link>
      <div className="flex flex-col flex-grow text-center items-center h-full justify-center overflow-hidden space-y-5">
        <img
          src={VectorLeft}
          alt="auth-left-image"
          className="object-contain w-10/12 h-[300px]"
        />
        <div className="pt-6 space-y-4 mx-8">
          <p className="text-white font-semibold text-lg md:text-[22px] ">
          Generate 10x Faster & Better Content
          </p>
          <p className="text-light2 text-md md:text-[16px]">
          GPT4 powered trainable AI content generation suite for writing unique & captivating content in your brand tone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeft;
