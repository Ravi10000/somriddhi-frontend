import axios from "./index";

export const verifyPan = (pan) => axios.get(`/auth/verify-pan/${pan}`);
