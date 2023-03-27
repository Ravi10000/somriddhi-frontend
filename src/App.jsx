import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react hooks
import { useState, useEffect, useContext, createContext } from "react";

// packages
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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

// redux actions
import { setCurrentUser } from "./redux/user/user.actions";

// redux selectors
import { selectFlash } from "./redux/flash/flash.selectors";

// api calls
import { getUser } from "./api";

function App({ setCurrentUser, flash, setFlash }) {
  const { pathname } = useLocation();
  // console.log({ pathname });
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchUser() {
    try {
      const response = await getUser();
      // console.log({ response });
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

  function closeModal() {
    setModalOpen(false);
  }
  function openModal() {
    setModalOpen(true);
  }
  return (
    // <LoginModalProvider>
    <div className="App" id="App">
      {flash && <Flash type={flash.type} message={flash.message} />}
      {/* <Flash type={"error"} message={"successfully logged in"} /> */}
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
        <Route
          path="/coupon/:id"
          element={<CouponPage openModal={openModal} />}
        />
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
        <Route exact path="/profile/:tab" element={<ProfilePage />} />
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
    // </LoginModalProvider>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

const mapStateToProps = createStructuredSelector({
  // currentUser: selectCurrentUser,
  flash: selectFlash,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  // signIn: (user) => dispatch(signIn(user)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(null, mapDispatchToProps)(App);

export const LoginModalContext = createContext();
export const useLoginModal = () => useContext(LoginModalContext);

export function LoginModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  return (
    <LoginModalContext.Provider value={{ modalOpen, closeModal, openModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}
