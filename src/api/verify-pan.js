import axios from "axios";

export const verifyPan = async (pan) => {
  const url = "https://api.cashfree.com/verification/pan",
    data = {
      pan: "OCBPS7657L",
      name: "Ravi Sharma",
    };
};
