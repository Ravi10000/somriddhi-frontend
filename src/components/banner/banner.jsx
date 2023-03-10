import "./banner.styles.scss";
// import Carousel from "../carousel/carousel";
import React from "react";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";

export default function Banner() {
  const listOfImages = ["/banner1.png", "/table-bg.png", "/banner1.png"];

  return (
    <section className="banner">
      <div className="carousel-container">
        <div className="carousel-container">
          <CustomCarousel>
            <CarouselItem>
              <img src="/banner1.png" />
            </CarouselItem>
            <CarouselItem>
              <img src="/banner1.png" />
            </CarouselItem>
            <CarouselItem>
              <img src="/banner1.png" />
            </CarouselItem>
          </CustomCarousel>
        </div>
      </div>
    </section>
  );
}
