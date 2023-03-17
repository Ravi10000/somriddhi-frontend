import axios from "axios";

const endpoint = "http://3.108.161.80:8002/api";
axios.defaults.baseURL = `/api`;

// user related request
// start
export async function sendOtp({ phone, countryCode = "+91" }) {
  console.log("sendOTP", { phone, countryCode });
  const response = await axios.post(`/sendotp`, {
    phone,
    countryCode,
  });
  return response;
}

export async function verifyOtp({ phone, otp }) {
  console.log("verifyOTP", { phone, otp });
  const response = await axios.post(`/verifyotp`, {
    phone,
    otp,
  });
  return response;
}

export async function createUser({
  fname,
  lname,
  email,
  phone,
  usertype = "customer",
}) {
  console.log("createUser", { fname, lname, email, phone, usertype });
  const response = await axios.post("/user", {
    fname,
    lname,
    email,
    phone,
    usertype,
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

export async function getAllUsers() {
  const response = await axios.get("/user");
  return response;
}
// end

export async function createBanner(bannerData) {
  const response = await axios.post("/banner", bannerData);
  return response;
}
export async function createDeal(dealData) {
  console.log({ dealData });
  const response = await axios.post("/banner", {
    ...dealData,
    status: "Active",
  });
  return response;
}

export default axios;
