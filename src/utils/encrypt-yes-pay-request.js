import { SHA256, AES, mode, enc, pad } from "crypto-js";
import base64 from "base-64";

export function encryptYesPayRequest(data) {
  const dummyData = {
    mobile: 9560863067,
    email: "ravisince2k@gmail.com",
    amount: 300,
    template_id: 9384,
    product_name: "Gift Voucher",
    request_id: "f6e57495-7a8d-48e5-a3fe-8bcf370d6996",
    due_date: "28/08/2023",
    return_url: "http://api.somriddhi.store/api/transaction/yespay/return.php",
  };
  const key = SHA256(import.meta.env.VITE_YES_PAY_SECRET_KEY)
    .toString()
    .substring(0, 32);
  console.log({ key });

  const aesEncrypted = AES.encrypt(
    enc.Utf8.parse(JSON.stringify(dummyData)),
    enc.Utf8.parse(key),
    {
      iv: enc.Utf8.parse("I8zyA4lVhMCaJ5Kg"),
      mode: mode.CBC,
      padding: pad.Pkcs7,
    }
  ).toString();

  const binaryEncoder = new TextEncoder();
  const rawBytes = binaryEncoder.encode(aesEncrypted);
  const base64Encoded = base64.encode(rawBytes);
  console.log({ base64Encoded });
  return base64Encoded;
}
