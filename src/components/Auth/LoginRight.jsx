import React from "react";
import Logo from "../../assets/images/wordlab-logo.png";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const LoginRight = () => {
  return (
    <div className="bg-base-100 flex-grow overflow-y-auto flex flex-col md:pt-5 pb-3 items-center md:justify-center   ">
      <div className=" block md:hidden self-center flex-col pt-8 h-[10%]">
        <Link className="" to="/login">
          <img
            src={Logo}
            width={100}
            height={100}
            alt="wordlab_logo"
            className="object-contain  "
          />
        </Link>
      </div>

      <div className=" w-[92%]  md:w-[60%] !my-6 md:mt-0  flex-grow md:flex-grow-0">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginRight;
