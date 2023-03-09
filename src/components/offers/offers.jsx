import "./offers.styles.scss";
import { useEffect, useState } from "react";
import OfferCard from "./offer-card/offer-card";
import offerList from "./offers-list";
import Category from "./category/category";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";

export default function Offers() {
  const categories = [
    {
      name: "popular coupons",
      img: "/popular.png",
    },
    {
      name: "ending soon",
      img: "/ending.png",
    },
    {
      name: "latest coupons",
      img: "/latest.png",
    },
  ];
  const [deviceWidth, setDeviceWidth] = useState(null);

  useEffect(() => {
    console.log(window.innerWidth);
    setDeviceWidth(window.innerWidth);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("popular coupons");
  return (
    <section className="offers-section">
      <div className="categories">
        {categories.map(({ name, img }) => (
          <Category
            key={name}
            name={name}
            img={img}
            selected={selectedCategory === name}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      <div className="carousel-container">
        <CustomCarousel>
          {offerList?.map(({ title, discount, imgUrl }, index) => {
            return (
              <CarouselItem>
                <OfferCard
                  key={index}
                  title={title}
                  discount={discount}
                  imgUrl={imgUrl}
                />
              </CarouselItem>
            );
          })}
        </CustomCarousel>
      </div>
    </section>
  );
}
