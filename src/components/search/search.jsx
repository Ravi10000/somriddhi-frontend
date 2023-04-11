import styles from "./search.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../../context/search.context";
import { useEffect } from "react";

export default function Search() {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log({ pathname });
  useEffect(() => {
    if (pathname !== "/search") {
      setSearchTerm("");
    }
  }, [pathname]);
  return (
    <div
      className={styles["search"]}
      onClick={() => {
        if (pathname !== "/search") navigate("/search");
      }}
    >
      <img src="/search.png" alt="search" />
      <input
        // ref={searchRef}
        type="search"
        placeholder="Search For brand, category, coupon"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
}
