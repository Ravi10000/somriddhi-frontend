import "./all-categories.styles.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// components
import TitleSection from "../title-section/title-section";
import AddCategoryPopup from "../../../components/add-category-popup/add-category-popup";

// api calls
import { getAllCategories, deleteCategory } from "../../../api/index";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

function AllCategories({ setFlash }) {
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  async function fetchCategories() {
    const response = await getAllCategories();
    console.log({ response });
    setCategories(response.data.data);
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  async function handleDeleteCategory(id) {
    try {
      const response = await deleteCategory(id);
      console.log({ response });
      if (response.data.status === "success") {
        setFlash({
          type: "success",
          message: "Category deleted successfully",
        });
        fetchCategories();
      }
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again later",
      });
      console.log({ error });
    }
  }

  return (
    <>
      {showAddCategoryPopup && (
        <AddCategoryPopup
          categoryToEdit={categoryToEdit}
          setCategoryToEdit={setCategoryToEdit}
          setShowPopup={setShowAddCategoryPopup}
          fetchCategories={fetchCategories}
        />
      )}
      <div className="all-categories">
        <TitleSection
          title="categories"
          addFunction={() => {
            setShowAddCategoryPopup(true);
          }}
        />
        <div className="categories">
          {categories?.map((category, index) => (
            <div className="category" key={index}>
              <div className="category-icon">
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                    category?.icon
                  }`}
                  alt={category?.name}
                />
              </div>
              <p className="name">{category?.name}</p>
              <div className="actions">
                <div
                  className="edit"
                  onClick={() => {
                    setCategoryToEdit(category);
                    setShowAddCategoryPopup(true);
                  }}
                >
                  <img src="/edit.png" alt="edit category" />
                </div>
                <div
                  className="delete"
                  onClick={() => {
                    handleDeleteCategory(category?._id);
                  }}
                >
                  <img src="/delete.png" alt="delete category" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AllCategories);
