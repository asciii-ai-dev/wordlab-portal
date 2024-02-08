import React, { useEffect, useState } from "react";
import DocCard from "../../components/Documents/DocCard";
import DocCardSkeleton from "../../utils/Skeletons/DocCardSkeleton";
import { useSelector } from "react-redux";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useFetchUserPlanInfoQuery } from "../../features/templates/templateApi";
import SubscriptionOverlay from "../../components/Common/SubscriptionOverlay";
import moment from "moment/moment";

const Documents = () => {
  const { data: userData } = useFetchUserPlanInfoQuery();
  const { auth } = useSelector((state) => state);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const converToDate = (d) => {
    const date = new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
    const formattedDate = moment(date).format('MMM D, YYYY');
    return formattedDate
  }

  const fetchDocuments = async () => {
    const userId = auth?.user?._id; // Replace with the actual user ID
    const collectionRef = collection(db, "userDocs");
    const q = query(
      collectionRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    ); // Add orderBy clause

    // setIsLoading(true);

    try {
      const querySnapshot = await getDocs(q);
      const fetchedDocuments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (fetchedDocuments?.length) setDocuments(fetchedDocuments);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }

    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    fetchDocuments();
  }, [auth?.user?._id]);
  const acceptableplan = ["Pro", "Standard"];

  return acceptableplan?.includes(userData?.plan_info?.name) ? (
    <div data-aos="fade-right overflow-hidden">
      <div className="space-y-4">
        <h1 className="text-base-content text-[20px] font-[500]">
          Recent Documents
        </h1>
      </div>
      <div>
        <div className="flex flex-wrap my-10 gap-x-6 overflow-hidden gap-y-10 justify-center md:justify-start w-full">
          <DocCard/>
          {isLoading ? (
            <>
              <DocCardSkeleton />
              <DocCardSkeleton />
              <DocCardSkeleton />
            </>
          ) : (
            <>
              {documents &&
                documents.map((v, i) => (
                  <DocCard
                    key={v?.id}
                    id={v?.id}
                    image={v?.image}
                    title={v?.title}
                    kw={v?.kw || ""}
                    audience={v?.audience || ""}
                    tone={v?.tone || ""}
                    sound={v?.sound || ""}
                    buss_id={v?.buss_id || ""}
                    date={converToDate(v?.updatedAt)}
                    richText={v?.rich_text}
                    fetchDocuments={fetchDocuments}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="relative !h-full">
      <SubscriptionOverlay
        plan_name="Pro / Standard"
        module_name={"Document Editor"}
      />
      <div className="p-5">
        <div className="space-y-4">
          <h1 className="text-base-content text-[20px] font-[500]">
            Recent Documents
          </h1>
        </div>
        <div>
          <div className="flex flex-wrap my-10 gap-x-6 gap-y-10 justify-center md:justify-start w-full">
            <DocCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
