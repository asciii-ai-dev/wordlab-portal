import React from "react";
import SidebarNav from "./SidebarNav";
import {
  MdSpaceDashboard,
  MdAddBusiness,
  MdOutlineFavoriteBorder,
  MdChat,
} from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { FaRegFileAlt } from "react-icons/fa";
import { useFetchUserPlanInfoQuery } from "../../../features/templates/templateApi";

const SidebarContent = ({ open }) => {
  const { data: userData } = useFetchUserPlanInfoQuery();
  return (
    <div className="px-3.5 pt-10">
      <div className="flex flex-col ">
        <SidebarNav
          icon={MdSpaceDashboard}
          path="/"
          title="Dashboard"
          open={open}
        />
        <SidebarNav
          icon={MdOutlineFavoriteBorder}
          path="/templates"
          title="Templates"
          open={open}
        />
        <SidebarNav
          icon={FaRegFileAlt}
          path="/documents"
          title="Documents"
          open={open}
          badgeName={userData?.plan_info?.name}
        />
        <SidebarNav
          icon={MdAddBusiness}
          path="/business"
          title="Business"
          open={open}
        />
        <SidebarNav
          icon={BiBookContent}
          path="/landing-page"
          title="Landing Page"
          badgeName={userData?.plan_info?.name}
          open={open}
        />
        <SidebarNav
          icon={MdChat}
          path="/chat"
          title="Chat"
          open={open}
          badgeName={userData?.plan_info?.name}
        />
      </div>
    </div>
  );
};

export default SidebarContent;
