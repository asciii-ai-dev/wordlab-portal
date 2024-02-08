import React from "react";

const CardChip = ({ value, textColor, bg }) => {
  return (
    <div
      className={` px-3.5 py-1 items-center rounded-[3px] w-fit`}
      
      style={{ color: textColor, backgroundColor: bg }}
    >
      <p className={`text-[11px] font-[600] ${textColor} uppercase`}> ️‍🔥 {value}</p>
    </div>
  );
};

export default CardChip;
