import axios from "axios";

const BASEURL = "http://localhost:8001";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config, _onRejected) {
    // config.headers['Authorization'] = localStorage.getItem('token') || '';
    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBhZjg0Yjg1NzQzMzM0MTg4ZDIyNTMiLCJpYXQiOjE2Nzg0NDA1MjQsImV4cCI6MTY3OTA0NTMyNH0.pPlqFhHJ0KRW40xhJnMEMPczyNs789FUh9yJ3tdZ7I0';

    return config;
});
// Banner APIs
export const getAllBanners = (headers) => axios.get(`${BASEURL}/api/banner`, headers);
export const createNewBanner = (bodyFormData, headers) => axios.post(`${BASEURL}/api/banner`, bodyFormData, { headers });

// Deals APIs
export const getAllDeals = (headers) => axios.get(`${BASEURL}/api/deal`, headers);
export const createNewDeal = (bodyFormData, headers) => axios.post(`${BASEURL}/api/deal`, bodyFormData, { headers });

// Category APIs
export const getAllCategories = (headers) => axios.get(`${BASEURL}/api/category`, headers);
export const createNewCategory = (bodyFormData, headers) => axios.post(`${BASEURL}/api/category`, bodyFormData, { headers });


// NewLetter APIs
export const getAllNewLetter = (headers) => axios.get(`${BASEURL}/api/newsletter`, headers);
export const createNewNewLetter = (data, headers) => axios.post(`${BASEURL}/api/newsletter`, data, { headers });

// NewLetter APIs
export const getAllMemberships = (headers) => axios.get(`${BASEURL}/api/membership`, headers);
export const createNewMemberships = (bodyFormData, headers) => axios.post(`${BASEURL}/api/membership`, bodyFormData, { headers });