import React, { useState } from "react";
import SidebarContent from "./SidebarContent";
import CollapseSideBarButton from "./CollapsableSidebarButton";
import SidebarCard from "./SidebarCard";

const Sidebar = ({ drawer, toggleSidebar, collapseSidebar, open, openFeedback , onClick}) => {

  return (
    <>
      <div
        className={`hidden md:flex z-50 flex-col justify-between max-h-screen bg-base-100 border-2 border-base-200 border-t-0 `}
      >
        <div
          className={`   ${
            open ? "w-[240px]" : "w-20 "
          }  h-full  relative duration-300 overflow-x-hidden overflow-y-auto scrollbar-hide sm:hover:scrollbar-default `}
        >
          <CollapseSideBarButton
            open={open}
            collapseSidebar={collapseSidebar}
          />
          <SidebarContent open={open} />

          {open && (
            <div className="mt-5 mb-3 space-y-4 px-3.5 ">
              <SidebarCard
                heading="Word Counter"
                paragraph="You can always add more words or upgrade your current plan."
                buttonTitle="View Plans"
                onClick={onClick}
              />
              <SidebarCard
                heading="Want to share your thoughts with us?"
                paragraph="Let us know where we can improve"
                buttonTitle="Send Feedback"
                onClick={openFeedback}
              />
            </div>
          )}
        </div>

        {/* Sidebar Footer  */}

        {/* {open && (
          <div className="p-4">
            <div className="text-light text-center space-y-2">
              <p className="text-[12px]">© 2022 Asciii®</p>
              <div className="flex justify-center items-center space-x-3">
                <p className="text-[12px]">About Us </p>
                <p className="text-[12px]"> Privacy Policy</p>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Sidebar;
