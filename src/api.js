import axios from "axios";

axios.defaults.baseURL = `/api/`;

export async function sendOtp({ phone, countryCode }) {
  const response = await axios.post(`/sendotp`, { phone, countryCode });
  return response;
}

export async function verifyOtp({ phone, otp }) {
  const response = await axios.post(`/verifyotp`, { phone, otp });
  return response;
}

export async function createUser({ fname, lname, email, phone, usertype }) {
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

export default axios;
