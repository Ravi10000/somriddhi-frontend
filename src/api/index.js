import axios from "axios";

// const BASEURL = "http://localhost:8001";
// const BASEURL = "http://3.108.161.80:8002";
axios.defaults.baseURL = "/api";
// axios.defaults.withCredentials = true;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE3ZjQwMjE1NGEzNWU4NTU3OWMyMDAiLCJpYXQiOjE2NzkyOTEzOTQsImV4cCI6MTY3OTg5NjE5NH0.79NZuV_0z-b6jyl2TlK7V5bjtzfJZVfyQtbB9VCN1aI";
const Authorization = `Bearer ${token}`;

console.log(localStorage.getItem("token"));
const localToken = localStorage.getItem("token");
const authLocal = localToken ? `Bearer ${localToken}` : "";
// axios.interceptors.request.use(function (config, _onRejected) {
//   // config.headers['Authorization'] = localStorage.getItem('token') || '';
//   config.headers["Authorization"] =
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE3ZjQwMjE1NGEzNWU4NTU3OWMyMDAiLCJpYXQiOjE2NzkyOTEzOTQsImV4cCI6MTY3OTg5NjE5NH0.79NZuV_0z-b6jyl2TlK7V5bjtzfJZVfyQtbB9VCN1aI";

//   return config;
// });

// Banner APIs
export const getAllBanners = () => axios.get(`/banner`);
export const createNewBanner = (formData) => {
  return axios.post(`/banner`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
};
// FAQ APIs
export const getAllFaqs = () =>
  axios.get(`/faq`, { headers: { Authorization } });
export const addNewFaq = (formData) =>
  axios.post(`/faq`, formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

// users APIs
export const getUser = () =>
  axios.get(`/getuser`, { headers: { Authorization: authLocal } });
export const createUser = (formData) => {
  return axios.post(`/user`, formData, {
    headers: { Authorization: authLocal, "Content-Type": "application/json" },
  });
};
export const updateUser = (id, formData) => {
  return axios.put(`/user/${id}`, formData, {
    headers: { Authorization: authLocal, "Content-Type": "application/json" },
  });
};

export const logoutUser = async () => {
  const response = await axios.post(`/logout`, {
    headers: { Authorization: authLocal },
  });
  console.log({ response });
  if (response.status === "success") {
    localStorage.removeItem("token");
  }
  return response;
};

export const getAllUsers = () =>
  axios.get(`/user`, { headers: { Authorization } });

export async function sendOtp(formData) {
  for (let entry of formData.entries()) {
    console.log(entry);
  }
  const response = await axios.post(`/sendotp`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function verifyOtp(formData) {
  const response = await axios.post(`verifyotp`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  localStorage.setItem("token", response.data.token);
  return response;
}
// export async function updateUser(formData) {
//   const response = await axios.patch("/user", formData);
//   return response;
// }

// Deals APIs
export const getAllDeals = (formData) => {
  return axios.post("/getdeal", formData, {
    headers: { "Content-Type": "application/json" },
  });
};
export const createNewDeal = (formData) =>
  axios.post(`/deal`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const updateDeal = (formData) =>
  axios.patch(`/deal`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const deleteDeal = (_id) =>
  axios.delete(
    `/deal`,
    { _id },
    { headers: { Authorization, "Content-Type": "application/json" } }
  );

// Category APIs
export const getAllCategories = () => axios.get(`/category`);
export const createNewCategory = (formData) =>
  axios.post(`/category`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });

// NewLetter APIs
export const getAllNewLetter = () =>
  axios.get(`/newsletter`, { headers: { Authorization } });
export const createNewNewLetter = (data) =>
  axios.post(`/newsletter`, data, { headers: { Authorization } });

// Membership APIs
export const getAllMemberships = () =>
  axios.get(`/membership`, { headers: { Authorization } });
export const createNewMemberships = (formData) => {
  return axios.post(`/membership`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
};

// Feedback APIs
export const createNewFeedback = (formData) => {
  return axios.post(`/feedback`, formData, {
    headers: {
      Authorization: authLocal,
      "Content-Type": "application/json",
    },
  });
};
export const getAllFeedbacks = () => {
  return axios.get(`/feedback`, { headers: { Authorization: authLocal } });
};
export const getActiveFeedbacks = () =>
  axios.get(
    `/feedback`,
    { status: "Active" },
    { header: { Authorization, "Content-Type": "application/json" } }
  );

export const deleteFeedback = (_id) => {
  console.log({ _id });
  return axios.delete(
    `/feedback`,
    { _id },
    { headers: { Authorization, "Content-Type": "application/json" } }
  );
};

export const getAllTickets = () =>
  axios.get(`/ticket`, { headers: { Authorization } });

export const getMyTickets = () =>
  axios.get(`/mytickets`, { headers: { Authorization: authLocal } });

export const addNewTicket = (formData) => {
  return axios.post("/ticket", formData, {
    headers: { Authorization: authLocal, "Content-Type": "application/json" },
  });
};
