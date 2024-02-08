import React, { useState, useMemo } from "react";
import CollapseSideBarButton from "../Dashboard/Sidebar/CollapsableSidebarButton";
import { RiWechatLine } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import { templatesData } from "../../utils/data/templates";
import TemplateCard from "../Templates/TemplateCard";
import FormInput from "../Common/FormInput";
import TemplateForm from "../../pages/dashboard/TemplateForm";
import CommandSheet from "./CommandSheet";
import TempForm from "./TempForm";
import Chat from "./Chat";
import ChatAi from "../../pages/dashboard/ChatAi";

const RightPane = ({ className, rightView, setRightView }) => {
  const [rightpane, setRightPane] = useState(true);
  const [search, setSearch] = useState("");
  const [bsHeight, setBsHeight] = useState(true);
  const [tempForm, setTempForm] = useState(null);

  const searchTemplates = (e) => {
    setSearch(e.target.value);
  };

  const filteredTemplates = useMemo(() => {
    if (search === "") {
      return templatesData;
    }
    return templatesData.filter((template) =>
      template.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, templatesData]);

  const setBottomSeet = () => {
    setBsHeight(!bsHeight);
  };

  const onTempSelected = (temp) => {
    setTempForm({
      inputs: temp?.inputs,
      template_id: temp?.template_id,
      title: temp?.title,
      description: temp?.description,
    });
  };

  return (
    <div
      // style={{height:'100%', background:'red'}}
      className={`${className} ${
        rightpane ? "w-[22%]" : "w-20"
      } duration-300 bg-base-100 relative border-2 flex h-full md:h-auto flex-col justify-between border-gray-200 border-t-0 `}
    >
      <CollapseSideBarButton
        className={`!bg-base-200 bg-opacity-40 -left-4 top-32 w-[38px] !z-10  border-gray-200 !border !rounded-md !p-3 flex items-center`}
        open={rightpane}
        collapseSidebar={() => setRightPane(!rightpane)}
        icon={RiWechatLine}
      />
      <>
        {tempForm !== null && rightpane && (
          <TempForm tempForm={tempForm} setTempForm={setTempForm} />
        )}

        {tempForm === null && rightpane && rightView == "templates" && (
          <div
            data-aos="fade-in"
            className="pt-4 flex flex-col gap-y-4 flex-1 px-4 overflow-y-auto scrollbar-hide w-full  pb-20"
          >
            <h1 className="text-[12px] font-[600] text-center">Templates</h1>
            <div>
              <h1 className="text-[12px] font-[600] pb-3 ">Favorites</h1>
              <div className="flex flex-col gap-y-3 mt-2">
                {templatesData &&
                  templatesData?.slice(0, 3).map((temp, i) => (
                    <div key={i}>
                      <TemplateCard
                        icon={temp?.icon}
                        title={temp?.title}
                        name={temp?.name}
                        description={temp?.description}
                        inputs={temp?.inputs}
                        template_id={temp?.template_id}
                        isMobile={true}
                        onClick={() => onTempSelected(temp)}
                      />
                      <div className="h-[0.5px] bg-neutral-content w-full mt-3" />
                    </div>
                  ))}
              </div>
            </div>

            <h1 className="text-[12px] font-[600] pt-2  ">All Templates</h1>
            <FormInput
              placeholder={"Search"}
              inputType="search"
              onChange={searchTemplates}
              value={search}
              disabled={false}
            />
            <div className="-mt-5 flex flex-col gap-y-3">
              {filteredTemplates &&
                filteredTemplates?.map((temp, i) => (
                  <div key={i}>
                    <TemplateCard
                      icon={temp?.icon}
                      title={temp?.title}
                      name={temp?.name}
                      description={temp?.description}
                      inputs={temp?.inputs}
                      template_id={temp?.template_id}
                      isMobile={true}
                      onClick={() => onTempSelected(temp)}
                    />
                    <div className="h-[0.5px] bg-neutral-content w-full mt-3" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {rightView == "chat" && rightpane && (
          <Chat setRightView={setRightView} />
        )}

        {rightView == "commands" && rightpane && (
          <CommandSheet setRightView={setRightView} />
        )}
      </>
    </div>
  );
};

export default RightPane;
