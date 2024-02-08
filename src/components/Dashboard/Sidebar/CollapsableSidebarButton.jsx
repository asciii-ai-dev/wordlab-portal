import React from "react";
import { IoCaretBack } from "react-icons/io5";

const CollapseSideBarButton = ({
  open,
  collapseSidebar,
  className,
  icon: Icon,
}) => {
  return (
    <div
      className={`hidden md:block absolute cursor-pointer -right-0.5 z-50 light:bg-white top-[270px]
   border light:border-gray-200 border-r-0 rounded-bl-md rounded-tl-md py-2 pl-2.5 pr-1 ${className}`}
      onClick={collapseSidebar}
    >
      {Icon ? (
        <Icon />
      ) : (
        <IoCaretBack
          className={` !text-[16px] light:text-gray-500 ${
            !open && "rotate-180"
          }`}
        />
      )}
    </div>
  );
};

export default CollapseSideBarButton;
