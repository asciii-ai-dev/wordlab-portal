import React from "react";
import Header from "../../components/Dashboard/Header";
import { MdArrowBack, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import SettingsContainer from "../../components/Settings/SettingsContainer";
import SettingsElement from "../../components/Settings/SettingsElement";
import { businessOptions } from "../../utils/data/selectOptions";
import { useForm } from "react-hook-form";
import CommonModal from "../../components/Common/CommonModal";
import Plan from "../../components/Auth/signup/Plan";
import PasswordSecurity from "../../components/Settings/PasswordSecurity";
import FormInput from "../../components/Common/FormInput";
import PlansMembership from "../../components/Settings/PlansMembership";
import ButtonCommon from "../../components/Common/Button";
import PlansCard from "../../components/Common/PlansCard";
import WordBank from "../../components/Settings/WordBank";
import TransactionHistory from "../../components/Settings/TransactionHistory";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from "../../features/settings/settingsApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Plans from "../Plans";
import ChangePasswordModal from "../../components/Settings/ChangePasswordModal";

const Settings = () => {
  const { data, isLoading: isFetchingUser } = useGetUserQuery();
  const [selectedCategory, setSelectedCategory] = useState("Profile Settings");
  const [editMode, setEditMode] = useState({
    personal: false,
    additional: false,
  });
  const [open, setOpen] = useState(false);
  const [plansSelected, setPlansSelected] = useState(new Set());
  const [passwordModal, setPasswordModal] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [buyMore, setBuyMore] = useState("");
  const [subModal, setSubModal] = useState(false);
  const { auth } = useSelector((state) => state);
  const { register, handleSubmit, control } = useForm({
    mode: "onChange",
    // resolver: yupResolver(docValidation),
  });
  const navigate = useNavigate();
  const handleSelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);
  const handleEditMode = (cont) => {
    setEditMode((prevState) => ({ ...prevState, [cont]: !prevState[cont] }));
  };

  // console.log(user)

  const settingsMenu = [
    "Profile Settings",
    "Password & Security",
    "Plans & Membership",
    "Transaction History",
  ];

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const submitUpdate = async (body) => {
    let loadingId;
    try {
      loadingId = toast.loading("Loading...");
      const res = await updateProfile({
        name: data?.user?.name,
        // email: data?.user?.email,
        user_industry: data?.user?.user_industry,
        company: data?.user?.company,
        domain: data?.user?.domain,
        plansSelected:
          [...new Set(data?.user?.plansSelected.concat([...plansSelected]))] ||
          data?.user?.plansSelected,
        ...body,
      });
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: loadingId });
        console.log(res?.error?.data?.message);
      } else if (res?.data?.message) {
        toast.success(res?.data?.message, {
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
      }, 3500);
      setEditMode({ personal: false, additional: false });
    }
  };
  return (
    <div className="bg-base-100 min-h-screen">
      <Header />
      <div className="p-7 sm:p-9 space-y-7">
        <button
          onClick={() => navigate("/")}
          className="flex gap-x-2 items-center justify-center cursor-pointer rounded border border-[#dfe3e9] px-4 py-1"
        >
          <MdArrowBack className="text-light text-[16px] " />
          <p className="text-light text-[12px]">Back To Home</p>
        </button>
        <h1 className="text-[20px] text-base-content font-[500]">Settings</h1>
        {/* // main  */}

        <main className="flex bg-base-100 flex-col sm:flex-row sm:gap-x-5 gap-y-7">
          {/* menu */}
          <div className="flex sm:flex-col gap-y-5  sm:w-[23%] lg:w-[18%] sm:border-r sm:pr-8 h-full overflow-x-auto scrollbar-hide">
            {settingsMenu.map(
              (category, i) =>
                category !== null && (
                  <button
                    onClick={() => handleSelect(category)}
                    key={i}
                    type="button"
                    className={`${
                      category !== selectedCategory
                        ? "bg-base-100"
                        : " bg-[#096bde0f]"
                    } min-w-fit rounded-sm border-none duration-300  w-fit  py-[8px]`}
                  >
                    <p
                      className={` text-[13px] w-full px-3 ${
                        category !== selectedCategory
                          ? " !text-base-content"
                          : " text-primary"
                      }`}
                    >
                      {category}
                    </p>
                  </button>
                )
            )}
          </div>
          {/* Right Side */}
          <div className="flex-1 bg-base-100 flex flex-col gap-y-5">
            {selectedCategory === "Profile Settings" && (
              <>
                <SettingsContainer
                  title="Personal Information"
                  editMode={editMode?.personal}
                  rightBtn={
                    <MdModeEditOutline className="text-[35px] text-primary border border-[#f1f1f1] rounded-full p-1.5" />
                  }
                  rightBtnClick={() => handleEditMode("personal")}
                  isLoading={isLoading}
                  submit={handleSubmit(submitUpdate)}
                >
                  <ProfileSettings
                    register={register}
                    user={data?.user || {}}
                    editMode={editMode?.personal}
                    isLoading={isFetchingUser}
                  />
                </SettingsContainer>
                <SettingsContainer
                  title="Additional Information"
                  editMode={editMode?.additional}
                  rightBtn={
                    <MdModeEditOutline className="text-[35px] text-primary border border-[#f1f1f1] rounded-full p-1.5" />
                  }
                  rightBtnClick={() => handleEditMode("additional")}
                  isLoading={isLoading}
                  submit={handleSubmit(submitUpdate)}
                >
                  <div className="flex flex-col gap-y-6">
                    <SettingsElement
                      inputValue={data?.user?.user_industry || ""}
                      title="Occupation"
                      editMode={editMode?.additional}
                      inputType="select"
                      selectOptions={businessOptions}
                      control={control}
                      register={register}
                      name="user_industry"
                      isLoading={isFetchingUser}
                    />
                    <SettingsElement
                      inputValue={data?.user?.company || ""}
                      register={register}
                      name="company"
                      isLoading={isFetchingUser}
                      title="Company"
                      editMode={editMode?.additional}
                    />
                    <SettingsElement
                      inputValue={data?.user?.domain || ""}
                      register={register}
                      title="Domain"
                      editMode={editMode?.additional}
                      name="domain"
                      isLoading={isFetchingUser}
                    />
                    <SettingsElement
                      inputValue={data?.user?.plansSelected || []}
                      title="Usage"
                      isLoading={isFetchingUser}
                      editMode={editMode?.additional}
                      handleOpen={() => setOpen(!open)}
                    />
                  </div>
                </SettingsContainer>
              </>
            )}
            {selectedCategory === "Password & Security" && (
              <SettingsContainer title={selectedCategory}>
                <PasswordSecurity
                  handlePasswordModal={() => setPasswordModal(!passwordModal)}
                />
              </SettingsContainer>
            )}
            {selectedCategory === "Plans & Membership" && (
              <>
                <SettingsContainer
                  title={"Word Bank"}
                  rightBtn={
                    !buyMore && (
                      <ButtonCommon title="Buy More" className="!w-[100px]" />
                    )
                  }
                  rightBtnClick={() => setBuyMore((prev) => !prev)}
                >
                  {buyMore ? (
                    <WordBank
                      buyMore={buyMore}
                      handleClose={() => setBuyMore((prev) => !prev)}
                    />
                  ) : (
                    <PlansMembership />
                  )}
                </SettingsContainer>
                <SettingsContainer
                  title={"Membership"}
                  rightBtn={
                    showMembership ? (
                      <p className="text-base-content font-[500] text-[14px]">
                        Cancel
                      </p>
                    ) : (
                      <ButtonCommon title="Change" className="!w-[100px]" />
                    )
                  }
                  rightBtnClick={() => setShowMembership(!showMembership)}
                >
                  {/* <div className="flex flex-col bg-base-100 gap-y-2 sm:flex-row justify-between items-center gap-x-1.5">
                    <div className="flex flex-col sm:flex-row gap-x-1.5">
                      <p className="text-light font-[400] text-[13px]">
                        Your current membership plan is:{" "}
                      </p>
                      <p className="text-base-content font-[500] text-[13px]">
                        Pro - Yearly
                      </p>
                    </div>
                    {showMembership && (
                      <div className="flex gap-x-2">
                        <p className="text-light text-[12px] font-[400]">
                          Yearly
                        </p>
                        <input
                          type="checkbox"
                          className="toggle toggle-xs toggle-success"
                          checked
                        />
                        <p className="text-base-content text-[12px] font-[400]">
                          Monthly
                        </p>
                      </div>
                    )}
                  </div> */}

                  {showMembership && (
                    <>
                      <div className="flex flex-col sm:flex-row gap-y-2 gap-x-2 duration-200">
                        <Plans />
                      </div>
                    </>
                  )}
                </SettingsContainer>
              </>
            )}
            {selectedCategory === "Transaction History" && (
              <SettingsContainer title={"Transaction History"}>
                <TransactionHistory />
              </SettingsContainer>
            )}
          </div>
        </main>
      </div>

      {/* /// MODALS /// / */}

      <CommonModal
        // key={open ? 1 : 0}
        open={open}
        handleOpen={() => setOpen(!open)}
        onClick={() => setOpen(!open)}
        btnText="Save"
        className="space-y-6"
      >
        <Plan
          reusable={true}
          plansSelected={plansSelected}
          setPlansSelected={setPlansSelected}
        />
      </CommonModal>
      <ChangePasswordModal
        passwordModal={passwordModal}
        setPasswordModal={setPasswordModal}
      />
      <CommonModal
        // key={subModal ? 1 : 0}
        className="sm:!w-[40%] !max-w-[90%] p-0 pb-2 md:pb-0 !h-fit "
        title="Update Subscription"
        btnText="Upgrade"
        handleOpen={() => setSubModal((prev) => !prev)}
        open={subModal}
        headerClass="border-b border-[#091E4224] py-4 px-5"
        actionsClass="py-4 px-5 border-t border-[#091E4224]"
      >
        <div className="pt-4 px-5 flex flex-col gap-y-5">
          <p className="text-[14px] font-[400] text-light">
            You are about to upgrade your subscription from <br />
            <b className="text-base-content">Standard-Monthly</b> to{" "}
            <b className="text-base-content">Pro-Yearly</b>
          </p>
          <div className="flex gap-x-2">
            <input
              type="checkbox"
              checked
              className=" checkbox-info checkbox checkbox-sm !bg-primary "
            />
            <p className="text-dark font-[400] text-[13.5px]">
              I agree to{" "}
              <span className="text-primary underline">
                Terms and Conditions
              </span>
            </p>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default Settings;
