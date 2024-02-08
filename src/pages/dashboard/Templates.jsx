import React, { useCallback, useEffect, useMemo, useState } from "react";
import TemplateCard from "../../components/Templates/TemplateCard";
import TemplateCta from "../../components/Templates/TemplateCta";
import FormInput from "../../components/Common/FormInput";
import { useSelector } from "react-redux";
import {
  useFetchFavoritesQuery,
  useFetchUserPlanInfoQuery,
} from "../../features/templates/templateApi";
import TemplateCardSkeleton from "../../utils/Skeletons/TemplateCardSkeleton";
import { useGetBusinessQuery } from "../../features/business/businessApi";
import { templatesData } from "../../utils/data/templates";
import { extractUniqueCategories } from "../../utils/exportCateg";

const Templates = () => {
  const [businessTemps, setBusinessTemps] = useState([]);
  const {
    auth: { user },
  } = useSelector((state) => state);
  const {
    data,
    isLoading,
  } = useFetchUserPlanInfoQuery();
  const { data: favoriteTemps, refetch } = useFetchFavoritesQuery();
  console.log(data)
  const { data: businessData = [], isLoading: isFetchingBusiness } = useGetBusinessQuery();

  useEffect(() => {
    if(!isFetchingBusiness){
      let unique = [];
      const iterator = businessData?.map((b) => {
        unique = [...unique,...b?.templates];
      })
      const data = new Set(unique);
      setBusinessTemps([...data]);
    }
    
  },[businessData?.length])


  // Get unique categories from templatesData
  

  // State to keep track of selected category and search query
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Filter templates based on selected category and search query
  const filteredTemplates = useMemo(() => {
    if(!data?.supported_templates) return;
    if (selectedCategory == "Favorites") {
      return data?.supported_templates && data?.supported_templates?.filter((template) => {
        const categoryMatch = favoriteTemps?.payload?.data?.includes(
          template.template_id
        );
        const searchMatch =
          template?.title?.toLowerCase().includes(search.toLowerCase()) ||
          template?.description?.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
      });
    }
    return data?.supported_templates?.filter((template) => {
      // console.log(template)
      const categoryMatch =
        selectedCategory === "All" || template.category?.includes(selectedCategory);
      const searchMatch =
        template?.title?.toLowerCase().includes(search.toLowerCase()) ||
        template?.description?.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search, data]);

  // Handle category selection
  const handleSelect = (category) =>{
    setSelectedCategory(category)
  }

  

  const categories = extractUniqueCategories(templatesData)

  // Handle search input change
  const handleSearchTemplates = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div data-aos="fade-right">
      <div className="flex flex-col md:flex-row justify-between md:items-center w-full gap-y-4">
        <h1 className="text-base-content text-[20px] font-[500]">
          All templates
        </h1>
        <div className="bg-base-100">
          <FormInput
            value={search}
            onChange={handleSearchTemplates}
            placeholder="Search"
            className="md:w-[300px] w-[80%] bg-base-100 "
            inputType="search"
          />
        </div>
        
      </div>
      <div className="flex gap-x-6 overflow-x-auto scrollbar-hide mt-6 mb-3">
        {["All", ...categories, "Favorites"].map(
          (category, i) =>
            category !== null && (
              <button
                onClick={() => handleSelect(category)}
                key={i}
                type="button"
                className={`${
                  category !== selectedCategory
                    ? "bg-base-200 bg-opacity-40"
                    : " bg-primary"
                } min-w-fit rounded-[6px] border-none px-[25px] py-[8px]`}
              >
                <p
                  className={`text-center text-[12px] w-full ${
                    category !== selectedCategory
                      ? " text-base-content "
                      : " text-[#F9F9F9]"
                  }`}
                >
                  {category}
                </p>
              </button>
            )
        )}
      </div>

      <div className="my-8 space-y-10 ">
        
        <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-y-8 gap-x-6">
          {!isLoading ? (
            filteredTemplates.length &&
            filteredTemplates.map((temp, i) => (
              <TemplateCard
                refetch={refetch}
                key={i}
                icon={temp?.icon}
                title={temp?.title}
                name={temp?.name}
                description={temp?.description}
                inputs={temp?.inputs}
                template_id={temp?.template_id}
                isChip={true}
                businessTemps={businessTemps}
                businessData={businessData}
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
        <TemplateCta />
      </div>
    </div>
  );
};

export default Templates;
