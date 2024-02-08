import React from "react";
import TemplateCard from "../Templates/TemplateCard";
import TemplateCardSkeleton from "../../utils/Skeletons/TemplateCardSkeleton";
import {
  useFetchUserPlanInfoQuery,
  useFetchFavoritesQuery,
} from "../../features/templates/templateApi";

const CardScrollSection = ({ heading }) => {
  const { data, isLoading } = useFetchUserPlanInfoQuery();
  const { data: favoriteTemps, refetch } = useFetchFavoritesQuery();
  return (
    <div className="relative">
      <h2 className="text-base-content text-[19px] font-[500] pb-3 ">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 sm:gap-x-3 relative">
        {!isLoading ? (
          data?.supported_templates &&
          data?.supported_templates.map((temp, i) => (
            <TemplateCard
              refetch={refetch}
              key={temp?.template_id + i}
              icon={temp?.icon}
              title={temp?.title}
              name={temp?.name}
              description={temp?.description}
              inputs={temp?.inputs}
              template_id={temp?.template_id}
              isFav={
                favoriteTemps?.payload?.data?.includes(temp?.template_id)
                  ? true
                  : false
              }
            />
          ))
        ) : (
          <>
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
            <TemplateCardSkeleton />
          </>
        )}
      </div>
      {/* <div className="hidden sm:block absolute top-[70px] right-0 bg-gradient-to-l from-[#dfdfdf] h-[60%] w-1/12" /> */}
    </div>
  );
};

export default CardScrollSection;
