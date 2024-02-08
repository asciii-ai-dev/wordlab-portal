import React from "react";
import CommonModal from "../Common/CommonModal";
import FormInput from "../Common/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePassValidator } from "../../validators/auth";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../features/auth/authApi";

const ChangePasswordModal = ({ passwordModal, setPasswordModal }) => {
  const [changePass, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePassValidator),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const loadingId = toast.loading("Loading...");
    try {
      const result = await changePass({ newPass: data?.newPassword });
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
      reset();
      setPasswordModal(false);
    }
  };
  return (
    <CommonModal
      // key={passwordModal ? 1 : 0}
      open={passwordModal}
      title="Change Password"
      handleOpen={() => setPasswordModal(!passwordModal)}
      btnText="Change"
      showActions={true}
      className="space-y-6"
      onClick={handleSubmit(onSubmit)}
      btnDisabled={isLoading}
    >
      <div className="space-y-4">
        <FormInput
          title={"New Password"}
          placeholder={"Enter your new password here"}
          register={register}
          name="newPassword"
          inputType="password"
          error={errors?.newPassword?.message}
        />
        <FormInput
          title={"Confirm New Password"}
          placeholder={"Confirm your new password here"}
          register={register}
          name="confirmPassword"
          inputType="password"
          error={errors?.confirmPassword?.message}
        />
      </div>
    </CommonModal>
  );
};

export default ChangePasswordModal;
