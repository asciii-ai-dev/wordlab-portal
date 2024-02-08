import React, { useState, useEffect } from "react";
import { useGetBusinessQuery } from "../../features/business/businessApi";
import Select from "react-select";

const UseOutputProfile = ({ template_id, onChange, value, className }) => {
  const [businessTemps, setBusinessTemps] = useState([]); // Initialize with an empty array
  const { data: businessData = [], isLoading: isFetchingBusiness } =
    useGetBusinessQuery();

  useEffect(() => {
    if (!isFetchingBusiness) {
      let unique = [];
      businessData?.forEach((b) => {
        unique = [...unique, ...b?.templates];
      });
      const data = new Set(unique);
      setBusinessTemps([...data]);
    }
  }, []);

  if (!businessTemps?.includes(template_id)) return null;
  let selectOptions = [];
  
   selectOptions = businessData?.map((v) => ({
    label: "" || v?.comp_name,
    value: "" || v?.id,
  }));
  selectOptions.unshift({
    label: "Select Any Profile ",
    value: "" 
  })
  console.log(selectOptions)
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.5px solid #DFE1E6",
      display: "flex",
      borderRadius: "2px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "11px",
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
    <div className={`mb-5 w-full  `}>
      <div className="flex items-center justify-between gap-x-3">
        <p className="pb-2 text-[12px] font-[500] text-base-content">
          Select Output Profile
          <span className="text-red-600 text-sm ">*</span>
        </p>
      </div>
      <Select
        styles={customStyles}
        className={`${className} text-[11px] !bg-base-100 `}
        value={selectOptions?.find((option) => option?.value === value)}
        onChange={(option) => onChange(option.value)}
        options={selectOptions}
      />
    </div>
  );
};

export default UseOutputProfile;
