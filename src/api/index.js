import axios from "axios";

// const BASEURL = `${import.meta.env.VITE_REACT_APP_API_URL}`;
// console.log(BASEURL);
// const BASEURL = "http://3.108.161.80:8002";
axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_API_URL}/api`;
// axios.defaults.withCredentials = true;
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE3ZjQwMjE1NGEzNWU4NTU3OWMyMDAiLCJpYXQiOjE2NzkyOTEzOTQsImV4cCI6MTY3OTg5NjE5NH0.79NZuV_0z-b6jyl2TlK7V5bjtzfJZVfyQtbB9VCN1aI";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwNDZlMjQ2NjYzYWI3MTRiMWVhNzYiLCJpYXQiOjE2Nzk5MDAyMTgsImV4cCI6MTY4MDUwNTAxOH0.2GZWVkZn1zlH0Z49RXG5pvuIbsB1-rTO-1Bg5hLtc2A";
const Authorization = `Bearer ${token}`;

// console.log(localStorage.getItem("token"));
// const localToken = localStorage.getItem("token");
// const authLocal = localToken ? `Bearer ${localToken}` : "";
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
export const editBanner = (formData) => {
  return axios.patch(`/banner`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
};

export const deleteBanner = (id) =>
  axios.delete(`/banner/${id}`, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

// FAQ APIs
export const getAllFaqs = () =>
  axios.get(`/faq`, { headers: { Authorization } });

export const addNewFaq = (formData) =>
  axios.post(`/faq`, formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });
export const editFaq = (formData) =>
  axios.patch(`/faq`, formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

export const deleteFaq = (id) =>
  axios.delete(`/faq/${id}`, { headers: { Authorization } });

// users APIs
export const getUser = () =>
  axios.get(`/getuser`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

export const createUser = (formData) => {
  // console.log({ authLocal });
  // console.log({ token: localStorage.getItem("token") });
  return axios.post(`/user`, formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};
export const updateUser = (id, formData) => {
  return axios.put(`/updateUser/${id}`, formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  // const response = await axios.delete(`/logout`, {
  //   headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  // });
  // console.log({ response });
  // if (response.status === "success") {
  //   localStorage.removeItem("token");
  // }
  // return response;
};

export const getAllUsers = () =>
  axios.get(`/user`, { headers: { Authorization } });

export async function sendOtp(formData) {
  // for (let entry of formData.entries()) {
  //   console.log(entry);
  // }
  const response = await axios.post(`/sendotp`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function verifyOtp(formData) {
  const response = await axios.post(`verifyotp`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  // console.log("after verify otp", response);
  localStorage.setItem("token", response.data.token);
  return response;
}
// export async function updateUser(formData) {
//   const response = await axios.patch("/user", formData);
//   return response;
// }

// Deals APIs
export const getAllDeals = (categoryId) => {
  // console.log(`Get all deals ${categoryId}`);
  if (categoryId) return axios.get(`/deal/${categoryId}`);
  else return axios.get(`/deal`);
};
export const getDealById = (id) => {
  return axios.get(`/deal/single/${id}`);
};
export const createNewDeal = (formData) =>
  axios.post(`/deal`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const updateDeal = (formData) =>
  axios.patch(`/deal`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const deleteDeal = (id) =>
  axios.delete(`/deal/${id}`, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

// Category APIs
export const getAllCategories = () => axios.get(`/category`);
export const createNewCategory = (formData) =>
  axios.post(`/category`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const editCategory = (formData) =>
  axios.patch(`/category`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const deleteCategory = (id) =>
  axios.delete(`/category/${id}`, { headers: { Authorization } });

// NewLetter APIs
export const getAllNewLetter = () =>
  axios.get(`/newsletter`, { headers: { Authorization } });

export const createNewNewLetter = (data) =>
  axios.post(`/newsletter`, data, { headers: { Authorization } });

export const checkIfSubscribed = () => {
  // console.log({ tokenOnCheckingSubscription: localStorage.getItem("token") });
  return axios.get(`/newsletter/check`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};

// Membership APIs
export const getAllMemberships = () =>
  axios.get(`/membership`, { headers: { Authorization } });

export const createNewMemberships = (formData) => {
  return axios.post(`/membership`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
};
export const updateMembership = (formData) => {
  return axios.patch(`/membership`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
};

export const deleteMembership = (id) =>
  axios.delete(`/membership/${id}`, { headers: { Authorization } });

// Feedback APIs
export const createNewFeedback = (formData) => {
  return axios.post(`/feedback`, formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};
export const getAllFeedbacks = () => {
  return axios.get(`/feedback`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
export const getActiveFeedbacks = () =>
  axios.get(`/feedback?status=Active`, {
    headers: { Authorization },
  });

export const updateFeedbackStatus = (formData) =>
  axios.patch(`/feedback`, formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

export const deleteFeedback = (id) => {
  return axios.delete(`/feedback/${id}`, {
    headers: { Authorization, "Content-Type": "application/json" },
  });
};

export const getAllTickets = () =>
  axios.get(`/ticket`, { headers: { Authorization } });

export const getActiveTickets = () =>
  axios.get(`/ticket?status=Active`, { headers: { Authorization } });

export const getResolvedTickets = () =>
  axios.get(`/ticket?status=Inactive`, { headers: { Authorization } });

export const getMyTickets = () =>
  axios.get(`/mytickets`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

export const addNewTicket = (formData) => {
  return axios.post("/ticket", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};

export const replyToTicket = (formData) => {
  return axios.post("/ticket/reply", formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });
};

export const updateTicketStatus = (formData) =>
  axios.patch(`/ticket/status`, formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

export const createUserByAdmin = (formData) =>
  axios.post("/newuser", formData, {
    headers: { Authorization, "Content-Type": "application/json" },
  });

export const createContent = (formData) =>
  axios.post("/content", formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const updateContent = (formData) =>
  axios.patch(`/content`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });
export const deleteContent = (id) =>
  axios.delete(`/content/${id}`, {
    headers: { Authorization },
  });

export const getAllContent = () => axios.get("/content");

export const getAllExcelData = (formData) =>
  axios.post(`/getexceldata`, formData, {
    headers: { Authorization, "Content-Type": "multipart/form-data" },
  });


// export const getAllExcelData = () =>
//   axios.get(`/getexceldata`, { headers: { Authorization } });

