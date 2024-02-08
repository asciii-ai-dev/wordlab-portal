import React from "react";
import { countryCodes } from "../../utils/data/cc";
import { FileUploader } from "react-drag-drop-files";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";

const ChatFeature = ({
  actionType,
  title,
  value,
  onChange,
  setSelectedCC,
  handleFileChange,
  images,
  handleRemoveImg,
  descp,
  isPro
}) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  const renderImagePreviews = () => {
    return images?.map((file, index) => {
      return (
        <div
          className="!w-[150px] !h-[150px] relative bg-cover bg-center object-cover bg-red-400 p-2 mt-6"
          style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}
          key={index}
        >
          <button
            onClick={() => handleRemoveImg(file?.lastModified)}
            className="bg-[#f1f1f1] absolute top-2 right-3 rounded-full p-2"
          >
            <MdDeleteOutline className="text-red-500" />
          </button>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex">
            <h6 className="text-base-content text-[15px]">{title || ""}</h6>
            {actionType === "chatImage" || actionType === "liveSearch" ? (
              !isPro && (
                <sup
                className={` bg-opacity-80 shadow-sm bg-primary w-fit text-center  h-full text-white px-[5px] py-2 rounded-lg text-[60%]`}
              >
                Pro
              </sup>
              )
            ): null}
          </div>
          <p className="text-light text-[10px] pr-4">
  {descp}
</p>
        </div>
        <div>
          {actionType == "google" ? (
            <input
              type="checkbox"
              className="toggle toggle-xs sm:toggle-sm toggle-success	"
              checked={value}
              onChange={onChange}
            />
          ) : actionType == "liveSearch" && isPro ? (
            <input
              // onClick={handleVisible}
              type="checkbox"
              className="toggle toggle-xs sm:toggle-sm  toggle-success	"
              checked={value}
              onChange={onChange}
            />
          ) : actionType === "cc" ? (
            <div>
              <div className="flex  items-center">
                <p className="text-primary font-semibold">{value}</p>
                <select
                  value={value}
                  onChange={(e) => setSelectedCC(e.target.value)}
                  className="select !outline-none w-full max-w-[0px]"
                >
                  {countryCodes?.map((code, i) => (
                    <option key={i} defaultValue="US" value={code.code}>
                      {code?.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : actionType === "chatImage" && isPro ? (
            <div>
              <input
                type="checkbox"
                className="toggle toggle-xs sm:toggle-sm  toggle-success	"
                checked={value}
                onChange={onChange}
              />
            </div>
          ) : null}
        </div>
      </div>
      {(actionType === "chatImage"  && value) && (
        <div className="">
          <div className="flex items-center justify-center">
            <FileUploader
              multiple={true}
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
            />
          </div>
          {images && (
            <div className="flex flex-wrap gap-y-3 gap-x-4">
              {renderImagePreviews()}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatFeature;
