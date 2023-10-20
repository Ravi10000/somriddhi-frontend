import axios from "./index";

export const sendGiftcard = (data) =>
  axios.post("/send-giftcard", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const fetchGiftcardDiscount = () => axios.get("/giftcard/discount");
