import React from "react";
import { Bars, Puff, ThreeCircles, ThreeDots } from "react-loader-spinner";

const Loader = ({ type, w, h, color }) => {
  return (
    <div>
      {type === "bars" && (
        <Bars
          height={h || 20}
          width={w || 20}
          color={color || "#ffff"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {type === "threeCircles" && (
        <ThreeCircles
          height={h || 20}
          width={w || 20}
          color={color || "#ffff"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {type === "threeDots" && (
        <ThreeDots
          height={h || 20}
          width={w || 20}
          color={color || "#ffff"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {type == "Puff" && (
        <Puff 
        height={h || 20}
        width={w || 20}
        color={color || "#ffff"}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
      )}
    </div>
  );
};

export default Loader;
