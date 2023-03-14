import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Banner from "./pages/Banner/Banner";
import Category from "./pages/Category/category";
import Deal from "./pages/Deals/deals";

// packages
import { useState } from "react";
// import { Switch, Route } from "react-router-dom";

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

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }
  function openModal() {
    setModalOpen(true);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        {modalOpen && <LoginPopup closeModal={closeModal} />}
        <Header openModal={openModal} />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/banner" element={<Banner />} />
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
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/deal" element={<Category />} />
          <Route path="/categories" element={<Deal />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>

      {/* <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category/:category" component={CategoryPage} />
        <Route exact path="/coupon/:id" component={CouponPage} />
        <Route
          exact
          path="/coupon-claimed/:id"
          component={CouponsClaimedPage}
        />
      </Switch> */}
    </div>
  );
}
