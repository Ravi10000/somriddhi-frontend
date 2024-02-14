import { PiBag } from "react-icons/pi";

const VoucherOfCompany = ({ icon, price }) => {
  return (
    <div className=" flex flex-col border border-red-400 h-auto w-[300px] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-10 ">
      <img src={icon} alt="" className="h-[52px] mt-5" />
      <h1 className="text-center mt-4 text-[#F01C21] text-2xl font-bold">
        (₹ {price})
      </h1>
      <div className="flex justify-between font-medium text-[#12263F] px-3 mt-3 mb-2">
        <p>Coupon</p>
        <p> ₹ {price}</p>
      </div>
      <hr className="w-full h-[1px] bg-[#1e3c8e]" />
      <div className="flex justify-between font-medium text-[#64C318] px-3 my-2">
        <p>Discount</p>
        <p> ₹ {price / 10}</p>
      </div>
      <hr className="w-full h-[1px] bg-[#1e3c8e]" />

      <div className="flex justify-between font-medium text-[#0583D2] px-3 my-2">
        <p>You Pay</p>
        <p> ₹ {price * 0.9}</p>
      </div>
      <button className=" outline-none flex space-x-2 rounded-t-none items-center p-3 justify-center w-full bg-[#F01C21] text-white">
        <PiBag className="h-8 w-5" />
        <p>Add to Cart</p>
      </button>
    </div>
  );
};

export default VoucherOfCompany;
