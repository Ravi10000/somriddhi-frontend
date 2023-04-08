import styles from "./category-card.module.scss";

import React from "react";

export default function CategoryCard({
  category,
  handleDeleteCategory,
  setCategoryToEdit,
  setShowPopup,
}) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  return (
    <div className={styles["category"]}>
      <div className={styles["category-icon"]}>
        <img
          src={`${import.meta.env.VITE_REACT_APP_API_URL}/${category?.icon}`}
          alt={category?.name}
          onError={(e) => {
            e && (e.target.src = "/image-broke.png");
          }}
        />
      </div>
      <p className={styles["name"]}>{category?.name}</p>
      <div className={styles["actions"]}>
        <div
          className={styles["edit"]}
          onClick={() => {
            setCategoryToEdit(category);
            setShowPopup(true);
          }}
        >
          <img src="/edit.png" alt="edit category" />
        </div>

        {isDeleting ? (
          <div className={styles["delete-loader"]}></div>
        ) : (
          <div
            className={styles["delete"]}
            onClick={() => {
              handleDeleteCategory(category?._id, setIsDeleting);
            }}
          >
            <img src="/delete.png" alt="delete category" />
          </div>
        )}
      </div>
    </div>
  );
}
