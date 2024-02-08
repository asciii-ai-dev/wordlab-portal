import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Plan = ({ step, plansSelected, setPlansSelected, reusable }) => {

  const [verified, setVerified] = useState(false);
  const plans = [
    "Blog Templates",
    "Email",
    "Website Content",
    "Social Media",
    "Personal Writing",
    "Ad Writing",
    "Academic Writing",
    "Technical Writing",
    "Other",
  ];
  const RECAPTCHA_SECRET_KEY = "6LeH9dUkAAAAAC0SatHAhCoAiQ987yRBiTMr7ycn";

  const handlePlanSelect = (data) => {
    // Create a copy of the plansSelected set
    const newPlansSelected = new Set(plansSelected);
  
    if (newPlansSelected.has(data)) {
      // If the item is already selected, remove it from the set
      newPlansSelected.delete(data);
    } else {
      // If the item is not selected, add it to the set
      newPlansSelected.add(data);
    }
  
    setPlansSelected(newPlansSelected);
  };

  const handleRecaptcha = async (token) => {
    // try {
    //   const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`, {
    //     method: 'POST',
    //     "Access-Control-Allow-Origin": "http://127.0.0.1:5173"
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     // Proceed with desired action
    //     console.log('reCAPTCHA verification successful!');
    //   } else {
    //     // Display error message and prompt user to try again
    //     console.log('reCAPTCHA verification failed.');
    //   }
    // } catch (error) {
    //   console.error('Error verifying reCAPTCHA:', error);
    // }
    token && setVerified(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-5 text-center">
        {!reusable && (
          <p className="text-light text-[15px] font-[500]">
            Step {step + 1} of 3
          </p>
        )}
        <h2 className="text-base-content text-[23px] font-[600]">
          How do you plan to use Wordlab
        </h2>
      </div>

      <div className="space-y-6 py-5 w-full flex flex-col items-center">
        <div className="w-full flex flex-wrap justify-center sm:grid sm:grid-cols-3 gap-y-6 gap-x-4 ">
          {plans &&
            plans.map((plan, i) => (
              <button
                onClick={() => handlePlanSelect(plan)}
                key={i}
                type="button"
                className={
                  plansSelected.has(plan)
                    ? "text-white rounded-[4px] bg-primary  py-2"
                    : "text-dark rounded-[4px] border border-[#E9EAEB] bg-[#FEFEFE]  py-2"
                }
              >
                <p className="text-center text-[12px] px-3">{plan}</p>
              </button>
            ))}
        </div>
        {!reusable && (
          <div className="md:pt-8 pt-4">
            <ReCAPTCHA
              sitekey={"6LeH9dUkAAAAADme5xnBO5M5il6iNtDTJmQdtgAi"}
              onChange={(e) => handleRecaptcha(e)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
