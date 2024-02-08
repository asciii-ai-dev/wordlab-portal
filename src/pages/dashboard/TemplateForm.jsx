import React, { useState, useRef, useEffect } from "react";
import { MdDeleteOutline, MdSave } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import FormInput from "../../components/Common/FormInput";
import OutputTemplate from "../../components/Templates/OutputTemplate";
import { useForm } from "react-hook-form";
import { savedInputOptions } from "../../utils/data/selectOptions";
import ButtonCommon from "../../components/Common/Button";
import CommonModal from "../../components/Common/CommonModal";
import {
  useDeletePresetMutation,
  useFetchAllPresetsQuery,
  useFetchUserPlanInfoQuery,
  useRecentOutputsQuery,
  useSavePresetMutation,
  useStreamTemplateMutation,
  useTemplateOutputMutation,
  useVotingFeedbackMutation,
} from "../../features/templates/templateApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import TemplateHeader from "../../components/Templates/TemplateHeader";
import { BASE_URL } from "../../utils/constants";
import PlanBadge from "../../components/Common/PlanBadge";
import UseOutputProfile from "../../utils/hooks/useOutputProfile";

const TemplateForm = () => {
  const {
    state: {
      title,
      inputs,
      template_id,
      description,
      businessData,
      businessTemps,
    },
  } = useLocation();

  const [bussId, setBussId] = useState("");
  const handleBussId = (e) => {
    setBussId(e);
  };

  const businessOptions = businessData?.map((v) => ({
    label: "" || v?.comp_name,
    value: "" || v?.id,
  }));

  const acceptablePlans = ["Pro", "Standard"];
  const { data: userData } = useFetchUserPlanInfoQuery();

  const [open, setOpen] = useState(false);
  const [outputContent, setOutputContent] = React.useState("")
  const [presetTitle, setPresetTitle] = useState("");
  const [isStreaming, setIsStreaming] = useState(false)
  const outputDivRef = useRef(null);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const {
    data: presetsData,
    isLoading,
    isError,
    refetch,
  } = useFetchAllPresetsQuery({
    template_id,
  });

  const handlePresetTitle = (e) => {
    setPresetTitle(e.target.value);
  };

  React.useEffect(() => {
    // Scroll to the div when data is updated
    if (outputContent?.data?.length && window.innerWidth < 768) {
      outputDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [outputContent]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues: getTemplateValues,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const formValues = getTemplateValues();
  const input_saved = watch("saved_inputs");

  async function fetchPresetData(presetId) {
    if (!presetId) return;
    const loadingId = toast.loading("Fetching...");
    try {
      const response = await fetch(`${BASE_URL}/user-input/get/${presetId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      const result = await response.json();

      if (response.status === 500) {
        toast.error(result?.message, {
          id: loadingId,
        });
      }

      if (result?.data?.form_fields) {
        const keys = Object.keys(result.data.form_fields);
        console.log(keys);
        keys?.map((v) => {
          if (v !== "saved_inputs") {
            setValue(v, result?.data?.form_fields[v]);
          }
        });
        toast.success("Input Populated Successfully!", {
          id: loadingId,
        });
      }
    } catch (error) {
      console.error("Error fetching preset data:", error);
      throw error;
    } finally {
      toast.dismiss(loadingId);
    }
  }
  useEffect(() => {
    if (input_saved) {
      fetchPresetData(input_saved);
    }
  }, [input_saved]);

  const { auth } = useSelector((state) => state);

  // Save Preset

  const [savePreset, { isLoading: isSaving }] = useSavePresetMutation();

  const submitPreset = async () => {
    const loadingId = toast.loading("Loading...");
    try {
      const result = await savePreset({
        template_id,
        title: presetTitle,
        form_fields: { ...formValues },
        token: auth?.token,
      });
      if (result?.data) {
        refetch();
        toast.success(result?.data?.message, {
          id: loadingId,
        });
      } else {
        toast.error(result?.error?.data?.message, {
          id: loadingId,
        });
      }
    } catch (error) {
      toast.error("An Error Occured", {
        id: loadingId,
      });
    } finally {
      handleOpen();
    }
  };


  // Generate Output
  const [
    generateOutput,
    { isLoading: generateLoading },
  ] = useTemplateOutputMutation();

  const { data: recents, refetch: refetchRecents } = useRecentOutputsQuery({
    limit: 5,
    template_id: template_id || "",
  },
    {
      enabled: !!template_id, // If 'template_id' is present, enable the query
    })
  const saveSubmitStream = async (data) => {
    const newData = { ...data };
    if ("saved_inputs" || "bussId" in newData) {
      delete newData.saved_inputs;
      delete newData.bussId;
    }
    setIsStreaming(true)
    setOutputContent("")
    const response = await fetch(
      `${BASE_URL}/output/generate-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          template_id: template_id,
          form_fields: template_id === "comparison-article" ? { urls: [newData['url1'], newData['url2']] } : { ...newData }
        }),
      }
    );

    const reader = response.body.getReader();
    reader.read().finally(() => {
      setIsStreaming(false)
    })

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        refetchRecents()
        break;
      }

      // Convert the value to a string
      const textDecoder = new TextDecoder("utf-8");

      // Convert Uint8Array to string using TextDecoder
      const characters = textDecoder.decode(value);

      setOutputContent((prevContent) => prevContent + characters);
    }
  };


  // const saveSubmitStream = async (data) => {
  //   const newData = { ...data };
  //   if ("saved_inputs" || "bussId" in newData) {
  //     delete newData.saved_inputs;
  //     delete newData.bussId;
  //   }

  //   setIsStreaming(true);
  //   setOutputContent("");

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/output/generate-stream`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${auth?.token}`,
  //         },
  //         body: JSON.stringify({
  //           template_id: template_id,
  //           form_fields: template_id === "comparison-article" ? { urls: [newData['url1'], newData['url2']] } : { ...newData }
  //         }),
  //       }
  //     );

  //     const reader = response.body.getReader();

  //     while (true) {
  //       const { done, value } = await reader.read();
  //       reader.read().finally(() => {
  //         setIsStreaming(false)
  //       })

  //       if (done) {
  //         break;
  //       }

  //       // Convert the value to a string
  //       const textDecoder = new TextDecoder("utf-8");

  //       // Convert Uint8Array to string using TextDecoder
  //       const characters = textDecoder.decode(value);

  //       setOutputContent((prevContent) => prevContent + characters);
  //     }


  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error fetching or streaming data:", error);
  //   } finally {
  //     refetchRecents();
  //   }
  // };



  const saveSubmit = async (data) => {
    const newData = { ...data, bussId };
    if ("saved_inputs" || "bussId" in newData) {
      delete newData.saved_inputs;
      delete newData.bussId;
    }

    try {
      const response = await generateOutput({
        template_id,
        form_fields: { ...newData },
        token: auth?.token,
        query: bussId ? `?business_id=${bussId}` : "",
      });
      if (response?.data?.message) {
        console.log(response.data?.payload)
        toast.success(`${response?.data.message} successfully!`);
        setOutputContent(response.data?.payload?.data);
      }
    } catch (error) {
      toast.error("An Error Occured");
      // reset();
    } finally {
      reset();
    }
  };

  const [deletePreset, { isLoading: isDeletingPreset }] =
    useDeletePresetMutation();

  const handleDeletePreset = async (presetId) => {
    const loadingId = toast.loading("Loading...");
    try {
      const result = await deletePreset({
        id: presetId,
      });
      if (!result?.error?.data?.message) {
        toast.success("Preset Deleted Successfully", {
          id: loadingId,
        });
      } else {
        toast.error(result?.error?.data?.message, {
          id: loadingId,
        });
      }
    } catch (error) {
      toast.error("An Error Occured", {
        id: loadingId,
      });
    } finally {
      refetch();
    }
  };

  const formatOptionLabel = ({ value, label }) => {
    return (
      <div
        onClick={(e) => e.preventDefault()}
        className="flex relative jusify-between items-center w-full"
      >
        <div>{label}</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeletePreset(value);
          }}
          disabled={isDeletingPreset}
          className="absolute right-0"
        >
          <MdDeleteOutline className="text-red-600 z-50 text-[18px]" />
        </button>
      </div>
    );
  };

  return (
    <div className="h-screen relative sm:overflow-y-hidden  ">
      <TemplateHeader navigate={navigate} title={title} />

      <div className="sm:overflow-y-auto  h-screen">
        <div className="flex flex-col bg-base-100 sm:flex-row relative h-full">
          <div className="sm:flex-1 flex flex-col !justify-between p-8 border-t-0 border-b-1 sm:border-b-0 border-l-0 border border-r-1 border-[#E9EAEB]">
            <div
              className="mb-auto space-y-8 h-full sm:overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "calc(100% - 80px)" }}
            >
              {/* form inputs */}
              <p className="text-[13.5px] text-light">{description}</p>
              <div className="space-y-7 pb-10 relative">
                {acceptablePlans?.includes(userData?.plan_info?.name) ===
                  false ? (
                  <div className="absolute right-2 top-3 flex gap-x-3">
                    <PlanBadge planName="Pro" />
                    <PlanBadge planName="Standard" />
                  </div>
                ) : null}
                {businessTemps && businessTemps?.includes(template_id) ? (

                  <UseOutputProfile
                    value={bussId}
                    onChange={handleBussId}
                    template_id={template_id}
                  />
                ) : null}
                <FormInput
                  type="select"
                  name="saved_inputs"
                  title={"Saved Inputs"}
                  placeholder={"Product name + title"}
                  disabled={
                    acceptablePlans?.includes(userData?.plan_info?.name) ===
                      true
                      ? false
                      : true
                  }
                  selectOptions={
                    (!isError || !isLoading || presetsData) && presetsData
                  }
                  className="bg-base-100"
                  control={control}
                  register={register}
                  formatOptionLabel={formatOptionLabel}
                // value={selectPreset}
                // onChange={handlePresetSelect}
                />

                {inputs &&
                  inputs.map((inp, ind) => (
                    <div>
                      <FormInput
                        key={ind}
                        name={inp?.name}
                        title={inp?.title}
                        placeholder={inp?.placeholder}
                        register={register}
                        control={control}
                        type={inp?.type}
                        maxLength={inp?.["max-length"]}
                        required={inp?.required}
                        selectOptions={inp?.selectOptions}
                        tooltip={inp?.tooltip}
                      // error={errors?.email?.message}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className=" hidden w-full pb-10 sm:flex justify-end items-end mb-4  h-[120px] space-x-5 ml-auto sticky !bottom-1">
              {acceptablePlans?.includes(userData?.plan_info?.name) === true ? (
                <ButtonCommon
                  onClick={handleOpen}
                  title={"Save State"}
                  className="py-2.5 !text-[11px] max-w-[160px] bg-white  border-[#E9EAEB] hover:shadow-none border max-h-[40px]  active:bg-[#f9f9f9] border-1-black !text-dark shadow-none"
                  iconRIght={<MdSave className="text-dark h-4  pb-0.5" />}
                />
              ) : null}
              <ButtonCommon
                onClick={handleSubmit(saveSubmitStream)} title={generateLoading ? "Generating..." : "Generate Output"}
                disabled={generateLoading || isStreaming ? true : false}
                className="py-2.5 !text-[11px]  max-w-[160px] max-h-[40px] active:bg-blue-500"
              />
            </div>
          </div>
          <div
            ref={outputDivRef}
            className="w-full p-8 sm:w-[45%] h-screen pb-24 sm:pb-0"
          >
            <OutputTemplate
              outputContent={outputContent}
              output_ref={outputContent?._id}
              template_id={template_id}
              formValues={formValues}
              generateLoading={generateLoading || isStreaming}
            />
          </div>
        </div>
        <CommonModal
          title="Save Template State"
          open={open}
          handleOpen={handleOpen}
          btnText="Save"
          className="space-y-6"
          showActions={true}
          onClick={submitPreset}
          btnDisabled={isSaving}
        >
          <FormInput
            name="title"
            title={"Title"}
            value={presetTitle}
            onChange={handlePresetTitle}
            placeholder={"Give this form state a title"}
          // onClick={}
          />
        </CommonModal>
      </div>

      {/* buttons on mob screen */}
      <div className="flex flex-col  sm:hidden bg-gradient-to-b z-50 h-[170px] w-full from-transparent to-white  fixed bottom-0 items-center   justify-center flex-shrink-0 pt-10  space-y-5">
        {acceptablePlans?.includes(userData?.plan_info?.name) === true ? (
          <ButtonCommon
            onClick={handleOpen}
            title={"Save State"}
            className="py-2.5 !text-[11px] !w-[90%] bg-white border-[#E9EAEB] hover:shadow-none border max-h-[40px] border-1-black !text-dark shadow-none"
            iconRIght={<MdSave className="text-dark h-4 pb-0.5" />}
          />
        ) : null}
        <ButtonCommon
          onClick={handleSubmit(saveSubmitStream)}
          title={generateLoading ? "Generating..." : "Generate Output"}
          disabled={generateLoading || isStreaming ? true : false}
          className="py-2.5 !text-[11px] !w-[90%] max-h-[40px]"
        />
      </div>
    </div>
  );
};

export default TemplateForm;
