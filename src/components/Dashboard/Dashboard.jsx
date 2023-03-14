import React from "react";
import Banner from "../banner/banner";
import Coupons from "../coupons/coupons";
import Deals from "../deals/deals";
import Download from "../download/download";
import Footer from "../footer/footer";
import Form from "../form/form";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Offers from "../offers/offers";
import PopulatCategories from "../popular-categories/popular-categories";
import PopularMembership from "../popular-membership/popular-membership";
import Process from "../process/process";

// import Banner from "./components/banner/banner";
// import Coupons from "./components/coupons/coupons";
// import Deals from "./components/deals/deals";
// import Download from "./components/download/download";
// import Footer from "./components/footer/footer";
// import Form from "./components/form/form";
// import Header from "./components/header/header";
// import Navbar from "./components/navbar/navbar";
// import Offers from "./components/offers/offers";
// import PopulatCategories from "./components/popular-categories/popular-categories";
// import PopularMembership from "./components/popular-membership/popular-membership";
// import Process from "./components/process/process";

export default function Dashboard() {
  return (
    <div>
      {/* <Header /> */}
      {/* <Navbar /> */}
      <Banner />
      <Offers />
      <Deals />
      <Coupons />
      <PopularMembership />
      <Form />
      <Process />
      <Download />
      <PopulatCategories />
      {/* <Footer /> */}
    </div>
  );
}
