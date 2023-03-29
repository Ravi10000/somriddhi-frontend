import styles from "./analytics.module.scss";
import { useState, useEffect } from "react";

import { Chart } from "react-google-charts";
import TitleSection from "../title-section/title-section";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState([["Category", "No. of users visited"]]);
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
    getCategeoryAnalytics();
  }, []);
  return (
    <div className={styles.analytics}>
      <TitleSection title="All Analytics" noAddButton />
      <div className={styles.chartsContainer}>
        <div className={styles.categoryChart}>
          <div className={styles.title}>
            <h2>Category Analytics</h2>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <h3>No. of visits: {categoryDataCount}</h3>
            )}
            <p>Popular Categories</p>
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
        <div className={styles.categoryChart}>
          <div className={styles.title}>
            <h2>Category Analytics</h2>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <h3>{categoryDataCount}</h3>
            )}
            <p>Popular Coupons</p>
          </div>
          <div className={styles.chart}>
            {loading && <div className={styles.loader}></div>}
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const data = [
  [
    { type: "date", label: "Day" },
    "Average temperature",
    "Average hours of daylight",
  ],
  [new Date(2014, 0), -0.5, 5.7],
  [new Date(2014, 1), 0.4, 8.7],
  [new Date(2014, 2), 0.5, 12],
  [new Date(2014, 3), 2.9, 15.3],
  [new Date(2014, 4), 6.3, 18.6],
  [new Date(2014, 5), 9, 20.9],
  [new Date(2014, 6), 10.6, 19.8],
  [new Date(2014, 7), 10.3, 16.6],
  [new Date(2014, 8), 7.4, 13.3],
  [new Date(2014, 9), 4.4, 9.9],
  [new Date(2014, 10), 1.1, 6.6],
  [new Date(2014, 11), -0.2, 4.5],
];

export const options = {
  chart: {
    title: "",
  },
  width: 900,
  height: 500,
  series: {
    // Gives each series an axis name that matches the Y-axis below.
    0: { axis: "Temps" },
    1: { axis: "Daylight" },
  },
  axes: {
    // Adds labels to each axis; they don't have to match the axis names.
    y: {
      Temps: { label: "No. of users visited" },
      Daylight: { label: "Daylight" },
    },
  },
};
