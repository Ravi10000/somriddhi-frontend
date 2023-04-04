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
import axios from "axios";

function MembershipSlider({ banners, currentUser }) {
  const navigate = useNavigate();
  const modal = useLoginModal();

  function checkLogin(url) {
    console.log({ currentUser });
    if (!currentUser) {
      return modal.openModal();
    }
    if (url.startsWith("//")) url = url.substring(2).trim();
    console.log("Url: ", url);
    // navigate(url);
    window.location.replace(url);
  }
  async function sendBannerAnalytics(id) {
    if (!currentUser) {
      return modal.openModal();
    }
    if (id) {
      const formData = new FormData();
      formData.append("couponId", id);
      // currentUser && formData.append("userId", currentUser?._id);
      formData.append("deviceType", "Web");
      formData.append("couponType", "Membership");
      formData.append("startDateTime", new Date(Date.now()).toString());

      for (let entry of formData.entries()) {
        console.log(entry);
      }
      try {
        const response = await axios.post("/analytic/coupon", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        console.log({ response });
        if (response.data.status === "success") {
          const analyticId = response.data.analyticId;
          // setAnalyticId(response.data.analyticId);
          navigate(`/coupon/${analyticId}`, {
            state: { couponId: id, couponType: "Membership" },
          });
        }
        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
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
                  // checkLogin("//" + banner?.url);
                  sendBannerAnalytics(banner?._id);
                }}
                className="bannerImageSet"
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                  banner?.image
                }`}
                onError={(e) => {
                  e && (e.target.src = "/image-broke.png");
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
