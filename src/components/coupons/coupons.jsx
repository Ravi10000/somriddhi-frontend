import styles from "./coupons.styles.module.scss";

// packages
import { useState, useEffect } from "react";

// utils
import { getAllDeals, getAllCategories } from "../../api/index.js";
import SelectCategorySlider from "../select-category-slider/select-category-slider";
import DealsSlider from "../deals-slider/deals-slider";

export default function Coupons() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  // console.log({ selectedCategory, categories, deals });

  const fetchCategories = async () => {
    const response = await getAllCategories();
    // console.log({ response });
    setCategories(response.data.data);
    setSelectedCategory(response.data.data[0]);
  };

  const fetchDeals = async () => {
    try {
      const categoryId = selectedCategory?._id || null;
      const response = await getAllDeals(categoryId);
      // console.log({ response });
      setDeals(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchDeals();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // console.log(selectedCategory);
        const categoryId = selectedCategory?._id || null;
        const response = await getAllDeals(categoryId);
        // console.log({ response });
        setDeals(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedCategory]);

  return (
    <section className={styles["coupons-section"]} id="coupons">
      <div className={styles.container}>
        <h2 className={styles._title}>Coupons By Category</h2>
        <div className={styles["container-inner"]}>
          <div className={styles["menu-carousel-container"]}>
            <SelectCategorySlider
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className={styles["coupons-carousel-container"]}>
            {deals?.length > 0 ? (
              <DealsSlider deals={deals} forCoupons />
            ) : (
              <p className={styles["no-deals"]}>
                We have no {selectedCategory?.name} coupons for now!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
