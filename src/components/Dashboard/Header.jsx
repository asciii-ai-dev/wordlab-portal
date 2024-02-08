import React, { useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import Logo from "../../assets/images/wordlab-logo.png";
import lightLogo from "../../assets/images/wordlab-logo-light.png";
import userImage from "../../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutSharp, IoSettingsSharp } from "react-icons/io5";
import { logout } from "../../features/auth/authSlice";
import ThemeSelector from "../../utils/ThemeSelector";
import {getRandomColor,createImageFromInitials} from "../../utils/initialsAvatar"


const Header = ({ toggleSidebar }) => {
  const user = useSelector((state) => state?.auth?.user);
  const [headerLogo, setHeaderLogo] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  
  const dispatch = useDispatch();
  const router = useNavigate();

  const Logout = () => {
    const isLogout = dispatch(logout());
    if (isLogout) router("/");
  };
  return (
    <header className="flex   w-full items-center px-3.5 py-2 bg-base-200/10 bg-opacity-50 border-base-300 border-b  ">
      {/* logo */}
      <div className="flex gap-2 md:gap-0 items-center">
        <BiMenu
          onClick={toggleSidebar}
          className="md:hidden block cursor-pointer text-[#88909B] text-4xl h-8"
        />

        <Link to="/">
          <img
            src={headerLogo === "dark" ? lightLogo : Logo}
            alt="logo"
            width={100}
            height={20}
            className={`h-8 cursor-pointer  object-contain ${
              headerLogo == "light" && "md:!pl-5"
            }`}
          />
        </Link>
      </div>

      {/* icons */}
      {
        user?.email && (
          <div className="ml-auto flex gap-3 b items-center">
        <div className="md:flex hidden">
          <ThemeSelector setHeaderLogo={setHeaderLogo} />
        </div>
        {/* <BsFillQuestionCircleFill className="text-[#091E4224] text-[22px] cursor-pointer " /> */}
        {/* <NavLink to="/settings"> */}
        <div className="dropdown dropdown-end ">
          <FaUserCircle
            tabIndex={0}
            className="text-sky-500 text-[22px] cursor-pointer "
          />
          <ul
            tabIndex={0}
            className="dropdown-content z-50 bg-base-100 menu p-2 shadow space-y-4  pt-6 rounded-box w-64"
          >
            <div className="w-full flex flex-col gap-y-6 items-center">
              <img
                id='preview'
                src={
                     createImageFromInitials(500, user?.name, getRandomColor())
                    || userImage
                }
                alt='profile-pic'
                className="object-contain w-[80px] h-[80px] rounded-full "
              />
              <div>
                <h2 className="text-base-content text-center font-[500] text-[16px]">
                  {user?.name || ""}
                </h2>
                <p className="text-light text-center  text-[12px]">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            <div>
              <Link
                to="/settings"
                className="flex gap-x-2 cursor-pointer active:bg-base-100 hover:bg-base-200 px-2 py-3 rounded duration-300 items-center"
              >
                <IoSettingsSharp className="text-[20px]" />
                <p className="text-base-content text-[14px] font-[400]">
                  Settings
                </p>
              </Link>
              <div
                onClick={() => Logout()}
                className="flex gap-x-2 cursor-pointer active:bg-base-100 hover:bg-base-200 px-2 py-3 rounded duration-300 items-center"
              >
                <IoLogOutSharp className="text-[20px]" />
                <p className="text-base-content text-[14px] font-[400]">
                  Log Out
                </p>
              </div>
            </div>
          </ul>
        </div>
        {/* </NavLink> */}
      </div>
        )
      }
    </header>
  );
};

export default Header;
