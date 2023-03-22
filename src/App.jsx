import "./App.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// components
import ScrollToTop from "./components/scrollToTop";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import LoginPopup from "./components/login-popup/login-popup";
import ProtectedRoute from "./components/protected-route/protected-route";

// pages
import HomePage from "./pages/home/home.page";
import CouponPage from "./pages/coupon/coupon-page";
import CategoryPage from "./pages/category/category-page";
import CouponsClaimedPage from "./pages/coupon-claimed/coupon-claimed-page";
import ProfilePage from "./pages/profile/profile-page";
import AdminPage from "./pages/admin/admin.page";
import axios from "axios";

import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { getUser } from "./api";
// fetch user from api!!!!!!!!!!!!!!!!!!!!!

function App({ setCurrentUser }) {
  const { pathname } = useLocation();
  // console.log({ pathname });
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchUser() {
    try {
      const response = await getUser();
      console.log({ response });
      // if (response.data.status === "success") {
      //   setCurrentUser(response.data.data);
      // }
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  function closeModal() {
    setModalOpen(false);
  }
  function openModal() {
    setModalOpen(true);
  }
  return (
    <div className="App">
      <ScrollToTop />
      {!pathname.includes("/admin") && (
        <>
          {modalOpen && <LoginPopup closeModal={closeModal} />}
          <Header openModal={openModal} />
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route
          path="/admin"
          element={<Navigate to="/admin/banners" replace />}
        />
        <Route path="/admin/:tab" element={<AdminPage />} />
        {/* <Route path="/admin/banner" element={<Banner />} /> */}
        <Route path="/coupon/:id" element={<CouponPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          exact
          path="/coupon-claimed/:id"
          element={<CouponsClaimedPage />}
        />
        <Route exact path="/profile" element={<ProfilePage />} />
        {/* <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute openModal={openModal}>
              <ProfilePage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      {!pathname.includes("/admin") && <Footer />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
