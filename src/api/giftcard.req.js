import axios from "./index";

export const sendGiftcard = (data) =>
  axios.post("/send-giftcard", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const fetchGiftcardDiscount = () => axios.get("/giftcard/discount");

export const manageGiftcardDiscount = (discountPercentage) =>
  axios.post(
    "/giftcard/discount",
    { discountPercentage },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
