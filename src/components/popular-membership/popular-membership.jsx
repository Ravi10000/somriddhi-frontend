// import MembershipOfferCard from "./membership-offer-card/membership-offer-card";
import "./popular-membership.styles.scss";
// import popularOfferList from "./popular-offers-list";
import { getAllMemberships } from "../../api/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerSlider from "../banner-slider/banner-slider";
import MembershipSlider from "../membership-slider/membership-slider";
export default function PopularMembership() {
  const [memberships, setMemberships] = useState([]);

  const allMembershipsData = async () => {
    const allmemberships = await getAllMemberships();
    // console.log(allmemberships);
    setMemberships(allmemberships.data.data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    allMembershipsData();
  }, []);
  return (
    <section className="popular-membership-section">
      <div className="membership-title">
        <h2 className="_title">Popular Membership</h2>
      </div>
      <div className="membership-carousel">
        <MembershipSlider banners={memberships}/>
      </div>
      {/* <div className="offers-container"> */}
      {/* {memberships.map((membership, index) => {
          if (index % 2 == 0) {
            return (
              <img
                onClick={() => {
                  window.open(membership.url);
                }}
                className="offer"
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${membership.image}`}
                alt="offer"
              />
            );
          } else {
            return (
              <img
                className="Oddoffer"
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${membership.image}`}
                alt="offer"
              />
            );
          }
        })} */}
      {/* </div> */}
    </section>
  );
}
