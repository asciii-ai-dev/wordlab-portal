import React, { useState } from "react";
import ButtonCommon from "../../components/Common/Button";
import OutputTemplate from "../../components/Templates/OutputTemplate";
import FormInput from "../../components/Common/FormInput";
import TemplateHeader from "../../components/Templates/TemplateHeader";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Common/Accordion";
import { AiOutlinePlus } from "react-icons/ai";
import {
  useFetchUserPlanInfoQuery,
  useTemplateOutputMutation,
} from "../../features/templates/templateApi";
import { toast } from "react-hot-toast";
import SubscriptionOverlay from "../../components/Common/SubscriptionOverlay";
import UseOutputProfile from "../../utils/hooks/useOutputProfile";


const LandingPageGenerator = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pageContent, setPageContent] = useState([]);
  const [bussId, setBussId] = useState("");
  const [mainInput, setMainInput] = useState({
    company_name: "",
    company_descp: "",
    audience: "",
    tone: "",
  });
  console.log(bussId)
  const handleBussId = (e) => {
    setBussId(e);
  }
  const { data: userData } = useFetchUserPlanInfoQuery();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name)
    setMainInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const [accordions, setAccordions] = useState([{ section_desc: "", cta: "" }]);

  const handleRemoveSection = (indexToDelete) => {
    if (accordions.length <= 1) return;
    const updatedAccordions = accordions.slice();
    updatedAccordions.splice(indexToDelete, 1); // Remove the item at the specified index
    setAccordions(updatedAccordions); // Update the state
  };

  const navigate = useNavigate();

  const handleAddAccordion = () => {
    setAccordions([...accordions, { section_desc: "", cta: "" }]);
    setActiveIndex(accordions.length);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  const [generateOutput, { isLoading }] = useTemplateOutputMutation();

  const generateSection = async (secDetails) => {
    try {
      const response = await generateOutput({
        template_id: "landing-page",
        form_fields: { ...mainInput, ...secDetails },
        query: bussId ? `?business_id=${bussId}` : ""
      });
      if (response?.data?.message) {
        toast.success(`${response?.data.message} successfully!`);
        setPageContent((prev) => [
          ...prev,
          { title: secDetails?.title, content: response.data?.payload?.data },
        ]);
      }
    } catch (error) {
      toast.error("An Error Occured");
      console.log(error);
      // reset();
    }
  };

  return (
    <div className="h-screen relative sm:overflow-y-hidden ">
      <TemplateHeader navigate={navigate} title={"Landing Page Content"} />

      <div className="sm:overflow-y-auto relative  h-screen">
        {userData?.plan_info?.name !== "Pro" ? (
          <SubscriptionOverlay
            plan_name="Pro"
            module_name={"Landing Page Wizard"}
          />
        ) : (
          <>
            <div className="flex flex-col bg-base-100 sm:flex-row relative h-full">
              <div className="w-full  flex flex-col !justify-between p-8 border-t-0 border-b-1 sm:border-b-0 border-l-0 border border-r-1 border-[#E9EAEB]">
                <div
                  className="mb-auto space-y-8 h-full sm:overflow-y-auto scrollbar-hide"
                  style={{ maxHeight: "calc(100% - 80px)" }}
                >
                  {/* form inputs */}
                  <p className="text-[13.5px] text-light">
                    Write targeted copy for any kind of landing page.
                  </p>
                  <div className="grid grid-cols-1  md:grid-cols-2 sm:gap-x-4 gap-y-1">
                    <UseOutputProfile value={bussId} onChange={handleBussId} template_id={"landing-page"} />
                    <FormInput
                      type="text"
                      name="company_name"
                      title={"Company Name"}
                      placeholder={"Enter your Website or Comapny's name"}
                      value={mainInput.company_name}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      type="text"
                      name="company_descp"
                      title={"Company Description"}
                      placeholder={"Enter company's description"}
                      value={mainInput.company_descp}
                      onChange={handleInputChange}
                    />

                    <FormInput
                      type="text"
                      name="audience"
                      title={"Target Audience"}
                      placeholder={"Enter your target audience"}
                      value={mainInput.audience}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      type="text"
                      name="tone"
                      title={"Tone"}
                      placeholder={"Enter tone"}
                      value={mainInput.tone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    {accordions.map((accordion, index) => (
                      <Accordion
                        handleRemoveSection={() => handleRemoveSection(index)}
                        key={index}
                        index={index}
                        title={accordion.title}
                        sectionNo={index + 1}
                        open={open}
                        toggleAccordion={toggleAccordion}
                        activeIndex={activeIndex}
                        generateSection={generateSection}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>
                <div className="  hidden w-full pb-10 sm:flex justify-end items-end mb-4  h-[120px] space-x-5 ml-auto sticky !bottom-1">
                  <ButtonCommon
                    onClick={handleAddAccordion}
                    title={"Add Section"}
                    className="py-2.5 !text-[11px] max-w-[160px] bg-white   border-[#096BDE] hover:shadow-none border max-h-[40px]  active:bg-[#f9f9f9] border-1-black !text-primary shadow-none"
                    iconLeft={
                      <AiOutlinePlus className="text-primary text-[15px] font-semibold" />
                    }
                  />
                </div>
              </div>
              <div
                // ref={outputDivRef}
                className="w-full p-8 sm:w-[50%] h-screen pb-24 sm:pb-0"
              >
                <OutputTemplate
                  pageContent={pageContent}
                  // outputContentLan={outputContent?.data}
                  //   output_ref={outputContent?._id}
                    template_id={"landing-page"}
                  //   formValues={formValues}
                  generateLoading={isLoading}
                />
              </div>
            </div>
            {/* buttons on mob screen */}
            <div className="flex flex-col  sm:hidden bg-gradient-to-b z-50 h-[170px] w-full from-transparent to-white  fixed bottom-0 items-center   justify-center flex-shrink-0 pt-10  space-y-5">
              <ButtonCommon
                onClick={handleAddAccordion}
                title={"Add Section"}
                className="py-2.5 !text-[11px] max-w-[90%] bg-white  border-[#096BDE] hover:shadow-none border max-h-[40px]  active:bg-[#f9f9f9] border-1-black !text-primary shadow-none"
                iconLeft={
                  <AiOutlinePlus className="text-primary text-[18px] font-semibold" />
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPageGenerator;
