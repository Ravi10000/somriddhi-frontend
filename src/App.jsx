import React from "react";
import "./App.scss";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/home/home.page";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "./pages/details/details-page";
import CouponPage from "./pages/coupon/coupon-page";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/details" component={DetailsPage} />
        <Route exact path="/coupon" component={CouponPage} />
      </Switch>
      <Footer />
    </div>
  );
}
