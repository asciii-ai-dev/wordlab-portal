import React from "react";
import rocketImage from "../../assets/images/rocket.png";
import ButtonCommon from "./Button";
import { useNavigate } from "react-router-dom";

const SubscriptionOverlay = (props) => {
  const { plan_name, module_name } = props;
  const navigate = useNavigate();

  return (
    <div className="absolute cursor-not-allowed bg-base-100 bg-opacity-70 z-50 w-full h-full flex flex-col items-center justify-center gap-y-8">
      <div className="flex items-center gap-y-2 flex-col">
        <img
          src={rocketImage}
          className="w-[180px] h-[180px] object-cover"
          alt="rocket_png"
        />
        <h4 className="text-center">{`Upgrade To ${plan_name} To Access ${module_name}`}</h4>
      </div>
      <ButtonCommon
        onClick={() => navigate("/settings")}
        title={`Upgrade To ${plan_name}`}
        className="!w-[85%] sm:!w-72 py-1"
      />
    </div>
  );
};

export default SubscriptionOverlay;
