import React from "react";
import { HiArrowRight } from "react-icons/hi";

const EditorAction = ({
  title,
  icon: Icon,
  description,
  onClick,
  disabled,
  className
}) => {
  return (
    <div
      onClick={!disabled ? onClick : () => {}}
      className={`flex justify-between gap-x-4 h-full relative ${className} ${
        !disabled && "cursor-pointer" 
      }`}
    >
      {disabled && (
        <div className="absolute h-full top-0 z-50 disable_glass w-full" />
      )}
      <div className="bg-[#DEE5EF99] rounded-full h-fit  p-1.5 flex items-center justify-center">
        <Icon className="text-[13px] " />
      </div>
      <div className="-ml-2">
        <h4 className={`text-base-content text-[13px] font-[600]`}>{title}</h4>
        <p className={`text-[#A4B0C0] text-[11px] font-[400]`}>{description}</p>
      </div>
      <div className="flex justify-end flex-col">
        <div className="h-[30%]" />
        <div className="bg-primary w-6 h-6 flex justify-center items-center  rounded-full">
          <HiArrowRight className="text-white font-bold text-[14px]" />
        </div>
      </div>
    </div>
  );
};

export default EditorAction;
