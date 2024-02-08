import React, { useState, useRef, useEffect } from "react";
import { MdSave, MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import FormInput from "../../components/Common/FormInput";
import OutputTemplate from "../../components/Templates/OutputTemplate";
import { useForm } from "react-hook-form";
import {
  businessOptions,
  savedInputOptions,
} from "../../utils/data/selectOptions";
import ButtonCommon from "../../components/Common/Button";
import CommonModal from "../../components/Common/CommonModal";
import {
  useFetchAllPresetsQuery,
  useSavePresetMutation,
  useTemplateOutputMutation,
} from "../../features/templates/templateApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";

const TempForm = ({ tempForm, setTempForm }) => {
  const { title, inputs, template_id } = tempForm;
  const [open, setOpen] = useState(false);
  const [outputContent, setOutputContent] = React.useState("");
  const [presetTitle, setPresetTitle] = useState("");
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
    if (outputContent?.data?.length) {
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
  const [isStreaming, setIsStreaming] = useState(false)


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

  const saveSubmitStream = async (data) => {
    const newData = { ...data };
    if ("saved_inputs" || "bussId" in newData) {
      delete newData.saved_inputs;
      delete newData.bussId;
    }
    console.log(newData)
    setIsStreaming(true)
    setOutputContent("")
    const response = await fetch(
      "https://dev-api.wordlab.ai/endpoint/v1/output/generate-stream",
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
        break;
      }

      // Convert the value to a string
      const textDecoder = new TextDecoder("utf-8");

      // Convert Uint8Array to string using TextDecoder
      const characters = textDecoder.decode(value);

      setOutputContent((prevContent) => prevContent + characters);
    }
  };

  // Save Preset

  const [savePreset] = useSavePresetMutation();
  

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
    { isLoading: generateLoading, data: outputData, error },
  ] = useTemplateOutputMutation();

  React.useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const saveSubmit = async (data) => {
    try {
      const response = await generateOutput({
        template_id,
        form_fields: { ...data, buss_id: "" },
        token: auth?.token,
      });
      if (response?.data?.message) {
        toast.success(`${response?.data.message} successfully!`);
        setOutputContent(response.data?.payload);
      }
    } catch (error) {
      toast.error("An Error Occured");
      // reset();
    } finally {
      reset();
    }
  };

  return (
    <div className="flex relative flex-col justify-between h-full w-full pb-10  overflow-y-scroll scrollbar-default">
      <div className="h-10 sticky bg-base-100 z-40 shadow-md top-0 px-4 py-6 flex justify-between items-center">
        <MdArrowBack
          onClick={() => setTempForm(null)}
          className="text-base-content text-[18px] cursor-pointer"
        />
        <div className="">
          <h1 className="text-[13px] font-[600]">{title}</h1>
        </div>
        <div />
      </div>

      <div>
        <div className=" pt-6 pb-0 px-4 border-t-0 border-b-1 sm:border-b-0 border-l-0 border border-r-1 border-[#E9EAEB]">
          <div className="mb-auto space-y-8">
            {/* form inputs */}
            <p className="text-[13.5px] text-light">
              Lorem ipsum dolor sit amet consectetur. In feugiat pharetra
              turpis.
            </p>
            <div className="space-y-7 pb-10 ">
              <FormInput
                type="select"
                name="saved_inputs"
                title={"Saved Inputs"}
                placeholder={"Product name + title"}
                selectOptions={
                  (!isError || !isLoading || presetsData) && presetsData
                }
                control={control}
                register={register}
              />
              {/* <FormInput
              type="select"
              name="output_profile"
              title={"Select Output Profiles"}
              placeholder={"General"}
              selectOptions={businessOptions}
              control={control}
              register={register}
            /> */}
              {inputs &&
                inputs.map((inp, ind) => (
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
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="-pb-20">
        <div ref={outputDivRef} className="w-full p-8  pb-24 sm:pb-0">
          <OutputTemplate
            outputContent={outputContent}
            output_ref={outputContent?._id}
            template_id={template_id}
            formValues={formValues}
            generateLoading={isStreaming}
          />
        </div>
      </div>

      <div className="fixed glass bottom-0 flex px-3 z-20 justify-center items-center   w-[-webkit-fill-available]  ">
      <ButtonCommon
          onClick={handleSubmit(saveSubmitStream)}
          title={isStreaming ? "Generating..." : "Generate Output"}
          disabled={isStreaming ? true : false}
          className="py-2.5 !text-[11px] !w-[90%] max-h-[40px]"
        />
      </div>
    </div>
  );
};

export default TempForm;
