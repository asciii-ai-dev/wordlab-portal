import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { templatesData } from "../../utils/data/templates";
import TemplateCard from "../../components/Templates/TemplateCard";

const BundleTemplates = () => {
  const { state } = useLocation();

  const filteredTemplates = templatesData.filter((template) =>
    state?.category ? template.category.includes(state.category) : true
  );

  

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-base-content text-[18px] font-[500]">
        {state?.category}
      </h1>

      <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-y-8 gap-x-6">
        {filteredTemplates.map((temp, i) => (
          <TemplateCard
            key={i}
            icon={temp?.icon}
            title={temp?.title}
            name={temp?.name}
            description={temp?.description}
            inputs={temp?.inputs}
            template_id={temp?.template_id}
            // isChip={true}
          />
        ))}
      </div>
    </div>
  );
};

export default BundleTemplates;
