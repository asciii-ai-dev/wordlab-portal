import React, { useState } from "react";
import CollapseSideBarButton from "../Dashboard/Sidebar/CollapsableSidebarButton";
import FormInput from "../Common/FormInput";
import { businessOptions } from "../../utils/data/selectOptions";
import EditorAction from "./EditorAction";
import { HiOutlineListBullet } from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import UseOutputProfile from "../../utils/hooks/useOutputProfile";

const LeftPane = ({
  fetchIntroduction,
  introduction,
  isLoading,
  outline,
  fetchOutline,
  setBlogTitle,
  formFuncs,
  className,
  fetchConclusion,
  conclusion,
  bussId,
  handleBussId
}) => {
  const { register, handleSubmit, control, getValues, watch, errors } =
    formFuncs;
  const [leftPane, setLeftPane] = useState(true);
  let val = watch();
  let validation = val?.audience && val?.kw && val?.title && val?.tone;
  const { state } = useLocation();

  return (
    <div
      className={` ${className}  ${
        leftPane ? "md:w-[20%]" : "md:w-20"
      }  duration-300 bg-base-100 relative border-2 border-gray-200 border-t-0 px-4 py-6 overflow-y-auto scrollbar-hide`}
    >
      <CollapseSideBarButton
        className={`!bg-base-200 bg-opacity-70 -right-4 top-32  border-gray-200 !border !z-50 !rounded-md !p-2.5`}
        open={leftPane}
        collapseSidebar={() => setLeftPane(!leftPane)}
      />
      {/* // COntent  */}
      {leftPane && (
        <div className="flex flex-col justify-between h-screen  space-y-10">
          <div className="space-y-4">
            <UseOutputProfile 
            className={"selector1"} 
            value={bussId} 
            onChange={handleBussId} 
            template_id="document-intro"  
            />
            <FormInput
              type="text"
              name="kw"
              title={"Targeted Keywords"}
              placeholder={"Enter some targeted keywords"}
              control={control}
              register={register}
              defaultValue={state?.kw || ""}
              error={errors?.kw?.message}
              className="selector2"
            />
            <FormInput
              type="text"
              name="audience"
              title={"Targeted Audience"}
              placeholder={"Enter some targeted audience"}
              control={control}
              register={register}
              defaultValue={state?.audience || ""}
              error={errors?.audience?.message}
              className="selector3"
            />
            <FormInput
              type="text"
              name="tone"
              title={"Tone"}
              placeholder={"Enter tone"}
              control={control}
              register={register}
              defaultValue={state?.tone || ""}
              error={errors?.tone?.message}
              className="selector4"
            />
            <FormInput
              type="text"
              name="title"
              title={"What is your Blog Title?"}
              defaultValue={
                (state?.blogTitle !== "Create New Document" &&
                  state?.blogTitle) ||
                ""
              }
              placeholder={"Enter blog title"}
              control={control}
              register={register}
              error={errors?.title?.message}
              className="selector5"
            />
          </div>

          {/* // Actions  */}
          <div className="relative flex flex-col gap-y-5 pb-20">
            <EditorAction
              disabled={
                state?.id && !isLoading
                  ? false
                  : !validation || isLoading
                  ? true
                  : false
              }
              icon={HiOutlineMenuAlt2}
              title="Introduction"
              description="Write introduction base on the title"
              onClick={handleSubmit(fetchIntroduction)}
              className="selector6"
            />
            <div className="h-[1px] bg-neutral-content w-full " />
            <EditorAction
              disabled={
                state?.id && !isLoading
                  ? false
                  : introduction.length && !isLoading
                  ? false
                  : true
              }
              icon={HiOutlineListBullet}
              title="Fetch Outline"
              description="Write introduction base on the title"
              onClick={handleSubmit(fetchOutline)}
              className="selector7"
            />
            <div className="h-[1px] bg-neutral-content w-full " />
            <EditorAction
              disabled={
                state?.id && !isLoading
                  ? false
                  : outline.length && !isLoading
                  ? false
                  : true
              }
              icon={HiOutlineMenuAlt2}
              title="Conclusion"
              description="Write introduction base on the title"
              onClick={handleSubmit(fetchConclusion)}
              className="selector8"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPane;
