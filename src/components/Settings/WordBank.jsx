import React, { useEffect, useState } from "react";
import ButtonCommon from "../Common/Button";
import {
  useBuyBundleMutation,
  useGetStripeProductsQuery,
} from "../../features/subscriptions/subscriptionApi";
import toast from "react-hot-toast";

const WordBank = ({ handleClose, buyMore }) => {
  const [stripeProducts, setStripeProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const { data, isLoading } = useGetStripeProductsQuery();
  useEffect(() => {
    const subData = data?.products?.filter(
      (v) => v?.prices[0]?.type != "recurring"
    );
    setStripeProducts(subData || []);
  }, [data]);

  const [submitBundle, { isLoading: isPurchasing }] = useBuyBundleMutation();

  const buyBundle = async () => {
    if (selectedPrice == "") return;
    let loadingId;
    try {
      loadingId = toast.loading("Loading...");
      const result = await submitBundle({ priceId: selectedPrice });
      if (result?.data?.url) {
        window.location.href = result?.data?.url;
      } else if (result?.data?.data) {
        toast.success(result?.data?.message, {
          id: loadingId,
        });
      } else if (result?.error?.data) {
        toast.error(result?.error?.data?.error, {
          id: loadingId,
        });
      }
    } catch (error) {
      console.log("ERROR SUB PLAN: ", error);
      toast.error("Something Went Wrong!", {
        id: loadingId,
      });
    }
  };

  return (
    <div>
      <div className="grid gap-y-5">
        <div>
          <p className="text-[15px] pb-1 text-base-content font-[500]">
            Your avaialbe words
          </p>
          <p className="text-[15px] text-base-content font-[500]">2.5k</p>
        </div>
        <div className="space-y-3 pb-5 w-full md:w-[90%]">
          <p className="text-[15px] pb-1 text-base-content font-[500]">
            Available Bundles
          </p>
          <div className="flex gap-4 flex-col sm:flex-row w-full">
            {!isLoading &&
              stripeProducts &&
              stripeProducts.map((v, i) => (
                <div
                  key={v?.prices[0]?.id || i}
                  onClick={() =>
                    setSelectedPrice((e) =>
                      e !== v?.prices[0]?.id ? v?.prices[0]?.id : ""
                    )
                  }
                  className={`${
                    selectedPrice == v?.prices[0]?.id &&
                    "border-blue-700 bg-blue-100"
                  } hover:bg-blue-100 hover:border-blue-700 border-gray-200 rounded-lg cursor-pointer border-[2px] w-[250px] p-5`}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-base-content">
                      {v?.product?.name || ""}
                    </h5>
                    <h5 className="text-primary">
                      {"$" + v?.prices[0]?.unit_amount_decimal / 100 || ""}
                    </h5>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-x-4 ">
                    <div className="space-y-3 mt-7">
                      <p className="text-[15px] text-base-content font-[500]">
                        Words: 20k words
                      </p>
                      <p className="text-[15px] text-base-content font-[500]">
                        Validity: 30 days
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {buyMore && (
        <div className="flex flex-row justify-end mt-4">
          <ButtonCommon
            onClick={handleClose}
            title="Cancel"
            variant="text"
            className="rounded-sm !text-base-content !font-[600] !w-[80px]"
          />
          <ButtonCommon
            disabled={isLoading || isPurchasing}
            onClick={buyBundle}
            className="rounded-sm !w-fit"
            title="Buy Words"
          />
        </div>
      )}
    </div>
  );
};

export default WordBank;
