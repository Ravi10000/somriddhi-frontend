import styles from "./membership-slider.module.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginModal } from "../../context/login-modal-context";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

function MembershipSlider({ banners, currentUser }) {
  const navigate = useNavigate();
  const modal = useLoginModal();

  function checkLogin(url) {
    console.log({ currentUser });
    if (!currentUser) {
      return modal.openModal();
    }
    navigate(url);
  }
  const settings = {
    customPaging: function (i) {
      return <div className="dots">'</div>;
    },
    arrows: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          rows: 1,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          rows: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles["slider-container"]}>
      <Slider {...settings}>
        {banners.length > 0 &&
          banners?.map((banner, index) => (
            <div className={styles["card-container"]} key={index}>
              {/* <Link to={}> */}
              <img
                onClick={() => {
                  checkLogin("//" + banner?.url);
                }}
                className="bannerImageSet"
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                  banner?.image
                }`}
                onError={(e) => {
                  e && (e.target.src = "/no-photo.png");
                }}
                alt={banner?.title}
              />
              {/* </Link> */}
            </div>
          ))}
      </Slider>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(MembershipSlider);
