import "./App.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import Banner from "./pages/Banner/Banner";
import Category from "./pages/Category/category";
import Deal from "./pages/Deals/deals";

// packages
import { Switch, Route } from "react-router-dom";

// components
import ScrollToTop from "./components/scrollToTop";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

// pages
import HomePage from "./pages/home/home.page";
import CouponPage from "./pages/coupon/coupon-page";
import CategoryPage from "./pages/category/category-page";
import CouponsClaimedPage from "./pages/coupon-claimed/coupon-claimed-page";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/category" element={<Category />} />
          <Route path="/deal" element={<Deal />} />
        </Routes>
      </BrowserRouter>
      <ScrollToTop />
      <Header />
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
