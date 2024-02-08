import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Header from "../components/Dashboard/Header";
import { useLocation } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SidebarContent from "../components/Dashboard/Sidebar/SidebarContent";
import SidebarCard from "../components/Dashboard/Sidebar/SidebarCard";
import ThemeSelector from "./ThemeSelector";
import FeedbackForm from "../components/Common/FeedbackForm";
import useFeedbackForm from "./helpers/feedbackHook";
import { useSelector } from "react-redux";

const Layout = ({ children, padding }) => {
  const [drawer, setDrawer] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [defaultValue,setDefaultValue] = useState("");
  const {visibleFeedback, defaultFeedbackVal} = useSelector(state => state.common)
  
  const [handleVisible] = useFeedbackForm()
  useEffect(() => {
    setDefaultValue(defaultFeedbackVal)
  },[defaultFeedbackVal])
 

  const location = useLocation();

  React.useEffect(() => {
    setDrawer(() => false);
  }, [location]);

  React.useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768; // Change this value based on your small screen breakpoint
      setIsSmallScreen(isSmall);
    };
    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (isSmallScreen) {
      // Do something when the screen size is small
      setOpen((open) => true);
    }
  }, [isSmallScreen]);
  const toggleSidebar = React.useCallback(() => {
    setDrawer((drawer) => !drawer);
  }, []);

  const collapseSidebar = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  

  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Drawer
          open={drawer}
          onClose={toggleSidebar}
          direction="left"
          className="!overflow-y-auto !bg-base-100"
        >
          <div className="md:hidden mx-auto mt-3 flex items-center justify-center">
            <ThemeSelector />
          </div>
          <SidebarContent open={open} />
          <div className="mt-7 mb-3 space-y-5 px-3.5 ">
            <SidebarCard
              heading="Word Counter"
              paragraph="Lorem ipsum dolor sit amet consectetur!"
              buttonTitle="View Plans"
              // onClick={}
            />
            <SidebarCard
              heading="Want to share your thoughts with us?"
              paragraph="Let us know where we can improve"
              buttonTitle="Send Feedback"
              openFeedback={() => handleVisible("General feedback")}
            />
          </div>
        </Drawer>
        <Sidebar
          open={open}
          collapseSidebar={collapseSidebar}
          drawer={drawer}
          toggleSidebar={toggleSidebar}
          openFeedback={() => handleVisible("General feedback")}
        />
        <main
          className={`${
            padding && "p-7"
          } flex-1 overflow-y-auto scrollbar-hide md:scrollbar-default bg-base-100  `}
        >
          {children}
        </main>
          {defaultValue && (
                    <FeedbackForm defaultValue={defaultValue }  handleVisible={() => handleVisible()} visibleFeedback={visibleFeedback} />

          )}
      </div>
    </div>
  );
};

export default Layout;
