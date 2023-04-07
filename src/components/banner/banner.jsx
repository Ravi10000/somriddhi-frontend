import "./banner.styles.scss";
// import Carousel from "../carousel/carousel";
import React, { useEffect, useState } from "react";
import { fetchActiveBanners, getAllDeals } from "../../api/index";
import BannerSlider from "../banner-slider/banner-slider";

export default function Banner() {
  const [banners, setBanners] = useState([]);

  let bannerData;
  const allBannersData = async () => {
    bannerData = await fetchActiveBanners();
    console.log(bannerData.data.data);
    setBanners(bannerData.data.data);
  };
  useEffect(() => {
    allBannersData();
  }, []);

  // const redirectToBannerUrl = (url)=>{
  //   const navigate = useNavigate();
  //   naviahte
  // }

  return (
    <section className="banner">
      {/* <div className="carousel-container"> */}
      <div className="banner-carousel-container">
        <BannerSlider banners={banners} />
        {/* <CustomCarousel>
            {
              banners.map((banner, index) => (
                <CarouselItem>
                  <img className="bannerImageSet" src={`${import.meta.env.VITE_REACT_APP_API_URL}/${banner.image}`} />
                </CarouselItem>
              ))
            }
          </CustomCarousel> */}
      </div>
      {/* </div> */}
    </section>
  );
}
