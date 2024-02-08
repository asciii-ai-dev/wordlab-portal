import React from "react";
import ButtonCommon from "../Common/Button";

const SettingsContainer = ({ children, title, rightBtn, rightBtnClick, editMode, submit, isLoading }) => {
  return (
    <div className="flex flex-col w-full p-8 gap-y-6 rounded-2xl border-2 border-[#f1f1f1]">
      <div className="flex justify-between items-center">
        <h1 className="text-[15px] sm:text-[19px] text-base-content font-[500]">{title}</h1>
        {(!editMode && rightBtn ) && <button onClick={rightBtnClick}>{rightBtn}</button>}
      </div>
      {children}
      {editMode && (
        <div className="flex flex-row justify-end">
        <ButtonCommon
          onClick={rightBtnClick}
          title="Cancel"
          variant="text"
          className="rounded-sm !text-base-content !w-[80px]"
        />
        <ButtonCommon disabled={isLoading} onClick={submit} className="rounded-sm !w-[80px]" title="Save" />
      </div>
      )}
    </div>
  );
};

export default SettingsContainer;
