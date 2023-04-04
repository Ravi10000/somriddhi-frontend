import styles from "./analytics.module.scss";
import { useState, useEffect } from "react";

import { Chart } from "react-google-charts";
import TitleSection from "../title-section/title-section";
import axios from "axios";
import { getCategoryAnalytics, getCouponAnalytics } from "../../../api";

export default function Analytics() {
  const [categoryChartData, setCategoryChartData] = useState([
    ["Category", "No. of users visited"],
  ]);
  // const [couponDataTitle, setCouponDataTitle] = useState([["Year"]]);
  // const [couponData, setCouponData] = useState([0]);
  const [couponsChartData, setCouponChartData] = useState([
    ["coupons"],
    [0, 10, 10],
  ]);
  const [couponVisitCount, setCouponVisitCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [categoryVisitCount, setCategoryVisitCount] = useState(0);

  async function categoryAnalytics() {
    setLoading(true);
    try {
      const response = await getCategoryAnalytics();
      console.log({ response });

      if (response.data.status === "success") {
        const categoryData = response.data.analyticData;
        setCategoryChartData((prevData) => [...prevData, ...categoryData]);
        // const visitCount = categoryData.reduce((acc, curr) => acc + curr[1], 0);
        // console.log({ dataCount: visitCount });
        setCategoryVisitCount(response?.data?.totalCount);
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }

  async function couponAnalytics() {
    try {
      const response = await getCouponAnalytics();
      console.log({ response });
      // console.log({ response });
      if (response.data.status === "success") {
        const couponData = response.data.analyticData;
        const couponValue = [" "];
        const title = [" "];
        // const visitCount = couponData.reduce((acc, curr) => acc + curr[1], 0);
        setCouponVisitCount(response.data.totalCount);

        couponData.forEach((item) => {
          title.push(item[0]);
          couponValue.push(item[1]);
        });
        setCouponChartData([title, couponValue]);
        // console.log({ title, couponValue });
        // setCouponDataTitle((prevData) => [...prevData, ...title]);
        // setCouponData((prevData) => [...prevData, ...couponValue]);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  // console.log({ loading });
  useEffect(() => {
    // setData([
    //   ["Task", "Hours per Day"],
    //   ["Work", 11],
    //   ["Eat", 2],
    //   ["Commute", 2],
    //   ["Watch TV", 2],
    //   ["Sleep", 7],
    // ]);
    couponAnalytics();
    categoryAnalytics();
  }, []);
  return (
    <div className={styles.analytics}>
      <TitleSection title="Analytics" noAddButton />
      <div className={styles.chartsContainer}>
        <div className={styles.chartContainer}>
          <div className={styles.title}>
            <h2>Categories Analytics</h2>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <h3>{categoryVisitCount}</h3>
            )}
            <p>Total Categories Visits</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="PieChart"
              data={categoryChartData}
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
              <h3>{couponVisitCount}</h3>
            )}
            <p>Total Coupons Visits</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={couponsChartData}
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
