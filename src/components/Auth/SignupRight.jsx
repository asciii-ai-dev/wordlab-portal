import React, { useState, useCallback, useMemo } from "react";
import Logo from "../../assets/images/wordlab-logo.png";
import EmailVerification from "./signup/EmailVerification";
import SetPassword from "./signup/SetPassword";
import AboutYourself from "./signup/AboutYourself";
import Plan from "./signup/Plan";
import SignupForm from "./SignupForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidator } from "../../validators/auth";
import ButtonCommon from "../Common/Button";
import { getItem, setItem } from "../../utils/localSotrage";
import {
  useRequestOptMutation,
  useSignupMutation,
  useVerifyEmailMutation,
} from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";

const SignupRight = () => {
  const [step, setStep] = useState(-1);
  const [otp, setOtp] = useState();
  const handleOtp = (enteredOtp) => {
    setOtp(() => enteredOtp);
  };
  const [userType, setUserType] = useState("EMAIL");

  const [plansSelected, setPlansSelected] = useState(new Set());
  const schemaResolver =
    step === -1
      ? signupValidator.step1Schema
      : step == 1
      ? signupValidator.step2Schema
      : step == 2
      ? signupValidator.step3Schema
      : null;
  const defaultValues = useMemo(() => {
    return {
      email: getItem("signinEmail") || "",
    };
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    control,
    setValue,
    watch,
  } = useForm({
    resolver: schemaResolver != null && yupResolver(schemaResolver),
    defaultValues,
  });

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result?.user;
        setValue("email", user?.email);
        setValue("name", user?.displayName);
        setUserType("GOOGLE");
        setTimeout(() => {
          setStep((cur) => cur + 3);
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [requestOtp, { isLoading: isRequestingOtp }] = useRequestOptMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyEmailMutation();
  const [createAccount, { isLoading: isSubmitting }] = useSignupMutation();
  const isLoading = isRequestingOtp || isSubmitting || isVerifyingOtp;

  const handleReqOTP = async (noNextStep) => {
    const res = await requestOtp({
      name: watch("name"),
      email: watch("email"),
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      if (!noNextStep) {
        setStep((cur) => cur + 1);
      }
    } else {
      if (res?.error?.data?.payload?.is_verified) {
        toast.success(res?.error?.data?.message);
        setStep((cur) => cur + 2);
      } else {
        toast.error(res?.error?.data?.message);
      }
    }
  };

  const handleStepCompletion = async () => {
    if (step === 0) {
      console.log({ otp: otp, email: watch("email") });
      const res = await verifyOtp({
        otp: otp ? otp : null,
        email: watch("email"),
      });

      if (res?.data?.payload?.is_verified) {
        toast.success(res?.data?.message);
        setStep((cur) => cur + 1);
      } else {
        if (res?.error?.data) {
          toast.error(res?.error?.data?.message);
        }
      }
      return;
    }
    const valid = await trigger(); // trigger validation on all fields
    if (valid) {
      if (step === -1) {
        await handleReqOTP();
        setUserType("EMAIL");
      } else if (step === 2) {
        setTimeout(() => {
          setStep((cur) => cur + 1);
          return;
        }, 500);
      } else {
        setStep((cur) => cur + 1);
      }
    }
  };

  const navigate = useNavigate();

  const submitForm = async (data) => {
    if ([...plansSelected].length < 1) {
      toast.error("Please Select atleast one plan");
      return;
    }
    const loadingId = toast.loading("Loading...");
    try {
      const { confirmPassword, ...newData } = data;
      const result = await createAccount({
        ...newData,
        user_type: userType,
        plansSelected: [...plansSelected],
      });
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
      setTimeout(() => {
        toast.dismiss(loadingId);
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="bg-base-100  flex-grow overflow-y-auto flex flex-col md:pt-5 pb-3 items-center md:justify-center   ">
      <div className="block md:hidden self-center flex-col pt-8 h-[10%]">
        <Link to="/login">
          <img
            src={Logo}
            width={100}
            height={100}
            alt="ascii_logo"
            className="object-contain  "
          />
        </Link>
      </div>

      <form
        onSubmit={
          step === 3 ? handleSubmit(submitForm) : (e) => e.preventDefault()
        }
        className=" w-[92%] md:w-[60%] flex flex-col justify-center my-4 md:mt-0 space-y-7 flex-grow md:flex-grow-0"
      >
        {step === -1 && (
          <SignupForm
            handleStepCompletion={handleStepCompletion}
            step={step}
            register={register}
            errors={errors}
            isLoading={isLoading}
            handleGoogleAuth={handleGoogleAuth}
          />
        )}
        {step === 0 && (
          <EmailVerification
            step={step}
            errors={errors}
            handleStepCompletion={handleStepCompletion}
            otp={otp}
            handleOtp={handleOtp}
            handleReqOTP={handleReqOTP}
            isLoading={isLoading}
          />
        )}
        {step === 1 && (
          <SetPassword step={step} register={register} errors={errors} />
        )}
        {step === 2 && (
          <AboutYourself
            step={step}
            register={register}
            errors={errors}
            control={control}
          />
        )}
        {step === 3 && (
          <Plan
            step={step}
            register={register}
            errors={errors}
            plansSelected={plansSelected}
            setPlansSelected={setPlansSelected}
          />
        )}
        {step != -1 && (
          <div className="w-full mt-3">
            <ButtonCommon
              disabled={isLoading}
              onClick={step < 3 ? handleStepCompletion : undefined}
              type={step === 3 ? "submit" : "button"}
              title={
                isLoading
                  ? "loading..."
                  : step === 3
                  ? "Get Started"
                  : "Continue"
              }
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupRight;
