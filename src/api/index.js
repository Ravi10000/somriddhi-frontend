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
export const createNewBanner = (data, headers) => axios.post(`${BASEURL}/api/banner`, { data, headers });

// Deals APIs
export const getAllDeals = (headers) => axios.get(`${BASEURL}/api/deal`, headers);
export const createNewBDeal = (data, headers) => axios.post(`${BASEURL}/api/deal`, { data, headers });

// Category APIs
export const getAllCategories = (headers) => axios.get(`${BASEURL}/api/category`, headers);
export const createNewCategory = (data, headers) => axios.post(`${BASEURL}/api/category`, { data, headers });