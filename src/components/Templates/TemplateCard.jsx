import React from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import CardChip from "../../components/Common/CardChip";
import { Link } from "react-router-dom";
import {
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} from "../../features/templates/templateApi";
import toast from "react-hot-toast";

const TemplateCard = ({
  icon,
  title,
  description,
  inputs,
  template_id,
  isChip,
  isMobile,
  onClick,
  isFav,
  refetch,
  businessData,
  businessTemps
}) => {
  const [addToFav, { isLoading: isRemoving }] = useAddToFavoriteMutation();
  const [removeFromFav, { isLoading: isAdding }] =
    useRemoveFromFavoriteMutation();
  const isLoading = isRemoving || isAdding;

  const submitFav = async (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Loading...");
    try {
      const result = await addToFav({ template_id });
      if (result?.data) {
        toast.success(result?.data?.message, {
          id: loadingId,
        });
      } else {
        toast.error(result?.data?.message, {
          id: loadingId,
        });
      }
    } catch (error) {
      toast.error("An Error Occured", {
        id: loadingId,
      });
    } finally {
      refetch();
    }
  };

  const removeFav = async (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Loading...");
    try {
      const result = await removeFromFav({ template_id });
      if (result?.data) {
        toast.success(result?.data?.message, {
          id: loadingId,
        });
      } else {
        toast.error(result?.data?.message, {
          id: loadingId,
        });
      }
    } catch (error) {
      toast.error("An Error Occured", {
        id: loadingId,
      });
    } finally {
      refetch();
    }
  };

  return !isMobile ? (
    <Link
      to={`/templates/${title}`}
      state={{ title, inputs, template_id, description, businessData, businessTemps }}
      className="hover:bg-base-100  bg-base-200 bg-opacity-40  hover:shadow-lg transition ease-in duration-200 transform  hover:scale-105  shadow-sm cursor-pointer rounded-[6px] py-6 px-3 space-y-4  min-w-[250px] max-h-[200px]"
    >
      {isChip && (
        <div className="flex items-center justify-between">
          <div className="gap-x-2.5 flex w-full">
            <CardChip value="new" bg="#FFEDEB" textColor="#AE2A19" />
            <CardChip value="hot" bg="#FFF7D6" textColor="#974F0C" />
          </div>
          <button
            disabled={isLoading}
            onClick={!isFav ? submitFav : removeFav}
            className="bg-base-100 p-2 border border-[E9EAEB] rounded-full"
          >
            {isFav ? (
              <BiSolidHeart
                color="red"
                className="text-red-600 text-[14px] font-[600]"
              />
            ) : (
              <BiHeart className="text-base-content text-[12px] font-[600]" />
            )}
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <img
            src={icon}
            alt="icon_image"
            className="w-[24px] h-[24px] object-contain"
          />
          <h4 className="text-base-content text-[13px] font-[500]  pl-2 line-clamp-1 pt-0.5 ">
            {title}
          </h4>
        </div>
        {!isChip && (
          <button
            disabled={isLoading}
            onClick={!isFav ? submitFav : removeFav}
            className="bg-base-100 p-1.5 border border-[E9EAEB] rounded-full"
          >
            {isFav ? (
              <BiSolidHeart
                color="red"
                className="text-red-600 text-[12px] font-[600]"
              />
            ) : (
              <BiHeart className="text-base-content text-[12px] font-[600]" />
            )}
          </button>
        )}
      </div>
      <div>
        <p className="text-light font-[300] text-[11px] pr-3 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  ) : (
    <div
      onClick={onClick}
      className="bg-base-100 cursor-pointer rounded-[6px]   space-y-2 min-w-[250px] max-h-[200px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <img src={icon} alt="icon_image" className="w-[20px] h-[20px]" />
          <h4 className="text-base-content text-[12px] font-[500] pl-2 line-clamp-1 pt-0.5">
            {title}
          </h4>
        </div>
        <div
          disabled={isLoading}
          onClick={!isFav ? submitFav : removeFav}
          className="bg-base-100 p-1.5 border border-[E9EAEB] rounded-full"
        >
          {isFav ? (
            <BiSolidHeart
              color="red"
              className="text-red-600 text-[12px] font-[600]"
            />
          ) : (
            <BiHeart className="text-base-content text-[12px] font-[600]" />
          )}
        </div>
      </div>
      <div>
        <p className="text-light font-[300] text-[9px] pr-3 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;
