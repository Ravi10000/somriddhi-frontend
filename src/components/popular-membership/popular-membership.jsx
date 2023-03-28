import styles from "./popular-membership.module.scss";
import { useEffect, useState } from "react";

import MembershipSlider from "../membership-slider/membership-slider";
import { getAllMemberships } from "../../api/index";

export default function PopularMembership() {
  const [memberships, setMemberships] = useState([]);

  const allMembershipsData = async () => {
    const allmemberships = await getAllMemberships();
    setMemberships(allmemberships.data.data);
  };

  useEffect(() => {
    allMembershipsData();
  }, []);
  return (
    <section className={styles["popular-membership-section"]}>
      <div className={styles["membership-title"]}>
        <h2 className="_title">Popular Membership</h2>
      </div>
      <div className={styles["membership-carousel"]}>
        <MembershipSlider banners={memberships} />
      </div>
    </section>
  );
}
