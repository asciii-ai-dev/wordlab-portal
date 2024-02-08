import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


const DocCardSkeleton = () => {
  return (
      <Skeleton height={200} width={220} className="rounded-lg" />
  );
};

export default DocCardSkeleton;
