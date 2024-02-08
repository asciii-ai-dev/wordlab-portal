import React, { useState } from "react";
import ErrorMessage from "../../utils/ErrorMessage";
import { Checkbox } from "@material-tailwind/react";
import { Controller } from "react-hook-form";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
import TagsInput from "react-tagsinput";
import {  MdOutlineSearch } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Tooltip } from "react-tooltip";

const FormInput = ({
  value,
  onChange,
  placeholder,
  tooltip,
  title,
  type,
  className,
  error,
  register,
  name,
  inputType,
  selectOptions,
  control,
  maxLength,
  required,
  disabled,
  ref,
  defaultValue,
  mainClassName,
  formatOptionLabel
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const defaultInputClassName = `${className} border-2 mt-1 border-[#DFE1E6] w-full text-sm px-1.5 py-1.5 text-[10px] rounded-[2px] transition-colors duration-500 ease-in-out focus:bg-base-100 focus:border-blue-500 focus:outline-none `;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.5px solid #DFE1E6",
      display: "flex",
      borderRadius: "2px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "13px",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #DFE1E6",
      color: state.isSelected ? "white" : "#88909B",
      backgroundColor: state.isSelected ? "#2563EB" : "white",
      padding: "10px 6px",
      fontSize: 13,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f2f2f2",
      },
    }),
  };

  

  return (
    <>
      {type === "checkbox" ? (
        <Checkbox
          value={value}
          label={title}
          onChange={onChange}
          className={className}
          labelProps={{
            className: "text-[13px] text-base-content", // add custom class to label element
          }}
        />
      ) : (
        <div className={`mb-5 ${mainClassName}`}>
          {title && (
            <div className="mb-2 flex items-center gap-x-2">
              <p className=" text-[12px] font-[500] text-base-content">
                {title}
                <span className="text-red-600 text-sm ">*</span>
                
              </p>
              {tooltip && (
              <>
               <QuestionMarkCircleIcon data-tooltip-content={tooltip} data-tooltip-id="my-tooltip" className="h-4 w-4  cursor-pointer text-primary" />
              <Tooltip data-tooltip-content className="shadow-lg rounded-lg" style={{background:'#FFFF', maxWidth:"400px", color:'black', fontSize:13, padding: 10,}} id="my-tooltip"/>
              </>
             )}
            </div>
          )}
          {type === "select" ? (
            <div>
              <Controller
                name={name}
                control={control ? control : null}
                defaultValue={defaultValue}
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    required={required}
                    className={`pt-1.5 text-[11px] !bg-base-100 ${className} ${
                      disabled === true && "cursor-not-allowed"
                    }`}
                    value={selectOptions?.find(
                      (option) => option?.value === field.value
                    )}
                    isDisabled={disabled}
                    onChange={(option) => field.onChange(option.value)}
                    options={selectOptions}
                    formatOptionLabel={formatOptionLabel || null}
                    
                  />
                )}
              />
            </div>
          ) : type == "textarea" ? (
            <textarea
              className={`${defaultInputClassName} text-[10px] h-[135px] !bg-base-100`}
              value={value}
              onChange={onChange}
              name={name}
              placeholder={placeholder}
              maxLength={maxLength}
              required={required}
              {...(register && { ...register(name) })}
            />
          ) : type == "keyword" ? (
            <Controller
              name={name}
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TagsInput
                  value={value}
                  onChange={(val) => {
                    handleChange(val);
                    field.onChange(val);
                  }}
                />
              )}
            />
          ) : (
            <div className="relative active:bg-base-100 bg-base-100 w-full">
              {inputType === "search" && (
                <div className="absolute z-50 left-2 top-3 text-2xl cursor-pointer text-gray-500">
                  <MdOutlineSearch className="w-5 h-5 text-[#A4B0C0]" />
                </div>
              )}
              <input
                required={required}
                className={`${defaultInputClassName} active:!bg-base-100 !bg-base-100 ${
                  inputType === "password" && "pr-9"
                } ${inputType === "search" && "pl-8"}`}
                value={value}
                maxLength={maxLength}
                disabled={disabled}
                ref={ref}
                defaultValue={defaultValue}
                type={
                  !showPassword && inputType === "password"
                    ? "password"
                    : "text"
                }
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                {...(register && { ...register(name) })}
              />
              {inputType === "password" && (
                <div
                  onClick={handleShowPassword}
                  className="absolute z-50 right-2 top-3 text-2xl cursor-pointer text-gray-500"
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5" />
                  )}
                </div>
              )}
            </div>
          )}
          {error && (
            <div>
              <ErrorMessage message={error} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FormInput;
