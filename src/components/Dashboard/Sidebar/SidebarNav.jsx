import React from "react";

import { Link, useLocation } from "react-router-dom";

const SidebarNav = ({ open, title, path, icon: Icon, badgeName }) => {
  const location = useLocation();
  return (
    <Link
      to={path}
      className={`${
        path == location?.pathname && "active"
      } flex py-2.5  w-full gap-2 items-center cursor-pointer group hover:bg-base-200 
   
    ${open ? "px-3" : "justify-center"} `}
    >
      <Icon className="text-[22px] icon  group-hover:text-[#096BDE] text-[#88909B]" />
      <p
        className={`text-[12px] font-[400] ${
          !open && "hidden"
        } pl-2 group-hover:text-[#096BDE]`}
      >
        {title}
      </p>
      {badgeName && badgeName !== "Pro" && (
        <sup
          className={`${
            !open && "hidden"
          } bg-opacity-80 shadow-sm bg-primary w-fit text-center  h-full text-white px-[5px] py-2 rounded-lg text-[60%]`}
        >
          Pro
        </sup>
      )}
    </Link>
  );
};

export default SidebarNav;
