import AuthRoutes from "./routers/auth";
import DashboardRoutes from "./routers/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { setCredentials } from "./features/auth/authSlice";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 100,
      once: true,
      offset: 200,
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem('userInfo');
    if (storedData) {
      dispatch(setCredentials(JSON.parse(storedData)));
    }
  },[])
  

  const auth= useSelector((state) => state?.auth);

  let token = auth?.token || false;

  return (
    <>
      <Toaster position="top-right" containerClassName="text-[14px]"  />
      {!token ? <AuthRoutes /> : <DashboardRoutes />}
    </>
  );
}

export default App;

// {
//   name,
//   email,
//   password,
//   are_you,
//   company || user_industry,
//   domain,
//   plansSelected: [],
//   user_type: 'email' || 'google'
// }
