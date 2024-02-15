import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import GiftCard from "../gift-card/gift-card";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import VoucherOfCompany from "./voucherCard";
const VoucherDetails = () => {
  const navigate = useNavigate();
  const skuIds = {
    Amazon: "EGCGBAMZSVSRDPL001",
    Flipkart: "EGVGBFLSCLPS001",
    Croma: "EGCGBCROM001",
    Myntra: "EGCGBMYTS001",
    BigBasket: "EGCGBBBS001",
    // "Ajio":""
  };
  const [giftCards, setGiftCards] = useState(null);
  const description = useRef(null);
  const { pathname, state, icon } = useLocation();
  const name = pathname.split("/").pop();
  const data = state;
  console.log({ giftCards });
  async function handleFetchGiftCards() {
    try {
      const response = await axios.get(`/getgiftcards/${skuIds[name]}`);
      response.data.data.price.denominations = [
        "1",
        "10",
        "100",
        "500",
        "1000",
        "2000",
        "3000",
        "4000",
        "5000",
        "6000",
        "7000",
        "8000",
        "9000",
        "10000",
      ];

      if (response?.data?.status === "Success") {
        setGiftCards(response?.data?.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchGiftCards();
  }, []);
  useEffect(() => {
    if (!!giftCards) {
      description.current.innerHTML = giftCards?.description;
    }
  }, [giftCards]);
  const settings = {
    customPaging: function (i) {
      return <div className="dots">'</div>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    draggable: true,
    rows: 2,
    initialSlide: 0,
    appendDots: (dots) => (
      <div
        className="dots-container"
        style={{
          width: "100%",
          display: "flex",
          height: "10px",
          overflowY: "hidden",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%" }}>{dots}</div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          rows: 1,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          rows: 1,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log({ giftCards });

  return (
    <section className="pt-10">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex cursor-pointer w-[120px] items-center gap-x-4 pl-5"
      >
        <FaArrowLeft />
        <p>Go Back</p>
      </div>
      <hr className="h-[2px]  my-5    w-full bg-gray-200" />

      <div className="flex  my-[30px] justify-start items-center w-full gap-x-10 px-10">
        <div className="  flex flex-col items-center justify-between pb-10 h-[220px] w-[320px] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <img src={data.icon} alt="" className="h-[52px] mt-9" />
          <p className="text-[#3BA615]">({data.offer})</p>
        </div>
        <div className="flex h-auto  flex-col justify-start items-start w-[70%] text-[#12263F]">
          <h1 className="font-bold text-2xl leading-7">{name}</h1>
          <p className="font-medium mb-5 leading-6 opacity-80">
            ({data.offer})
          </p>
          <div ref={description ?? ""}></div>
        </div>
      </div>
      <hr className="h-[2px]  mt-2   w-full bg-gray-400" />
      <div className="w-full p-10 ">
        <Slider {...settings}>
          {giftCards?.price?.denominations?.map((price, idx) => (
            <VoucherOfCompany 
            key={idx}
            sku={giftCards.sku}
            icon={data.icon} price={price} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default VoucherDetails;
