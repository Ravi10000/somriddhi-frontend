import "./home.styles.scss";

// section components
import Banner from "../../components/banner/banner";
import Coupons from "../../components/coupons/coupons";
import Deals from "../../components/deals/deals";
import Download from "../../components/download/download";
import Form from "../../components/form/form";
import Offers from "../../components/offers/offers";
import PopulatCategories from "../../components/popular-categories/popular-categories";
import PopularMembership from "../../components/popular-membership/popular-membership";
import Process from "../../components/process/process";
import ScrollToTop from "../../components/scrollToTop";

export default function HomePage() {
  return (
    <div className="home-page" id="home">
      <ScrollToTop />
      <Banner />
      <Offers />
      <Deals />
      <Coupons />
      <PopularMembership />
      <Form />
      <Process />
      <Download />
      <PopulatCategories />
    </div>
  );
}
