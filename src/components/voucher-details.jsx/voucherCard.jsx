import { useEffect, useState } from "react";
import { PiBag } from "react-icons/pi";
import { FaMinus } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart/cart.actions";
import toast from "react-hot-toast";
const VoucherOfCompany = ({ icon, price, sku }) => {
  const [priceY, setPrice] = useState(price);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [youPay, setYouPay] = useState(price * 0.9);
  const [skuIds, setSkuIds] = useState({});
  useEffect(() => {
    setPrice(price);
  }, []);
  const handleIncrement = () => {
    dispatch(addToCart(skuIds));
  };
  const handleDecrement = () => {
    dispatch(removeFromCart(skuIds));
  };
  useEffect(() => {
    if (Object.keys(skuIds).length > 0) {
      handleIncrement();
    }
    // else if (Object.keys(skuIds).length === 0) {
    //   handleDecrement();
    // }
  }, [skuIds, quantity]);
  return (
    <div className=" flex flex-col border border-red-400 h-auto w-[300px] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-10 ">
      <img src={icon} alt="" className="h-[52px] mt-5" />
      <h1 className="text-center mt-4 text-[#F01C21] text-2xl font-bold">
        (₹ {priceY})
      </h1>
      <div className="flex justify-between font-medium text-[#12263F] px-3 mt-3 mb-2">
        <p>Coupon</p>
        <p> ₹ {priceY}</p>
      </div>
      <hr className="w-full h-[1px] bg-[#1e3c8e]" />
      <div className="flex justify-between font-medium text-[#64C318] px-3 my-2">
        <p>Discount</p>
        <p> ₹ {priceY / 10}</p>
      </div>
      <hr className="w-full h-[1px] bg-[#1e3c8e]" />

      <div className="flex justify-between font-medium text-[#0583D2] px-3 my-2">
        <p>You Pay</p>
        <p> ₹ {priceY * 0.9}</p>
      </div>
      {quantity === 0 && (
        <button
          onClick={() => {
            toast.success('Button clicked!');

            setQuantity((prev) => prev + 1);
            setSkuIds({
              id: `${sku}-${priceY}`,
              skuId: sku,
              denomination: priceY,
              price: youPay,
              quantity: quantity + 1,
            });
          }}
          className=" outline-none flex space-x-2 rounded-t-none items-center p-3 justify-center w-full bg-[#F01C21] text-white"
        >
          <PiBag className="h-8 w-5" />
          <p>Add to Cart</p>
        </button>
      )}
      {quantity !== 0 && (
        <div className="flex p-2 justify-evenly items-center">
          <FaMinus
            onClick={() => {
              if (quantity === 1) {
                handleDecrement(skuIds)
                setQuantity(0);
                setSkuIds({});
                return;
              }

              setQuantity((prev) => prev - 1);
              setSkuIds({
                id: `${sku}-${priceY}`,
                skuId: sku,
                denomination: priceY,
                price: youPay * quantity - youPay,
                quantity: quantity - 1,
              });
            }}
            className="h-6 w-6  text-[#12263F]  cursor-pointer"
          />
          <p className="text-lg font-semibold text-[#12263F]"> {quantity}</p>
          <IoIosAdd
            onClick={() => {
              toast.success('Button clicked!');
              setQuantity((prev) => prev + 1);
              setSkuIds({
                id: `${sku}-${priceY}`,
                skuId: sku,
                denomination: priceY,
                price: youPay * quantity + youPay,
                quantity: quantity + 1,
              });
            }}
            className="h-10 w-10 text-[#F01C21] cursor-pointer  !font-black"
          />
        </div>
      )}
    </div>
  );
};

export default VoucherOfCompany;
