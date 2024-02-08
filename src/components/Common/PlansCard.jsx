import React from "react";
import { checkSubscription } from "../../utils/check-subscription";
import { BiCheckDouble } from "react-icons/bi";

const PlansCard = ({
  bgColor,
  onClick,
  name,
  selectedPrice,
  selectedInterval,
  prices,
}) => {
  console.log(name)
  const planDetails =
    name?.toLowerCase() === "hobbyist"
      ? [
          "9000 words",
          "50K words ($5)",
          "40+ Copywriting Templates",
          "Wordlab Chat",
          "Chat with Live Google Search",
          "Wordlab Commands",
          "25+ Languages",
        ]
      : name?.toLowerCase() === "standard"
      ? [
          "350K words",
          "40+ Copywriting Templates",
          "Wordlab Chat",
          "Chat with Live Google Search",
          "Wordlab Commands",
          "50+ Languages",
          "Wordlab Document Editor",
          "Wordlab Chat with Images",
          "Chat with Live Site Search",
          "Landing Pages Template",
          "Wordlab Keywords Extractor",
          "Access to exclusive community & training material",
          "Priority Access to New Features",
        ]
      : [
          "Unlimited words",
          "40+ Copywriting Templates",
          "Wordlab Chat",
          "Chat with Live Google Search",
          "Wordlab Commands",
          "50+ Languages",
          "Wordlab Document Editor",
          "Wordlab Chat with Images",
          "Chat with Live Site Search",
          "Landing Pages Template",
          "Wordlab Keywords Extractor",
          "Explainer Video Script Generator",
          "Wordlab Art (Coming Soon)",
          "Wordlab Voiceovers (Coming Soon)",
          "Highly SEO-focused Content Suite (Coming Soon)",
          "Access to exclusive community & training material",
          "Priority Support",
          "Priority Access to New Features",
        ];
  const currentSub = checkSubscription();
  const isSubscribed = prices?.find((v) => {
    return (
      v.id === currentSub?.data?.stripePriceId &&
      v.recurring.interval === selectedInterval
    );
  });
  const freeFlag =
    (currentSub?.data?.subscriptionStatus === "canceled" ||
      currentSub?.data?.subscriptionStatus === "free") &&
    name == "free";
  const currentFlag =
    isSubscribed && currentSub?.data?.subscriptionStatus !== "canceled";

  const proClass = {
    backgroundColor: "#010914",
    transform: "scale(1.1)", // Adjust the scaling factor as needed
    transition: "transform 0.3s ease-in-out",
    color: "white",
  };

  return (
    <div
      style={
        name === "Pro"
          ? proClass
          : { backgroundColor: name === "Standard" ? "white" : "#F6F6F6" }
      }
      className={`items-center h-fit max-w-[300px] rounded-lg py-2 shadow-lg`}
    >
      <div className="py-3 px-5">
        <div className="">
          <div className="flex flex-col gap-y-4 w-full justify-between">
            <div className="flex justify-between">
              <h5
                className={`${
                  name == "Pro" ? proClass.color : "text-dark"
                } !rounded-none text-[16px]`}
              >
                {name || ""}{" "}
              </h5>
              {currentFlag && (
                <p className="bg-[#0052B2] text-[11px] text-white rounded-md text-center w-fit py-1.5 px-4">
                  Current Plan
                </p>
              )}
            </div>
            <p
              className={`text-[10px] font-[400]  ${
                name == "Pro" ? proClass.color : "text-[#5A5A5A]"
              }`}
            >
              {selectedInterval === "year"
                ? (name === "Pro" && "billed annually $228") ||
                  (name === "Standard" && "billed annually $168") ||
                  (name === "Hobbyist" && "billed annually $36")
                : (name === "Pro" && "for professionals & SMBs") ||
                  (name === "Standard" && "for individuals & freelancers") ||
                  (name === "Hobbyist" && "for light copywriting")}
            </p>
          </div>
          <p
            className={`text-[40px] ${
              name == "Pro" ? proClass.color : "text-dark"
            } font-bold pt-2 pb-4`}
          >
            $
            { selectedPrice?.unit_amount_decimal / 100 || ""}
            <sub
              className={`text-[16px] ${
                name == "Pro" ? proClass.color : "text-dark"
              } font-[400]`}
            >
              /{selectedInterval}
            </sub>
          </p>
          <p
            className={`text-[11px] font-[300]  ${
              name == "Pro" ? proClass.color : "text-[#5A5A5A]"
            }`}
          >
            500+ users scheduling meetings everyday.
          </p>
        </div>
        <button
          // disabled={freeFlag}
          onClick={() =>
            onClick(selectedPrice?.id, currentFlag ? "cancel" : name)
          }
          className={`w-fit ${
            name === "Pro"
              ? `bg-white !border-transparent  `
              : name === "Standard"
              ? `bg-[#010914] border-1`
              : "bg-transparent"
          } mt-4 border-2 border-gray-400  !rounded-[6px]  text-[13px]`}
        >
          <p
            className={` ${name === "Pro" && `text-[#010914] `} ${
              name === "Standard" && `text-white`
            } font-medium text-light capitalize w-full h-full py-2 px-5 text-center`}
          >
            {currentFlag ? "Cancel" : "Subscribe"}
          </p>
        </button>
      </div>

      <div className="p-5 space-y-2">
        {planDetails?.map((detail) => (
          <div key={detail} className="flex gap-x-2 items-center">
            <BiCheckDouble
              className={`${
                name == "Pro" ? proClass.color : "text-gray-500"
              } text-[20px]`}
            />
            <p
              className={`text-[12px] font-[400] ${
                name == "Pro" ? proClass.color : "text-gray-500"
              }`}
            >
              {detail || ""}
            </p>
          </div>
        ))}

        {/* Button  */}
      </div>
    </div>
  );
};

export default PlansCard;
