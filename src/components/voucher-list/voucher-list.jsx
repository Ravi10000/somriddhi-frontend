import VoucherCard from "./voucher-card";
import amazonSvg from "../../../public/vouchers/amazon.svg";
import flipkartSvg from "../../../public/vouchers/flipkart.svg"
import cromaSvg from "../../../public/vouchers/croma.svg"
import myntraSvg from "../../../public/vouchers/myntra.svg"
import ajioSvg from "../../../public/vouchers/ajio.svg"
import bigBasketSvg from "../../../public/vouchers/big basket.svg"
export default function VoucherList({ title }) {
  return (
    <section className="flex flex-col justify-center my-[60px]">
      <div className="font-semibold flex items-center flex-col justify-center text-[1.5rem]">
        {title}
        <div className="h-[5px] rounded-full w-[75px] bg-[#f01c21] "></div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4  mt-3 gap-y-[60px] gap-4 px-10">
        <VoucherCard
          icon={amazonSvg}
          name="Amazon"
          offer="Upto 60% off on summer Appliances"
          discount = "60"
        />
        <VoucherCard
          icon={flipkartSvg}
          name="Flipkart"
          offer="Upto 60% off on summer Appliances"
          discount = "60"
        />
        <VoucherCard
          icon={cromaSvg}
          name="Croma"
          offer="Upto 60% off on summer Appliances"
          discount = "60"
        />
        <VoucherCard
          icon={myntraSvg}
          name="Myntra"
          offer="Upto 60% off on summer Appliances"
          discount = "60"
        />
        <VoucherCard
          icon={bigBasketSvg}
          name="BigBasket"
          offer="Upto 60% off on summer Appliances"
          discount = "60"
        />
        <VoucherCard
          icon={ajioSvg}
          name="Ajio"
          offer="Upto 60% off on summer Appliances"
          discount = "60"
        />
      </div>
    </section>
  );
}
