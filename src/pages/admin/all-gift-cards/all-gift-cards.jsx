import styles from "./all-gift-cards.module.scss";
import { useState } from "react";
import TitleSection from "../title-section/title-section";
import { useEffect } from "react";
import axios from "axios";
import { getAllGiftCards } from "../../../api";
// let testData = [
//   {
//     _id: "6471fc99973af5680a6dc1eb",
//     refno: "SOMRIDDHI1685191830930",
//     requestBody:
//       '{"address":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","line1":"A81","city":"Noida","region":"Uttar Pradesh","country":"IN","postcode":"201301"},"payments":[{"code":"svc","amount":10,"poNumber":"somabc123"}],"products":[{"sku":"CNPIN","price":10,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685191830930"}',
//     totalAmount: "10",
//     unitPrice: "10",
//     qty: "1",
//     orderId: "3181777786",
//     status: "PROCESSING",
//     createdBy: "64115cdf154a35e85579b815",
//     createdAt: "2023-05-27T12:50:33.582Z",
//     __v: 0,
//   },
//   {
//     _id: "6471fd2ef3fd749c22487867",
//     refno: "SOMRIDDHI1685191980229",
//     requestBody:
//       '{"address":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","line1":"A81","city":"Noida","region":"Uttar Pradesh","country":"IN","postcode":"201301"},"payments":[{"code":"svc","amount":10,"poNumber":"payment123"}],"products":[{"sku":"CNPIN","price":10,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685191980229"}',
//     totalAmount: "10",
//     unitPrice: "10",
//     qty: "1",
//     orderId: "3181777788",
//     status: "PROCESSING",
//     createdBy: "64115cdf154a35e85579b815",
//     createdAt: "2023-05-27T12:53:02.391Z",
//     __v: 0,
//   },
//   {
//     _id: "64720129f3fd749c224878c7",
//     refno: "SOMRIDDHI1685192999436",
//     requestBody:
//       '{"address":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","line1":"A81","city":"Noida","region":"Uttar Pradesh","country":"IN","postcode":"201301"},"payments":[{"code":"svc","amount":10,"poNumber":"payment123"}],"products":[{"sku":"CNPIN","price":10,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685192999436"}',
//     totalAmount: "10",
//     unitPrice: "10",
//     qty: "1",
//     orderId: "3181777790",
//     status: "PROCESSING",
//     createdBy: "64115cdf154a35e85579b815",
//     createdAt: "2023-05-27T13:10:01.394Z",
//     __v: 0,
//   },
//   {
//     _id: "647449def3fd749c22487a04",
//     refno: "SOMRIDDHI1685342682608",
//     requestBody:
//       '{"address":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","line1":"A81","city":"Noida","region":"Uttar Pradesh","country":"IN","postcode":"201301"},"payments":[{"code":"svc","amount":10,"poNumber":"payment123"}],"products":[{"sku":"CNPIN","price":10,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685342682608"}',
//     totalAmount: "10",
//     unitPrice: "10",
//     qty: "1",
//     orderId: "3181777796",
//     status: "PROCESSING",
//     createdBy: "64115cdf154a35e85579b815",
//     createdAt: "2023-05-29T06:44:46.323Z",
//     __v: 0,
//   },
//   {
//     _id: "64744a2af3fd749c22487a06",
//     refno: "SOMRIDDHI1685342759853",
//     requestBody:
//       '{"address":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","line1":"A81","city":"Noida","region":"Uttar Pradesh","country":"IN","postcode":"201301"},"payments":[{"code":"svc","amount":10,"poNumber":"payment123"}],"products":[{"sku":"CNPIN","price":10,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685342759853"}',
//     totalAmount: "10",
//     unitPrice: "10",
//     qty: "1",
//     orderId: "3181777798",
//     status: "PROCESSING",
//     createdBy: "6459e890d13ac906e7ab62c6",
//     createdAt: "2023-05-29T06:46:02.677Z",
//     __v: 0,
//   },
//   {
//     _id: "64744a35f3fd749c22487a08",
//     refno: "SOMRIDDHI1685342770346",
//     requestBody:
//       '{"address":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms.","firstname":"Arpita","lastname":"Saxena","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","line1":"A81","city":"Noida","region":"Uttar Pradesh","country":"IN","postcode":"201301"},"payments":[{"code":"svc","amount":10,"poNumber":"payment123"}],"products":[{"sku":"CNPIN","price":10,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685342770346"}',
//     totalAmount: "10",
//     unitPrice: "10",
//     qty: "1",
//     orderId: "3181777800",
//     status: "PROCESSING",
//     createdBy: "642cf4aefd8b7a0586d83802",
//     createdAt: "2023-05-29T06:46:13.110Z",
//     __v: 0,
//   },
//   {
//     _id: "64744ac6f3fd749c22487a0b",
//     refno: "SOMRIDDHI1685342916006",
//     requestBody:
//       '{"address":{"salutation":"Mr.","firstname":"John","lastname":"Doe","email":"email@test.test","telephone":"+911234567890","country":"IN","postcode":"123456"},"billing":{"salutation":"Mr.","firstname":"John","lastname":"Doe","email":"email@test.test","telephone":"+911234567890","country":"IN","postcode":"123456","line1":"123, abc street","city":"city","region":"region"},"payments":[{"code":"svc","amount":1000,"poNumber":"pay_LvNwBbIoXqPP9O"}],"products":[{"sku":"CNPIN","price":1000,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685342916006"}',
//     totalAmount: "1000",
//     unitPrice: "1000",
//     qty: "1",
//     orderId: "3181777802",
//     status: "PROCESSING",
//     createdBy: "642cf4aefd8b7a0586d83802",
//     createdAt: "2023-05-29T06:48:38.355Z",
//     __v: 0,
//   },
//   {
//     _id: "64744b4bf3fd749c22487a18",
//     refno: "SOMRIDDHI1685343049598",
//     requestBody:
//       '{"address":{"salutation":"Mr.","firstname":"John","lastname":"Doe","email":"email@test.test","telephone":"+911234567890","country":"IN","postcode":"123456"},"billing":{"salutation":"Mr.","firstname":"John","lastname":"Doe","email":"email@test.test","telephone":"+911234567890","country":"IN","postcode":"123456","line1":"123, abc street","line2":"xyz area","city":"city","region":"region"},"payments":[{"code":"svc","amount":2000,"poNumber":"pay_LvNyXVtS78c4k1"}],"products":[{"sku":"CNPIN","price":2000,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685343049598"}',
//     totalAmount: "2000",
//     unitPrice: "2000",
//     qty: "1",
//     orderId: "3181777804",
//     status: "PROCESSING",
//     createdBy: "642cf4aefd8b7a0586d83802",
//     createdAt: "2023-05-29T06:50:51.639Z",
//     __v: 0,
//   },
//   {
//     _id: "64744e5df3fd749c22487a44",
//     refno: "SOMRIDDHI1685343835178",
//     requestBody:
//       '{"address":{"salutation":"mr","firstname":"Ravi","lastname":"Sharma","email":"ravisince2k@gmail.com","telephone":"+919560863067","country":"IN","postcode":"201023"},"billing":{"salutation":"mr","firstname":"Ravi","lastname":"Sharma","email":"ravisince2k@gmail.com","telephone":"+919560863067","country":"IN","postcode":"201023","line1":"noida","line2":"up","city":"up","region":"u"},"payments":[{"code":"svc","amount":8000,"poNumber":"pay_LvOCMci4zAagkv"}],"products":[{"sku":"CNPIN","price":8000,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685343835178"}',
//     totalAmount: "8000",
//     unitPrice: "8000",
//     qty: "1",
//     orderId: "3181777806",
//     status: "PROCESSING",
//     createdBy: "642cf4aefd8b7a0586d83802",
//     createdAt: "2023-05-29T07:03:57.262Z",
//     __v: 0,
//   },
//   {
//     _id: "64744ea0f3fd749c22487a46",
//     refno: "SOMRIDDHI1685343902861",
//     requestBody:
//       '{"address":{"salutation":"mr","firstname":"Ravi","lastname":"Sharma","email":"ravisince2k@gmail.com","telephone":"+919560863067","country":"IN","postcode":"201023"},"billing":{"salutation":"mr","firstname":"Ravi","lastname":"Sharma","email":"ravisince2k@gmail.com","telephone":"+919560863067","country":"IN","postcode":"201023","line1":"noida","line2":"up","city":"up","region":"u"},"payments":[{"code":"svc","amount":8000,"poNumber":"pay_LvODYm2qBnn789"}],"products":[{"sku":"CNPIN","price":8000,"qty":1,"currency":356}],"refno":"SOMRIDDHI1685343902861"}',
//     totalAmount: "8000",
//     unitPrice: "8000",
//     qty: "1",
//     orderId: "3181777808",
//     status: "PROCESSING",
//     createdBy: "642cf4aefd8b7a0586d83802",
//     createdAt: "2023-05-29T07:05:04.977Z",
//     __v: 0,
//   },
//   {
//     _id: "647471bef3fd749c22487d09",
//     refno: "SOMRIDDHI1685352887475",
//     requestBody:
//       '{"address":{"salutation":"Ms","firstname":"Todquest","lastname":"Enterprises","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301"},"billing":{"salutation":"Ms","firstname":"Todquest","lastname":"Enterprises","email":"arpitasaxena555@gmail.com","telephone":"+918142476587","country":"IN","postcode":"201301","line1":"Sector 4","line2":"Noida","city":"Noida","region":"Uttar Pradesh"},"payments":[{"code":"svc","amount":20,"poNumber":"pay_LvQlkmbKcxNAGd"}],"products":[{"sku":"CNPIN","price":10,"qty":2,"currency":356}],"refno":"SOMRIDDHI1685352887475"}',
//     totalAmount: "20",
//     unitPrice: "10",
//     qty: "2",
//     orderId: "3181777818",
//     status: "PROCESSING",
//     createdBy: "64115cdf154a35e85579b815",
//     createdAt: "2023-05-29T09:34:54.824Z",
//     __v: 0,
//   },
//   {
//     _id: "647472a1f3fd749c22487d32",
//     refno: "SOMRIDDHI1685353117231",
//     requestBody:
//       '{"address":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","country":"IN","postcode":"595959"},"billing":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","line1":"ghvbtrhb dvf","city":"ghvb","region":"hjfh","country":"IN","postcode":"595959"},"payments":[{"code":"svc","amount":4000,"poNumber":"pay_LvQpgRif7kSiXX"}],"products":[{"sku":"CNPIN","price":2000,"qty":2,"currency":356}],"refno":"SOMRIDDHI1685353117231"}',
//     totalAmount: "4000",
//     unitPrice: "2000",
//     qty: "2",
//     orderId: "3181777820",
//     status: "PROCESSING",
//     createdBy: "6459e890d13ac906e7ab62c6",
//     createdAt: "2023-05-29T09:38:41.708Z",
//     __v: 0,
//   },
//   {
//     _id: "64747371f3fd749c22487d4c",
//     refno: "SOMRIDDHI1685353325930",
//     requestBody:
//       '{"address":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","country":"IN","postcode":"566889"},"billing":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","line1":" bvsg","city":"ghcf","region":"vhdnc","country":"IN","postcode":"566889"},"payments":[{"code":"svc","amount":500,"poNumber":"pay_LvQtDQTxvDJcAJ"}],"products":[{"sku":"CNPIN","price":100,"qty":5,"currency":356}],"refno":"SOMRIDDHI1685353325930"}',
//     totalAmount: "500",
//     unitPrice: "100",
//     qty: "5",
//     orderId: "3181777822",
//     status: "PROCESSING",
//     createdBy: "6459e890d13ac906e7ab62c6",
//     createdAt: "2023-05-29T09:42:09.091Z",
//     __v: 0,
//   },
//   {
//     _id: "647473acf3fd749c22487d4e",
//     refno: "SOMRIDDHI1685353385158",
//     requestBody:
//       '{"address":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","country":"IN","postcode":"123456"},"billing":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","line1":"bbv","city":"7jv","region":"bhgg","country":"IN","postcode":"123456"},"payments":[{"code":"svc","amount":500,"poNumber":"pay_LvQuLCP4Y9qARG"}],"products":[{"sku":"CNPIN","price":100,"qty":5,"currency":356}],"refno":"SOMRIDDHI1685353385158"}',
//     totalAmount: "500",
//     unitPrice: "100",
//     qty: "5",
//     orderId: "3181777824",
//     status: "PROCESSING",
//     createdBy: "6459e890d13ac906e7ab62c6",
//     createdAt: "2023-05-29T09:43:08.126Z",
//     __v: 0,
//   },
//   {
//     _id: "64747462f3fd749c22487d5a",
//     refno: "SOMRIDDHI1685353560668",
//     requestBody:
//       '{"address":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","country":"IN","postcode":"248007"},"billing":{"salutation":"Mr.","firstname":"Anant","lastname":"Mishra","email":"anantmishra972@gmail.com","telephone":"+919793235428","line1":"3g3","city":"BB hu","region":"ubxfhgsx","country":"IN","postcode":"248007"},"payments":[{"code":"svc","amount":100000,"poNumber":"pay_LvQxNaw5703Rbn"}],"products":[{"sku":"CNPIN","price":10000,"qty":10,"currency":356}],"refno":"SOMRIDDHI1685353560668"}',
//     totalAmount: "100000",
//     unitPrice: "10000",
//     qty: "10",
//     orderId: "3181777826",
//     status: "PROCESSING",
//     createdBy: "6459e890d13ac906e7ab62c6",
//     createdAt: "2023-05-29T09:46:10.324Z",
//     __v: 0,
//   },
// ];
function AllGiftCards() {
  const [isFetching, setIsFetching] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  console.log({ giftCards });
  async function handleFetchAllGiftCards() {
    setIsFetching(true);
    try {
      const res = await getAllGiftCards();
      console.log({ res });
      if (res.status === 200) {
        const parsedData = res.data.giftCards.map((item, idx) => {
          item.requestBody = JSON.parse(item.requestBody);
          return item;
        });
        setGiftCards(parsedData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleFetchAllGiftCards();
  }, []);

  return (
    <div className={styles.allGiftCards}>
      <TitleSection title="all gift cards" noAddButton />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone No.</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          {isFetching ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            <tbody>
              {giftCards?.map((giftCard, index) => (
                <tr key={index}>
                  <td>{giftCard.orderId}</td>
                  <td>
                    {giftCard.requestBody.address.firstname}{" "}
                    {giftCard.requestBody.address.lastname}
                  </td>
                  <td>{giftCard.requestBody.address.email}</td>
                  <td>{giftCard.requestBody.address.telephone}</td>
                  <td>{giftCard.unitPrice}</td>
                  <td>&times; {giftCard.qty}</td>
                  <td>{giftCard.totalAmount}</td>
                  <td>{giftCard.status}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default AllGiftCards;
