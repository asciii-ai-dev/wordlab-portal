import { useSelector } from "react-redux";
import { useIfUserSubscribedQuery } from "../features/subscriptions/subscriptionApi";

export const checkSubscription = () => {
  const user = useSelector((state) => state?.auth?.user);
  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchUserSub,
  } = useIfUserSubscribedQuery({ userId: user?._id });
  if (!isLoading) {
    if (data?.data?.userId)
      return {
        data: data?.data,
        success: data?.success,
        refetchUserSub,
      };
    else
      return {
        error: true,
      };
  }
};
