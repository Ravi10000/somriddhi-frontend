import styles from "./analytics.module.scss";
import { useState, useEffect } from "react";

import { Chart } from "react-google-charts";
import TitleSection from "../title-section/title-section";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState([["Category", "No. of users visited"]]);
  // const [couponDataTitle, setCouponDataTitle] = useState([["Year"]]);
  // const [couponData, setCouponData] = useState([0]);
  const [barChartData, setBarChartData] = useState([[" "], [0]]);
  const [couponCount, setCouponCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [categoryDataCount, setCategoryDataCount] = useState(0);

  async function getCategeoryAnalytics() {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8001/api/analytic/category"
      );
      console.log({ response });

      if (response.data.status === "success") {
        const data = response.data.analyticData;
        setData((prevData) => [...prevData, ...data]);
        const dataCount = data.reduce((acc, curr) => acc + curr[1], 0);
        console.log({ dataCount });
        setCategoryDataCount(dataCount);
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }

  async function getCouponAnalytics() {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/analytic/coupon"
      );
      console.log({ response });
      if (response.data.status === "success") {
        const data = response.data.analyticData;
        const couponValue = [" "];
        const title = [" "];
        const count = data.reduce((acc, curr) => acc + curr[1], 0);
        setCouponCount(count);

        data.forEach((item) => {
          title.push(item[0]);
          couponValue.push(item[1]);
        });
        setBarChartData([title, couponValue]);
        console.log({ title, couponValue });
        // setCouponDataTitle((prevData) => [...prevData, ...title]);
        // setCouponData((prevData) => [...prevData, ...couponValue]);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  console.log({ loading });
  useEffect(() => {
    // setData([
    //   ["Task", "Hours per Day"],
    //   ["Work", 11],
    //   ["Eat", 2],
    //   ["Commute", 2],
    //   ["Watch TV", 2],
    //   ["Sleep", 7],
    // ]);
    getCouponAnalytics();
    getCategeoryAnalytics();
  }, []);
  return (
    <div className={styles.analytics}>
      <TitleSection title="All Analytics" noAddButton />
      <div className={styles.chartsContainer}>
        <div className={styles.chartContainer}>
          <div className={styles.title}>
            <h2>Categories Analytics</h2>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <h3>{categoryDataCount}</h3>
            )}
            <p>Popular Categories Visits</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="PieChart"
              data={data}
              width="100%"
              height="400px"
              legendToggle
            />
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.title}>
            <h2>Popular Coupons Analytics</h2>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <h3>{couponCount}</h3>
            )}
            <p>Popular Coupons Visits</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={barChartData}
              // options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const barChartData = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2023", 1000, 400, 200],
  // ["2015", 1170, 460, 250],
  // ["2016", 660, 1120, 300],
  // ["2017", 1030, 540, 350],
];

// export const options = {
//   chart: {
//     title: "Popular Coupons Visited",
//     subtitle: "In year 2023",
//   },
// };
