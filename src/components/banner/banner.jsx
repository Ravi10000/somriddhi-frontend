import "./banner.styles.scss";
// import Carousel from "../carousel/carousel";
import React, { useEffect, useState } from "react";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";
import { getAllBanners, getAllDeals } from "../../api/index.js";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const listOfImages = ["/banner1.png", "/table-bg.png", "/banner1.png"];
  const [banners, setBanners] = useState([]);

  let bannerData;
  const allBannersData = async () => {
    bannerData = await getAllBanners();
    // console.log(bannerData.data.data)
    setBanners(bannerData.data.data)
  }
  useEffect(() => {
    allBannersData();
  }, [])

  // const redirectToBannerUrl = (url)=>{
  //   const navigate = useNavigate();
  //   naviahte
  // }


  return (
    <section className="banner">
      <div className="carousel-container">
        <div className="carousel-container">
          <CustomCarousel>
            {
              banners.map((banner, index) => (
                <CarouselItem>
                  <img className="bannerImageSet" src={`http://localhost:8001/uploads/${banner.image}`} />
                </CarouselItem>
              ))
            }
          </CustomCarousel>
        </div>
      </div>
    </section>
  );
}
