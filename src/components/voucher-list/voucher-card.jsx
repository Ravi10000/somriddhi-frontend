import { useNavigate } from "react-router-dom";
import tick from "../../../public/offer.svg";

const VoucherCard = ({ name, icon, offer, discount }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col h-[320px] w-[350px] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ">
      <img src={icon} alt="" className="h-[52px] mt-9" />
      <p className="mx-auto mt-5 font-medium text-[#12263F]">
        {name} Shopping Voucher
      </p>
      <hr className="h-[2px]  mt-2   w-full bg-gray-400" />
      <h2 className="text-[#12263F]  font-bold text-2xl text-start pl-5  mt-3">
        {offer}
      </h2>
      <div className="flex justify-between px-5 mt-[40px]">
        <div className="flex items-center text-[#3BA615] gap-x-3">
          <img src={tick} alt="" className="h-6" />
          <p className="text-[20px] font-medium">{discount}% OFF</p>
        </div>
        <button
          onClick={() => {
            navigate(`${name}`,{state:{icon,offer}});
          }}
          className="bg-[#F01C21] outline-none hover:text-[#F01C21] hover:bg-red-200 rounded-lg text-white font-medium p-3  px-7  text-xl"
        >
          Grab Now
        </button>
      </div>
    </div>
  );
};

export default VoucherCard;
