import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import Navbar from "./Shared/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Shared/Footer";
import MyOrder from "./Components/MyOrder";
import AddReview from "./Components/AddReview";
import MyProfile from "./Components/MyProfile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import AddAProduct from "./Components/AddAProduct";
import ManageAllOrders from "./Components/ManageAllOrders";
import PrivateDashboard from "./Routes/PrivateDashboard";
import Payment from "./Pages/Payment";
import MakeAdmin from './Components/MakeAdmin'
import PrivateAdmin from "./Routes/PrivateAdmin";
import MangeProduct from "./Components/MangeProduct";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Routes>
        {PublicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}

        <Route element={<PrivateRoutes />}>
          {ProtectedRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>

        <Route path="/dashboard"element={<PrivateDashboard><Dashboard /></PrivateDashboard>}>

          <Route index element={<MyOrder />} />
          <Route path="addReview" element={<AddReview />} />
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="payment/:id" element={<Payment />} />

          <Route path="addAProduct" element={<PrivateAdmin><AddAProduct /></PrivateAdmin>} />
          <Route path="makeAdmin" element={<PrivateAdmin><MakeAdmin /></PrivateAdmin>} />
          <Route path="manageAllOrders" element={<PrivateAdmin><ManageAllOrders /></PrivateAdmin>} />
          <Route path="manageProduct" element={<PrivateAdmin><MangeProduct /></PrivateAdmin>} />
          
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </Fragment>
  );
};

export default App;
