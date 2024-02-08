import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import FormInput from "../Common/FormInput";
import ButtonCommon from "../Common/Button";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginValidator } from "../../validators/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForgetPassMutation,
  useLoginMutation,
  useLoginSocialMutation,
} from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import CommonModal from "../Common/CommonModal";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";

const AuthForm = () => {
  const [login, { isLogging, error, data }] = useLoginMutation();
  const [email, setEmail] = useState("")
  const [forgetPass, {isLoading: isSubmitting}] = useForgetPassMutation()
  const handleOpen = () => setOpen(!open);


  const handleForgetPass = async () => {
    const loadingId = toast.loading("Loading...");
    try {
      const result = await forgetPass({email});
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
      handleOpen()
    }
  }

  const [loginSocial, { isLoading: isGoogleLogging }] =
    useLoginSocialMutation();
  const [open, setOpen] = useState(false);
  const isLoading = isLogging || isGoogleLogging;
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidator),
    mode: "onChange",
  });

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result?.user;
        const loadingId = toast.loading("Loading...");
        try {
          const result = await loginSocial({ email: user?.email });
          if (result?.data) {
            toast.success(result?.data?.message, {
              id: loadingId,
            });

            dispatch(
              setCredentials({
                user: result?.data?.payload?.user,
                token: result?.data?.payload?.token,
              })
            );
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
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = async (data) => {
    const loadingId = toast.loading("Loading...");
    try {
      const result = await login(data);
      if (result?.data) {
        toast.success(result?.data?.message, {
          id: loadingId,
        });

        dispatch(
          setCredentials({
            user: result?.data?.payload?.user,
            token: result?.data?.payload?.token,
          })
        );
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
    }
  };
  return (
    <>
      <h1 className=" text-[26px] text-base-content font-[600]">Login</h1>
      <p className="my-6 text-light text-[15px] font-[400]">
      Log in with your registered email and password or sign in with Google.
      </p>

      {/* Signin Button Google  */}
      <GoogleButton onClick={handleGoogleAuth} title={"Login With Google"} />

      {/* Or Separator  */}
      <div className="mt-6 flex justify-center items-center  pt-3 ">
        <div className="border-t border-[#091E4224]-300 flex-grow mr-3" />
        <div className="text-[15px] text-[#626F86] font-[400]">Or</div>
        <div className="border-t border-[#091E4224]-300 flex-grow ml-3" />
      </div>

      {/* Form  */}
      <form className="mt-6">
        <FormInput
          name="email"
          title={"Email"}
          placeholder={"Enter your email here"}
          register={register}
          error={errors?.email?.message}
        />
        <FormInput
          title={"Password"}
          placeholder={"Enter your password here"}
          register={register}
          name="password"
          inputType="password"
          error={errors?.password?.message}
        />
      </form>

      {/* Remember me & Forgot password  */}

      <div className="flex justify-between items-center">
        <FormInput
          className={"!text-red-400 text-[15px] !items-start pl-2"}
          type="checkbox"
          title={"Remember me"}
        />
        <p
          onClick={handleOpen}
          className="font-[500] text-[15px] underline text-primary cursor-pointer"
        >
          Forgot Password?
        </p>
      </div>
      {/* Login / Continue Button  */}
      <ButtonCommon
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
        title={"Login"}
        className="my-6"
      />

      {/* Dont have an account  */}

      <NavLink to="/signup" className="flex pt-1 justify-center mt-6">
        <p>{"Don't have an account?"}</p>
        <p className="font-[500] text-[15px] underline text-primary cursor-pointer pl-1">
          Sign Up
        </p>
      </NavLink>

      <CommonModal
        title="Forgot Password?"
        open={open}
        handleOpen={handleOpen}
        btnText="Confirm"
        className="space-y-6"
        onClick={handleForgetPass}
        btnDisabled={isSubmitting}
      >
        <FormInput
          name="email"
          title={"Email"}
          placeholder={"Enter your email here"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </CommonModal>
    </>
  );
};

export default AuthForm;
