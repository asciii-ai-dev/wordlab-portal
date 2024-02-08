import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersUsageQuery } from "../../../features/auth/authApi";

const SidebarCard = ({ onClick, heading, paragraph, buttonTitle,  }) => {
  const {data} = useGetUsersUsageQuery()
  const wordsUsed = data?.payload?.words_used_perc;
  const navigate = useNavigate()

  const onNavigate = () => {
    navigate("/settings")
  }

  return (
    <div className="py-4 px-5 space-y-5 text-center bg-base-200  bg-opacity-80 rounded-[4px]">
      <h3 className=" text-[14px] font-[500]">{heading}</h3>
      {(heading === "Word Counter" && wordsUsed) && (
        <div className="flex justify-between items-center space-x-3">
          <progress className="bg-primary h-1.5 rounded" value={parseFloat(wordsUsed)} max="100"></progress>
          <p className=" text-[11px]">{wordsUsed || ""}</p>
        </div>
      )}
      <p className="!text-light text-[10.5px] font-[400]">{paragraph}</p>
      <div>
        <button
          className={`bg-primary !text-white !text-[11px] w-full font-[600] active:bg-blue-700  text-xs px-4 py-1.5 rounded-sm  shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
          onClick={onClick || onNavigate }
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default SidebarCard;
