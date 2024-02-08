import React from 'react'
import { BiHeart } from 'react-icons/bi'
import { MdArrowBack } from 'react-icons/md'

const TemplateHeader = ({title, navigate}) => {
  return (
    <div className="flex justify-between items-center   bg-base-100 w-full z-50 border-b border-b-[#E9EAEB] py-4 px-6">
        <div
          onClick={() => navigate(-1)}
          className="flex gap-x-2 items-center justify-center cursor-pointer"
        >
          <MdArrowBack className="text-light text-[20px] " />
          <p className="text-light text-[13px]">Back</p>
        </div>

        <h4 className="text-base-content text-[14px] font-[500]">{title}</h4>
        <div className="bg-base-100 p-2 border border-[#E9EAEB] rounded-full">
          <BiHeart className="text-base-content text-[14px] font-[600]" />
        </div>
      </div>
  )
}

export default TemplateHeader