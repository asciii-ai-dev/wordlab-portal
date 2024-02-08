import React from "react";
import BusinessLanding from "../../components/Business/BusinessLanding";
import CommonModal from "../../components/Common/CommonModal";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import FormInput from "../../components/Common/FormInput";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import BusinessRequest from "../../components/Business/BusinessRequest";
import { useGetBusinessQuery, useRegisterBusinessMutation } from "../../features/business/businessApi";
import { toast } from "react-hot-toast";

const Business = () => {
  const [open, setOpen] = useState(false);
  const [usecases, setUsecases] = useState([]);
  const [otherUsecases, setOtherUsecases] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");
  const validation = companyName && companyWeb && (usecases?.length || otherUsecases?.length)

  const handleVisible = () => {
    setOpen(() => !open);
  };

  const handleCheckboxChange = (event) => {
    const usecase = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setUsecases((prevState) => [...prevState, usecase]);
    } else {
      setUsecases((prevState) =>
        prevState.filter((selected) => selected !== usecase)
      );
    }
  };

  function handleChange(usecase) {
    if (!usecases.includes(usecase)) {
      setOtherUsecases(usecase);
    }
  }
  const [registerBusiness, { isLoading }] = useRegisterBusinessMutation();
  const registerSubmit = async () => {
    let loadingId; 
    try {
      if(validation){
        loadingId = toast.loading("Loading...");
        const res = await registerBusiness({
          comp_name: companyName,
          logo: "Logo_url",
          website: companyWeb,
          use_cases: [...usecases, ...otherUsecases]
        })
        toast.success("Business Registered Successfully!", {
          id: loadingId,
        });
      }
    } catch (error) {
      toast.error("An Error Occured", {
        id: loadingId,
      });
      toast.dismiss(loadingId);
    }
    finally{
      setCompanyName("");
      setCompanyWeb("");
      setUsecases([]);
      setOtherUsecases([]);
      handleVisible()
      setTimeout(() => {
        toast.dismiss(loadingId)
      },2500)
    }
  }
  const { data: businessData = [], isLoading: isFetchingBusiness } = useGetBusinessQuery();


  return (
    <>
      {businessData?.length ? (
        <BusinessRequest handleVisible={handleVisible} businessData={businessData} isLoading={isFetchingBusiness} />
      ) : (
        <BusinessLanding
          handleVisible={handleVisible}
          icon={<FiArrowRight />}
        />
      )}
      <CommonModal
        className="!w-11/12 !max-w-5xl p-0 pb-2 md:pb-0  "
        title="Business Registration"
        btnText="Register"
        handleOpen={handleVisible}
        open={open}
        icon={<FiArrowRight />}
        headerClass="border-b border-[#091E4224] py-4 px-5"
        actionsClass="p-5"
        onClick={(!validation || !isLoading) && registerSubmit}
      >
        <div className="p-5 space-y-6">
          <div>
            <p className="text-light font-[400] text-[13px]">
              Wordlab allows you to create customized language models that speaks
              in your own brand tone and follow a consistent natural writting
              flow just like your own writers.
              <span className="text-base-content underline font-[400] text-[12px] pl-1">
                Learn More
              </span>
            </p>
          </div>
          <div class="flex flex-wrap -mx-4 ">
            <div class="w-full lg:w-1/2 px-4 ">
              <FormInput
                name="companyName"
                title={"Company Name"}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={"Please enter your company name here"}
              />
            </div>
            <div class="w-full lg:w-1/2 px-4 ">
              <FormInput
                name="companyWeb"
                value={companyWeb}
                onChange={(e) => setCompanyWeb(e.target.value)}
                title={"Company Website"}
                placeholder={"Please enter your company's website URL"}
              />
            </div>
          </div>
          <div className="hidden md:block space-y-3">
            <div>
              <p className="pb-2 text-[13.5px] font-[500] text-base-content">
                Use Cases
                <span className="text-red-600 text-sm ">*</span>
              </p>
              <p className="text-light font-[400] text-[13px]">
                Please select all usecases
              </p>
            </div>
            <div className="flex flex-col justify-start sm:justify-between">
              <div className="flex flex-row">
                <div className="w-full">
                  <FormInput
                    type="checkbox"
                    name="option1"
                    value="Blog Posts"
                    onChange={handleCheckboxChange}
                    title="Blog Posts"

                  />
                </div>
                <div className="w-full">
                  <FormInput
                    type="checkbox"
                    name="option2"
                    value="Landing Pages"
                    onChange={handleCheckboxChange}
                    title="Landing Pages"
                    key={1}
                  />
                </div>
                <div className="w-full">
                  <FormInput
                    type="checkbox"
                    name="option3"
                    value="Customer Replies"
                    onChange={handleCheckboxChange}
                    title="Customer Replies"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <div className="w-full">
                  <FormInput
                    type="checkbox"
                    name="option4"
                    value="Social Media"
                    onChange={handleCheckboxChange}
                    title="Social Media"
                  />
                </div>
                <div className="w-full">
                  <FormInput
                    type="checkbox"
                    name="option5"
                    value="Copy writing"
                    onChange={handleCheckboxChange}
                    title="Copy writing"
                  />
                </div>
                <div className="w-full">
                  <FormInput
                    type="checkbox"
                    name="option6"
                    value="Email"
                    onChange={handleCheckboxChange}
                    title="Email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-light font-[400] text-[13px] text-justify">
              Besides the above use-cases you can also request for any other
              use-case and also provide data. For example : customer support
              email response, internal documentation etc. You can send us
              anonymous data to protect customer privacy
            </p>
          </div>
          <div>
            <TagsInput  className="bg-base-300 bg-opacity-60 text-base-content" value={otherUsecases} onChange={handleChange} />
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default Business;
