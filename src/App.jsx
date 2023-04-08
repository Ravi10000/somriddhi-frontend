import styles from "./App.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react hooks
import { useState, useEffect } from "react";
import { useLoginModal } from "./context/login-modal-context";

// packages
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import ScrollToTop from "./components/scrollToTop";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import LoginPopup from "./components/login-popup/login-popup";
import Flash from "./components/flash/flash";
import ProtectedRoute from "./components/protected-route/protected-route";

// pages
import HomePage from "./pages/home/home.page";
import CouponPage from "./pages/coupon/coupon-page";
import CategoryPage from "./pages/category/category-page";
import CouponsClaimedPage from "./pages/coupon-claimed/coupon-claimed-page";
import ProfilePage from "./pages/profile/profile-page";
import AdminPage from "./pages/admin/admin.page";
import AboutPage from "./pages/about/about.page";

// redux actions
import { setCurrentUser } from "./redux/user/user.actions";

// redux selectors
import { selectFlash } from "./redux/flash/flash.selectors";

// api calls
import { getCashbackDetails, getUser } from "./api";
import ProtectAdminRoute from "./pages/protect-admin-route/protect-admin-route";

function App({ setCurrentUser, flash }) {
  const modal = useLoginModal();
  const { pathname } = useLocation();
  async function fetchUser() {
    try {
      const response = await getUser();
      if (response.data.status === "success") {
        setCurrentUser(response.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles["App"]} id="App">
      {flash && <Flash type={flash.type} message={flash.message} />}
      {/* <Flash type={"error"} message={"successfully logged in"} /> */}
      <ScrollToTop />
      {modal.modalOpen && <LoginPopup closeModal={modal.closeModal} />}
      {!pathname.includes("/admin") && (
        <>
          <Header openModal={modal.openModal} />
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <ProtectAdminRoute>
              <Navigate to="/admin/banners" replace />
            </ProtectAdminRoute>
          }
        />

        <Route
          path="/admin/:tab"
          element={
            <ProtectAdminRoute>
              <AdminPage />
            </ProtectAdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectAdminRoute>
              <AdminPage />
            </ProtectAdminRoute>
          }
        />
        {/* <Route path="/admin/:tab" element={<AdminPage />} /> */}
        <Route path="/coupon/:id" element={<CouponPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route
          exact
          path="/coupon-claimed/:id"
          element={<CouponsClaimedPage />}
        />
        <Route
          exact
          path="/profile"
          element={<Navigate to="/profile/my-earnings" replace />}
        />
        <Route
          exact
          path="/profile/:tab"
          element={
            <ProtectedRoute openModal={modal.openModal}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute openModal={modal.openModal}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" exact element={<AboutPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
      {!pathname.includes("/admin") && <Footer />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  flash: selectFlash,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
