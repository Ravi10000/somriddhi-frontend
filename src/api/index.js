import axios from "axios";

// const BASEURL = "http://localhost:8001";
// const BASEURL = "http://3.108.161.80:8002";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config, _onRejected) {
  // config.headers['Authorization'] = localStorage.getItem('token') || '';
  config.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE3ZjQwMjE1NGEzNWU4NTU3OWMyMDAiLCJpYXQiOjE2NzkyOTEzOTQsImV4cCI6MTY3OTg5NjE5NH0.79NZuV_0z-b6jyl2TlK7V5bjtzfJZVfyQtbB9VCN1aI";

  return config;
});

// Banner APIs
export const getAllBanners = () => axios.get(`/api/banner`);
export const createNewBanner = (bodyFormData) => {
  return axios.post(`/api/banner`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
// FAQ APIs
export const getAllFaqs = () => axios.get(`/api/faq`);
export const addNewFaq = (bodyFormData) =>
  axios.post(`/api/faq`, bodyFormData, {
    headers: { "Content-Type": "application/json" },
  });

// users APIs
export const getAllUsers = () => axios.get(`/api/user`);
export const createUser = (bodyFormData) =>
  axios.post(`/api/user`, bodyFormData);

export async function sendOtp({ phone, countryCode = "+91" }) {
  // console.log("sendOTP", { phone, countryCode });
  const response = await axios.post(`/sendotp`, {
    phone,
    countryCode,
  });
  return response;
}

export async function verifyOtp({ phone, otp }) {
  // console.log("verifyOTP", { phone, otp });
  const response = await axios.post(`/verifyotp`, {
    phone,
    otp,
  });
  return response;
}
export async function updateUser({
  fname,
  lname,
  isContactVerified,
  referralCode,
}) {
  const response = await axios.patch("/user", {
    fname,
    lname,
    isContactVerified,
    referralCode,
  });
  return response;
}

// Deals APIs
export const getAllDeals = () => axios.get(`/api/deal`);
export const deleteDeal = (_id) => axios.delete(`/api/deal`, { _id });
export const createNewDeal = (bodyFormData) =>
  axios.post(`/api/deal`, bodyFormData);
export const updateDeal = (bodyFormData) =>
  axios.patch(`/api/deal`, bodyFormData);

// Category APIs
export const getAllCategories = () => axios.get(`/api/category`);
export const createNewCategory = (bodyFormData) =>
  axios.post(`/api/category`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// NewLetter APIs
export const getAllNewLetter = () => axios.get(`/api/newsletter`);
export const createNewNewLetter = (data) => axios.post(`/api/newsletter`, data);

// Membership APIs
export const getAllMemberships = () => axios.get(`/api/membership`);
export const createNewMemberships = (bodyFormData) => {
  return axios.post(`/api/membership`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Feedback APIs
export const getAllFeedbacks = () => {
  return axios.get(`/api/feedback`);
};
export const getActiveFeedbacks = () =>
  axios.get(
    `/api/feedback`,
    { status: "Active" },
    { header: { "Content-Type": "application/json" } }
  );

export const deleteFeedback = (_id) => {
  console.log({ _id });
  return axios.delete(
    `/api/feedback`,
    { _id },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const getAllTickets = () => axios.get(`/api/ticket`);
