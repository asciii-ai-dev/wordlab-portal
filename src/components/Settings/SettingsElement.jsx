import React from "react";
import FormInput from "../Common/FormInput";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

const SettingsElement = ({
  title,
  inputValue,
  editMode,
  inputType,
  selectOptions,
  control,
  handleOpen,
  register,
  name,
  isLoading,
}) => {
  console.log(isLoading);
  return (
    <div className="space-y-2.5">
      <h3 className="text-base-content text-[15px] font-[500]">{title}</h3>
      {editMode && !Array.isArray(inputValue) ? (
        <FormInput
          placeholder={`Enter ${title.toLowerCase()} here`}
          name={name}
          className="w-full sm:!w-[350px] !rounded-md"
          type={inputType ? inputType : "text"}
          selectOptions={selectOptions}
          control={control}
          defaultValue={inputValue}
          // value={inputValue}
          register={register && register}
          // ref={null}
        />
      ) : Array.isArray(inputValue) ? (
        <div className="flex flex-wrap gap-x-2 gap-y-2 items-center">
          {inputValue?.map((v, i) => (
            <button
              key={i}
              className="flex items-center justify-center cursor-pointer rounded border border-[#dfe3e9] px-4 py-1"
            >
              <p className="text-light text-[12px]">{v}</p>
            </button>
          ))}
          {editMode && (
            <BsFillPlusCircleFill
              onClick={handleOpen}
              className="text-primary text-[22px] cursor-pointer ml-1"
            />
          )}
        </div>
      ) : isLoading ? (
        <Skeleton className="mt-3" height={13} width={170} />
      ) : (
        <p className="text-light text-[13.5px] font-[400]">{inputValue}</p>
      )}
    </div>
  );
};

export default SettingsElement;
