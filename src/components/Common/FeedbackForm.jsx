import React from 'react'
import CommonModal from './CommonModal'
import { FiArrowRight } from 'react-icons/fi'
import { useForm } from 'react-hook-form';
import { useGlobalFeedbackMutation } from '../../features/auth/authApi';
import toast from 'react-hot-toast';
import { feedbackOptions } from '../../utils/data/selectOptions';
import FormInput from './FormInput';

const FeedbackForm = ({handleVisible, visibleFeedback, defaultValue}) => {
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

      const [globalFeedback, {isLoading}] = useGlobalFeedbackMutation()

  const sendFeedback = async ({category, feedback_text}) => {
    if(!feedback_text && !category) return;
    const loadingId = toast.loading("Loading...");
    try {
      const result = await globalFeedback({category: category || defaultValue, feedback_text});
      if (result?.data) {
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
      handleVisible()
      setValue("category", "");
      setValue("feedback_text", "");
    }
  }
  return (
    <CommonModal
          className="!w-11/12 !max-w-3xl !h-fit p-0 pb-2 md:pb-0 !z-50  "
          title="Leave Feedback"
          btnText="Send"
          handleOpen={handleVisible}
          open={visibleFeedback}
          icon={<FiArrowRight />}
          headerClass="border-b border-[#091E4224] py-4 px-5"
          actionsClass="p-5"
          onClick={handleSubmit(sendFeedback)}
          btnDisabled={isLoading}
        >
          <div className=" flex flex-col p-3">
            <FormInput
              type="select"
              name="category"
              title={"Pick a category"}
              placeholder={"Select"}
              selectOptions={feedbackOptions}
              defaultValue={defaultValue}
              className="bg-base-100"
              control={control}
              register={register}
            />
            <FormInput
              name={"feedback_text"}
              title={"Your Feedback"}
              placeholder={"Desciption"}
              register={register}
              type={"textarea"}
              // error={errors?.email?.message}
            />
          </div>
        </CommonModal>
  )
}

export default FeedbackForm