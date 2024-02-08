import React from "react";
import { useSelector } from "react-redux";
import CardScrollSection from "../../components/Dashboard/CardScrollSection";
import TemplateBundle from "../../components/Dashboard/TemplateBundle";
import { templatesData } from "../../utils/data/templates";
import { extractUniqueCategories } from "../../utils/exportCateg";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.user);
  const categories = extractUniqueCategories(templatesData)
  console.log(categories)


  return (
    <div data-aos="fade-right" className="flex flex-col gap-y-6">
      <div className="space-y-4">
        <h1 className="text-base-content text-[18px] font-[500]">
          Hi {user && user?.name},
        </h1>
        <p className="text-[13px] text-light font-[400]">
        Pick any pre-made template or start from scratch with the Document Editor.
        </p>
      </div>
      <div className="mt-4 space-y-8">
      <h1 className="text-base-content text-[18px] font-[500]">
      Browse templates tailored-fit for your needs!
        </h1>
        <div className='flex flex-row  overflow-x-scroll scrollbar-hide gap-x-5'>
          {categories.map((v,i) => (
            <TemplateBundle key={i} category={v} />
          ))}
        </div>
      </div>
      <div className=" space-y-10">
        <CardScrollSection heading="Other Templates ️" />
        {/* <CardScrollSection heading="Check out these trending templates" /> */}
      </div>
    </div>
  );
};

export default Dashboard;
