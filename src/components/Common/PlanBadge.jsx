import React from "react";

const PlanBadge = ({ planName, className }) => {
  return (
    <sup
      className={`${className} bg-opacity-80 shadow-sm bg-primary w-fit text-center  h-full text-white px-[5px] py-2 rounded-lg text-[60%]`}
    >
      {planName}
    </sup>
  );
};

export default PlanBadge;
