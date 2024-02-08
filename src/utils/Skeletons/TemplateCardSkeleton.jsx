import React from "react";
import Skeleton from "react-loading-skeleton";

const TemplateCardSkeleton = () => {
  return (
    <div className="bg-slate-50 p-4  shadow-sm flex flex-col gap-y-2 cursor-pointer rounded-[6px] space-y-2 min-w-[250px] max-h-[200px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center gap-x-3 items-center">
          <Skeleton className="rounded-full" width={25} height={25} />
          <Skeleton width={80} height={9} />
        </div>
        <div className="">
          <Skeleton className="rounded-full" width={20} height={20} />
        </div>
      </div>
      <div>
        <Skeleton count={2} width={120} height={10} />
      </div>
    </div>
  );
};

export default TemplateCardSkeleton;
