import React from "react";
import Header from "../../components/Dashboard/Header";
import FormInput from "../../components/Common/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassValidator } from "../../validators/auth";
import { useForm } from "react-hook-form";
import ButtonCommon from "../../components/Common/Button";
import toast from "react-hot-toast";
import { useResetPassMutation } from "../../features/auth/authApi";
import { useNavigate, useParams } from "react-router-dom";

const ResetPass = () => {
  const [resetPass, { isLoading }] = useResetPassMutation();
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPassValidator),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const loadingId = toast.loading("Loading...");
    try {
      const result = await resetPass({ newPass: data?.password, token });
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
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink">
        <Header />
      </div>
      <div className="flex-grow flex flex-col justify-center items-center w-full  gap-y-7">
        <h4 className="text-base-content">Reset Password</h4>
        <FormInput
          title={"Password"}
          placeholder={"Enter your password here"}
          register={register}
          name="password"
          inputType="password"
          error={errors?.password?.message}
          mainClassName="md:w-[400px] w-[90%]"
        />
        <FormInput
          title={"Password"}
          placeholder={"Confirm your password"}
          register={register}
          name="confirmPassword"
          inputType="password"
          error={errors?.confirmPassword?.message}
          mainClassName="md:w-[400px] w-[90%]"
        />
        <ButtonCommon
          title="Reset Password"
          className={"md:!w-[400px] !w-[90%]"}
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default ResetPass;
