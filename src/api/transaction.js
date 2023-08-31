import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_API_URL}/api`;

export const initiateTransaction = async (transaction) =>
  axios.post("/transaction", transaction, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const fetchTransaction = async (id) => axios.get(`/transaction/${id}`);

export const orderGiftCard = async (giftCardDetails) =>
  axios.post("/addgiftcards", giftCardDetails, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
