import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "../utils/Layout";
import TemplateForm from "../pages/dashboard/TemplateForm";
import Business from "../pages/dashboard/Business";
import Documents from "../pages/dashboard/Documents";
import DocumentEditor from "../pages/dashboard/DocumentEditor";
import Settings from "../pages/dashboard/Settings";
import ChatAi from "../pages/dashboard/ChatAi";
import LandingPageGenerator from "../pages/dashboard/LandingPageGenerator";
import { checkSubscription } from "../utils/check-subscription";
import Plans from "../pages/Plans";
import Header from "../components/Dashboard/Header";
import { useFetchUserPlanInfoQuery } from "../features/templates/templateApi";
import BundleTemplates from "../pages/dashboard/BundleTemplates";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Templates = lazy(() => import("../pages/dashboard/Templates"));

const DashboardRoutes = () => {
  const isUserSubscription = checkSubscription();
  const acceptablePlans = ["Pro", "Standard"]
  const { data:userData, isError } = useFetchUserPlanInfoQuery();
  // if (isUserSubscription?.error || !isUserSubscription?.success)
  //   return (
  //     <div className="text-base-content font-bold text-[23px]">Loading</div>
  //   );
  // if (!isUserSubscription?.success) {
  //   return (
  //     <Routes>
  //       <Route
  //         path="/plans"
  //         index
  //         element={
  //           <Suspense fallback={<div>Loading...</div>}>
  //             <Header />
  //             <Plans refetchUserSub={isUserSubscription?.refetchUserSub} />
  //           </Suspense>
  //         }
  //       />
  //       <Route
  //         path="/settings"
  //         element={
  //           <Suspense
  //             className="overflow-hidden"
  //             fallback={<div>Loading...</div>}
  //           >
  //             <Settings />
  //           </Suspense>
  //         }
  //       />
  //       {/* <Route
  //         path="*"
  //         element={
  //           <Suspense fallback={<div>Loading...</div>}>
  //             <Header />
  //             <Plans />
  //           </Suspense>
  //         }
  //       /> */}
  //     </Routes>
  //   );
  // }
  console.log(isUserSubscription, ' subsc')
  return (
    <Routes>
      {!isUserSubscription?.success  ? (
        <>
          <Route
            path="/"
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                {!isUserSubscription?.data  ? (
                  <Plans isError={isError} refetchUserSub={isUserSubscription?.refetchUserSub} />
                ) :(<h4 className="text-center p-4">Something went wrong!</h4>)}
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense
                className="overflow-hidden"
                fallback={<div>Loading...</div>}
              >
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                {!isUserSubscription?.success && (
                  <Plans refetchUserSub={isUserSubscription?.refetchUserSub} />
                )}
              </Suspense>
            }
          />
        </>
      ) : (
        <>
          <Route
            path="/"
            index
            element={
              <Layout padding={true} data-aos="fade-up">
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/templates"
            element={
              <Layout padding={true} data-aos="fade-up">
                <Suspense fallback={<div>Loading...</div>}>
                  <Templates />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/templates/:id"
            element={
              <Suspense
                className="overflow-hidden"
                fallback={<div>Loading...</div>}
              >
                <TemplateForm />
              </Suspense>
            }
          />
          <Route
            path="/business"
            element={
              <Layout padding={true} data-aos="fade-up">
                <Suspense fallback={<div>Loading...</div>}>
                  <Business />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/documents"
            element={
              <Layout padding={acceptablePlans?.includes(userData?.plan_info?.name) ? true : false} data-aos="fade-up">
                <Suspense fallback={<div>Loading...</div>}>
                  <Documents />
                </Suspense>
              </Layout>
            }
          />
          {acceptablePlans?.includes(userData?.plan_info?.name) && <Route
            path="/documents/:id"
            element={
              <Suspense
                className="overflow-hidden"
                fallback={<div>Loading...</div>}
              >
                <DocumentEditor />
              </Suspense>
            }
          />}
          <Route
            path="/settings"
            element={
              <Suspense
                className="overflow-hidden"
                fallback={<div>Loading...</div>}
              >
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout padding={false} data-aos="fade-up">
                <ChatAi />
              </Layout>
            }
          />
          <Route
            path="/landing-page"
            element={
              <Suspense
                className="overflow-hidden"
                fallback={<div>Loading...</div>}
              >
                <LandingPageGenerator />
              </Suspense>
            }
          />
          <Route
            path="/category/:categ"
            element={
              <Layout padding={true} data-aos="fade-up">
                <Suspense fallback={<div>Loading...</div>}>
                  <BundleTemplates />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout padding={true} data-aos="fade-up">
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              </Layout>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default DashboardRoutes;
