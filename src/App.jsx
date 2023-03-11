import "./App.scss";

// packages
import { useState } from "react";
import { Switch, Route } from "react-router-dom";

// components
import ScrollToTop from "./components/scrollToTop";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import LoginPopup from "./components/login-popup/login-popup";

// pages
import HomePage from "./pages/home/home.page";
import CouponPage from "./pages/coupon/coupon-page";
import CategoryPage from "./pages/category/category-page";
import CouponsClaimedPage from "./pages/coupon-claimed/coupon-claimed-page";

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
      {modalOpen && <LoginPopup closeModal={closeModal} />}
      <Header openModal={openModal} />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category/:category" component={CategoryPage} />
        <Route exact path="/coupon/:id" component={CouponPage} />
        <Route
          exact
          path="/coupon-claimed/:id"
          component={CouponsClaimedPage}
        />
      </Switch>
      <Footer />
    </div>
  );
}
