import styles from "./search.module.scss";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  return (
    <div
      className={styles["search"]}
      onClick={() => {
        navigate("/search");
      }}
    >
      <img src="/search.png" alt="search" />
      <input type="search" placeholder="Search For brand, category, coupon" />
    </div>
  );
}
