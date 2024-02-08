import React, { useState, useRef, useEffect } from "react";
import { SlArrowUp } from "react-icons/sl";
import FormInput from "./FormInput";
import ButtonCommon from "./Button";
import { MdDeleteOutline } from "react-icons/md";

const Accordion = ({
  handleRemoveSection,
  sectionNo,
  toggleAccordion,
  index,
  activeIndex,
  generateSection,
  isLoading,
}) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [sectionDetails, setSectionDetails] = useState({
    title: "Section Title",
    section_descp: "",
    cta: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name)
    setSectionDetails((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    setContentHeight(
      activeIndex === index ? contentRef.current.scrollHeight : 0
    );
  }, [activeIndex]);

  useEffect(() => {
    if (sectionNo === 1) toggleAccordion(index);
  }, []);

  return (
    <div className="border border-gray-300 rounded my-4 ">
      <div
        className="flex items-center justify-between px-3 md:px-6 py-4 cursor-pointer"
        onClick={() => toggleAccordion(index)}
      >
        <div className="flex gap-x-4 items-center">
          <h2 className="text-[22px] font-[400] text-light">
            {sectionNo < 10 ? `0${sectionNo}` : sectionNo}
          </h2>
          {activeIndex === index ? (
            <input
              type="text"
              className="border border-gray-200 bg-transparent w-[150px] md:w-auto p-2 outline-none font-semibold text-[16px] sm:text-[18px] placeholder:text-base-content"
              placeholder="Section Title"
              onChange={handleInputChange}
              name="title"
              value={sectionDetails?.title}
              autoFocus
            />
          ) : (
            <h2 className="font-semibold text-[16px] sm:text-[18px] text-base-content">
              {sectionDetails?.title}
            </h2>
          )}
        </div>
        <span
          className={`transform transition-transform border-[#E9EAEB] border-2 rounded-full p-3 ${
            index === activeIndex ? "rotate-180" : ""
          }`}
        >
          <SlArrowUp className="text-[12px]" />
        </span>
      </div>
      <div
        className="overflow-hidden transition-height duration-300"
        style={{ height: `${contentHeight}px` }}
      >
        <div className="flex gap-x-4 items-center">
          <div className="bg-base-100 w-[5.5%]" />
          <div className="pr-6 bg-base-100 flex-1" ref={contentRef}>
            <FormInput
              type="textarea"
              name="section_descp"
              onChange={handleInputChange}
              value={sectionDetails?.section_descp}
              title={"Description"}
              placeholder={"Briefly describe the key ideas for the fold"}
            />
            <FormInput
              type="text"
              name="cta"
              onChange={handleInputChange}
              value={sectionDetails?.cta}
              title={"CTA"}
              placeholder={"E.g: Contact Us"}
            />
            <div className="w-full flex flex-col sm:flex-row justify-end mb-2 gap-x-2">
              <ButtonCommon
                disabled={isLoading}
                onClick={() => generateSection(sectionDetails)}
                title={"Generate"}
                className="py-2.5 !text-[11px] max-h-[40px]  mb-3 w-full sm:!w-[200px]"
              />
              <ButtonCommon
                onClick={handleRemoveSection}
                disabled={isLoading}
                title={"Remove Section"}
                className="py-2 !text-[11px] w-full sm:!w-[200px] bg-white font-semibold !text-[#de2209b9]  border-[#de2209b9] hover:shadow-none border max-h-[40px]  shadow-none"
                iconLeft={
                  <MdDeleteOutline className="text-[#de2209b9] text-[16px] font-semibold" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
