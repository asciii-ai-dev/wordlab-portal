import React from 'react'
import GoogleIcon from "../../assets/images/google-icon.png";

const GoogleButton = ({onClick, title}) => {
  return (
    <button onClick={onClick} className="w-full flex gap-x-2 bg-[#9faec70f] focus:shadow-sm active:bg-[#f1f1f1] ease-linear transition-all duration-150  items-center justify-center py-2 shadow-sm">
    <img
      src={GoogleIcon}
      width={20}
      height={20}
      className="object-contain"
    />
    <p className="text-[15px] text-base-content font-[500]">{title}</p>
  </button>
  )
}

export default GoogleButton