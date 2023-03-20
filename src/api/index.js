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
export const getAllFaqs = (headers) => axios.get(`/api/faq`, headers);
export const addNewFaq = (bodyFormData, headers) =>
  axios.post(`/api/faq`, bodyFormData, {
    headers: { ...headers, "Content-Type": "application/json" },
  });

// users APIs
export const getAllUsers = (headers) => axios.get(`/api/user`, headers);
export const createUser = (bodyFormData, headers) =>
  axios.post(`/api/user`, bodyFormData, { headers });

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
export const getAllDeals = (headers) => axios.get(`/api/deal`, headers);
export const createNewDeal = (bodyFormData, headers) =>
  axios.post(`/api/deal`, bodyFormData, { headers });

// Category APIs
export const getAllCategories = (headers) =>
  axios.get(`/api/category`, headers);
export const createNewCategory = (bodyFormData, headers) =>
  axios.post(`/api/category`, bodyFormData, { headers });

// NewLetter APIs
export const getAllNewLetter = (headers) =>
  axios.get(`/api/newsletter`, headers);
export const createNewNewLetter = (data, headers) =>
  axios.post(`/api/newsletter`, data, { headers });

// Membership APIs
export const getAllMemberships = (headers) =>
  axios.get(`/api/membership`, headers);
export const createNewMemberships = (bodyFormData, headers) => {
  return axios.post(`/api/membership`, bodyFormData, {
    headers: { ...headers, "Content-Type": "multipart/form-data" },
  });
};

// Feedback APIs
export const getAllFeedbacks = (headers) => {
  console.log({ headers });
  return axios.get(`/api/feedback`, headers);
};
export const getActiveFeedbacks = (headers) =>
  axios.get(
    `/api/feedback`,
    { status: "Active" },
    { header: { ...headers, "Content-Type": "application/json" } }
  );

export const deleteFeedback = (_id, headers) => {
  console.log({ _id, headers });
  return axios.delete(
    `/api/feedback`,
    { _id: _id },
    { headers: { ...headers, "Content-Type": "application/json" } }
  );
};
