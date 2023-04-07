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
  const [couponsChartData, setCouponChartData] = useState(null);
  // [
  //   ["coupons", "one", "two"],
  //   [0, 10, 10],
  // ]

  const [couponVisitCount, setCouponsCount] = useState(0);
  // console.log({ couponVisitCount, couponsChartData });
  const [bannersCount, setBannersCount] = useState(0);
  const [bannerChartData, setBannerChartData] = useState([[" "], [" "]]);

  const [membershipsCount, setMembershipsCount] = useState(0);
  const [membershipChartData, setMembershipChartData] = useState([
    ["Membership", "No. of users visited"],
  ]);

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
        setCategoryVisitCount(response?.data?.totalCount);
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }

  async function couponAnalytics(couponType, setCoupons, setCouponsCount) {
    try {
      const response = await getCouponAnalytics(couponType);
      console.log({ response });
      if (response.data.status === "success") {
        const couponData = response.data.analyticData;

        console.log({ couponData });
        const couponValue = [" "];
        const title = [" "];

        setCouponsCount(response.data.totalCount);

        couponData.forEach((item) => {
          if (item[0] === null) title.push("no title");
          else title.push(item[0]);

          if (item[1] === null) couponValue.push(0);
          else couponValue.push(item[1]);
        });
        console.log([title, couponValue]);

        if (couponType === "Membership") {
          setCoupons((prevData) => [...prevData, ...couponData]);
          return;
        }

        setCoupons([title, couponValue]);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    // setData([
    //   ["Task", "Hours per Day"],
    //   ["Work", 11],
    //   ["Eat", 2],
    //   ["Commute", 2],
    //   ["Watch TV", 2],
    //   ["Sleep", 7],
    // ]);
    couponAnalytics("Coupon", setCouponChartData, setCouponsCount);
    couponAnalytics("Banner", setBannerChartData, setBannersCount);
    couponAnalytics("Membership", setMembershipChartData, setMembershipsCount);
    categoryAnalytics();
  }, []);
  return (
    <div className={styles.analytics}>
      <TitleSection title="Analytics" noAddButton />
      <div className={styles.chartsContainer}>
        <div className={styles.chartContainer}>
          <div className={styles.title}>
            <h2>All Categories Analytics</h2>
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
            <h2>Top 10 Popular Coupons Analytics</h2>
            <h3>{couponVisitCount}</h3>
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

        <div className={styles.chartContainer}>
          <div className={styles.title}>
            <h2>Top 10 Banner Analytics</h2>
            <h3>{bannersCount}</h3>
            <p>Total Banner Visits</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={bannerChartData}
              // options={options}
            />
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.title}>
            <h2>Top 10 Membership Analytics</h2>
            <h3>{membershipsCount}</h3>
            <p>Total Membership Visits</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="PieChart"
              data={membershipChartData}
              width="100%"
              height="400px"
              legendToggle
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// export const barChartData = [
//   ["Year", "Sales", "Expenses", "Profit"],
//   ["2023", 1000, 400, 200],
//   // ["2015", 1170, 460, 250],
//   // ["2016", 660, 1120, 300],
//   // ["2017", 1030, 540, 350],
// ];

// // export const options = {
// //   chart: {
// //     title: "Popular Coupons Visited",
// //     subtitle: "In year 2023",
// //   },
// // };
