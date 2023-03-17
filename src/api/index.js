import axios from "axios";

// const BASEURL = "http://localhost:8001";
const BASEURL = "http://3.108.161.80:8002";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config, _onRejected) {
  // config.headers['Authorization'] = localStorage.getItem('token') || '';
  config.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NDEyYjE1NGEzNWU4NTU3OWI5NjYiLCJpYXQiOjE2NzkwNDkwMDMsImV4cCI6MTY3OTY1MzgwM30.pW8T2J8P-UQVJ_qgD-bjU6sDUefa0xsFDYG1ybLkLIw";

  return config;
});
// Banner APIs
export const getAllBanners = (headers) =>
  axios.get(`${BASEURL}/api/banner`, headers);
export const createNewBanner = (bodyFormData, headers) => {
  axios.post(`${BASEURL}/api/banner`, bodyFormData, {
    ...headers,
    "Content-Type": "multipart/form-data",
  });
};
// FAQ APIs
export const getAllFaqs = (headers) => axios.get(`${BASEURL}/api/faq`, headers);
export const addNewFaq = (bodyFormData, headers) =>
  axios.post(`${BASEURL}/api/faq`, bodyFormData, { headers });

// users APIs
export const getAllUsers = (headers) =>
  axios.get(`${BASEURL}/api/user`, headers);
export const createUser = (bodyFormData, headers) =>
  axios.post(`${BASEURL}/api/user`, bodyFormData, { headers });

// Deals APIs
export const getAllDeals = (headers) =>
  axios.get(`${BASEURL}/api/deal`, headers);
export const createNewDeal = (bodyFormData, headers) =>
  axios.post(`${BASEURL}/api/deal`, bodyFormData, { headers });

// Category APIs
export const getAllCategories = (headers) =>
  axios.get(`${BASEURL}/api/category`, headers);
export const createNewCategory = (bodyFormData, headers) =>
  axios.post(`${BASEURL}/api/category`, bodyFormData, { headers });

// NewLetter APIs
export const getAllNewLetter = (headers) =>
  axios.get(`${BASEURL}/api/newsletter`, headers);
export const createNewNewLetter = (data, headers) =>
  axios.post(`${BASEURL}/api/newsletter`, data, { headers });

// NewLetter APIs
export const getAllMemberships = (headers) =>
  axios.get(`${BASEURL}/api/membership`, headers);
export const createNewMemberships = (bodyFormData, headers) =>
  axios.post(`${BASEURL}/api/membership`, bodyFormData, { headers });
