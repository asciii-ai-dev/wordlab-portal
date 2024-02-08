import React, { useEffect, useState } from "react";
import PlansCard from "../components/Common/PlansCard";
import {
  useGetStripeProductsQuery,
  useGetUserActiveSubscriptionMutation,
  useManageSubscriptionMutation,
} from "../features/subscriptions/subscriptionApi";
import Loader from "../utils/Loader";
import CommonModal from "../components/Common/CommonModal";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { checkSubscription } from "../utils/check-subscription";
import FormInput from "../components/Common/FormInput";
import { useFetchUserPlanInfoQuery } from "../features/templates/templateApi";
import { Checkbox } from "@material-tailwind/react";

const Plans = ({ refetchUserSub }) => {
  const [subModal, setSubModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [subInterval, setSubInterval] = useState({
    checked: false,
    interval: "month",
  });
  const [stripeProducts, setStripeProducts] = useState([]);
  const [priceId, setPriceId] = useState("");
  const [prodName, setProdName] = useState("");
  const ifUserSubscribed = checkSubscription();
  const { data, isLoading } = useGetStripeProductsQuery();
  console.log({data})
  const [submitSubscription, { isLoading: isSubscribing }] =
    useManageSubscriptionMutation();
  const { data: userPlanDetails } = useFetchUserPlanInfoQuery();
  const user = useSelector((state) => state?.auth?.user);
  const subscribePlan = async () => {
    const body = {
      userId: user?._id,
      action:
        ifUserSubscribed?.data?.subscriptionStatus === "active" && ifUserSubscribed?.data?.stripePriceId === priceId 
          ? "cancel"
          : null,
    };
    let loadingId;
    if(!priceId) return;
    try {
      loadingId = toast.loading("Loading...");
      const result =   await submitSubscription({
        ...body,
        newPriceId: priceId,
      });
      if (result?.data?.url) {
        window.location.href = result?.data?.url;
      } else if (result?.data?.data) {
        toast.success(result?.data?.message, {
          id: loadingId,
        });
      } else if (result?.error?.data) {
        toast.error(result?.error?.data?.error, {
          id: loadingId,
        });
      }
    } catch (error) {
      console.log("ERROR SUB PLAN: ", error);
      toast.error("Something Went Wrong!", {
        id: loadingId,
      });
    } finally {
      setTimeout(() => {
        toast.dismiss(loadingId);
        window.location.reload();
      }, 3000);
      setSubModal(false);
      // refetchUserSub()
    }
  };

  useEffect(() => {
    const subData = data?.products?.filter(
      (v) => v?.prices[0]?.type == "recurring"
    );
    setStripeProducts(subData || []);
  }, [data]);

  const openModel = (pId, prodName) => {
    setPriceId(pId);
    setProdName(prodName);
    if(!ifUserSubscribed?.data?.stripePriceId || ifUserSubscribed?.data?.subscriptionStatus === "canceled"){
      setPriceId(pId);
      subscribePlan()
    }
    else {setSubModal((prev) => !prev);}
  };

  const handleToggle = () => {
    setSubInterval((prev) => ({
      ...prev,
      checked: !prev.checked,
      interval: !prev.checked ? "year" : "month",
    }));
  };
  return (
    <>
      {isLoading && (
        <div className="w-full !mt-10 flex justify-center items-center">
          <Loader type="Puff" w={40} h={40} color="#096BDE" />
        </div>
      )}
      <div className="flex flex-col h-full space-y-6 px-6 justify-center items-center my-10 ">
        {!isLoading && (
          <>
            <div className="flex justify-between w-full mx-auto flex-col md:flex-row mb-10  gap-y-2">
              <h1 className="text-[16px] md:text-[22px] text-base-content  font-semibold ">
                Please Select A Payment Plan
              </h1>
              <div className="flex gap-x-2">
                <p
                  className={`text-${
                    !subInterval ? "base-content" : "light"
                  } text-[12px] font-[400]`}
                >
                  Monthly
                </p>
                <input
                  type="checkbox"
                  className={`toggle toggle-xs toggle-${
                    subInterval ? "success" : "error"
                  }`}
                  checked={subInterval?.checked}
                  onChange={handleToggle}
                />
                <p
                  className={`text-${
                    !subInterval ? "light" : "base-content"
                  } text-[12px] font-[400]`}
                >
                  Yearly
                </p>
              </div>
            </div>
            <div className="grid px-10 grid-cols-1 mt-3 md:grid-cols-3 gap-y-4 md:gap-x-10 ">
              {stripeProducts &&
                stripeProducts.map((p, i) => {
                  console.log(p)
                  const selectedPrice = p.prices.find(
                    (price) =>
                      price?.recurring?.interval === subInterval?.interval
                  );
                  return (
                    <div key={i} className="flex justify-center">
                      <PlansCard
                        selectedInterval={subInterval?.interval}
                        selectedPrice={selectedPrice}
                        prices={p?.prices || []}
                        onClick={openModel}
                        bgColor={
                          p?.name.slice(0, 1) == "P" && "#096BDE"
                        }
                        name={p?.name}
                      />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      <CommonModal
        // key={subModal ? 1 : 0}
        className="sm:!w-[40%] !max-w-[90%] p-0 pb-2 md:pb-0 !h-fit "
        title="Select Subscription"
        btnText="Submit"
        handleOpen={() => {
          setSubModal((prev) => !prev);
          setChecked(false);
        }}
        open={subModal}
        onClick={subscribePlan}
        btnDisabled={isSubscribing || !checked}
        headerClass="border-b border-[#091E4224] py-4 px-5"
        actionsClass="py-4 px-5 border-t border-[#091E4224]"
      >
        <div className="pt-4 px-5 flex flex-col gap-y-5">
          <>
            {prodName === "cancel" && (
              <div>
              <p className="text-[14px] font-[400] text-light">
                You’re about to cancel your subscription! After clicking
                ‘submit’, your subscription will be cancelled automatically and
                will no longer be able to generate any more content. If you have
                purchased any add-on bundle for extra words, you will still be
                able to use them if you decide to subscribe again to any plan
                within the expiration of that purchased bundle.
              </p>
              <Checkbox
              value={checked}
              checked={checked}
              label={"I understand and wish to cancel my active subscription."}
              onChange={() => setChecked(!checked)}
              labelProps={{
                className: "text-[13px] text-base-content", // add custom class to label element
              }}
            />
              </div>
            )}
            {(prodName === "Hobbyist" &&
            userPlanDetails?.plan_info?.name === "Standard") ? (
              <div>
                <p className="text-[14px] font-[400] text-light">
                  {`You’re about to downgrade to Hobbyist (${subInterval?.interval}ly) plan. After
              downgrading, you’ll loose access to: `}
                </p>
                <ul className="text-[13px] list-disc p-4 font-[400] text-light">
                  <li>Wordlab Document Editor</li>
                  <li>Wordlab Chat with Images</li>
                  <li>Landing Page Template</li>
                  <li>Keywords Extractor</li>
                  <li>Chat with Live Site Search</li>
                </ul>
                <Checkbox
              value={checked}
              checked={checked}
              label={"I understand and wish to downgrade."}
              onChange={() => setChecked(!checked)}
              labelProps={{
                className: "text-[13px] text-base-content", // add custom class to label element
              }}
            />
              </div>
            ) : null}
            {(prodName === "Standard" &&
            userPlanDetails?.plan_info?.name === "Pro")  ? (
              <div>
                <p className="text-[14px] font-[400] text-light">
                  {`You’re about to downgrade to Standard plan. After downgrading your unlimited word count 
                  will be restricted to 350K words per month and you’ll loose 
                  access to some features and restricted limits on others.`}
                </p>
                <Checkbox
              value={checked}
              checked={checked}
              label={"I understand and wish to downgrade."}
              onChange={() => setChecked(!checked)}
              labelProps={{
                className: "text-[13px] text-base-content", // add custom class to label element
              }}
            />
              </div>
            ) : null}
            {(prodName === "Hobbyist" &&
            userPlanDetails?.plan_info?.name === "Pro") || (prodName === "Hobbyist" && userPlanDetails?.plan_info?.name === "Hobbyist") ? (
              <div>
                <p className="text-[14px] font-[400] text-light">
                  {`You’re about to downgrade to Hobbyist plan. After downgrading you’ll only have 10K words per month, and you’ll loose access to`}
                </p>
                <ul className="text-[13px] list-disc p-4 font-[400] text-light">
                  <li>Wordlab Document Editor</li>
                  <li>Wordlab Chat with Images</li>
                  <li>Landing Page Template</li>
                  <li>Keywords Extractor</li>
                  <li>Chat with Live Site Search</li>
                </ul>
                <Checkbox
              value={checked}
              checked={checked}
              label={"I understand and wish to downgrade."}
              onChange={() => setChecked(!checked)}
              labelProps={{
                className: "text-[13px] text-base-content", // add custom class to label element
              }}
            />
              </div>
            ) : null}

            {((prodName === "Pro" || prodName == "Standard") &&
            (userPlanDetails?.plan_info?.name === "Hobbyist")) || (prodName !== "Hobbyist" && userPlanDetails?.plan_info?.name  === prodName ) ? (
              <div>
                <p className="text-[14px] font-[400] text-light">
                  {`Great choice! You’re about to upgrade to the Pro plan. After upgrading, you’ll unlock`}
                </p>
                <ul className="text-[13px] list-disc p-4 font-[400] text-light">
                  <li>Wordlab Document Editor</li>
                  <li>Wordlab Chat with Images</li>
                  <li>Landing Page Template</li>
                  <li>Keywords Extractor</li>
                  <li>Chat with Live Site Search</li>
                  <li>And more...</li>
                </ul>
                <Checkbox
              value={checked}
              checked={checked}
              label={"I understand and wish to upgrade."}
              onChange={() => setChecked(!checked)}
              labelProps={{
                className: "text-[13px] text-base-content", // add custom class to label element
              }}
            />
              </div>
            ) : null}
            {prodName === "Pro" &&
            userPlanDetails?.plan_info?.name === "Standard" ? (
              <div>
                <p className="text-[14px] font-[400] text-light">
                  {`Great choice! You’re about to upgrade to the Pro plan which offers increased word count, faster output, and access to every template.`}
                </p>
                <Checkbox
              value={checked}
              checked={checked}
              label={"I understand and wish to upgrade."}
              onChange={() => setChecked(!checked)}
              labelProps={{
                className: "text-[13px] text-base-content", // add custom class to label element
              }}
            />
              </div>
            ) : null}
            
          </>

          {/* <div className="flex gap-x-2">
            <input
              type="checkbox"
              checked
              className=" checkbox-info checkbox checkbox-sm !bg-primary "
            />
            <p className="text-base-content font-[400] text-[13.5px]">
              I agree to{" "}
              <span className="text-primary underline">
                Terms and Conditions
              </span>
            </p>
          </div> */}
        </div>
      </CommonModal>
    </>
  );
};

export default Plans;
