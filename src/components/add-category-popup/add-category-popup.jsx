import "./add-category-popup.styles.scss";

// react hooks
import { useRef, useEffect, useState } from "react";
// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import Button from "../button/button";

// api calls
import { getAllCategories, createNewCategory, editCategory } from "../../api";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";

function AddCategoryPopup({
  setShowPopup,
  fetchCategories,
  setFlash,
  categoryToEdit,
  setCategoryToEdit,
}) {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
    })();
    return () => {
      setCategoryToEdit(null);
    };
  }, []);

  console.log({ categoryToEdit });
  async function submitAddCategoryForm(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      if (!categoryToEdit) {
        const response = await createNewCategory(formData);
        if ((response.data.status = "success")) {
          fetchCategories();
          setFlash({
            type: "success",
            message: "Category Added Successfully",
          });
        }
      } else {
        formData.append("_id", categoryToEdit._id);
        const response = await editCategory(formData);
        if ((response.data.status = "success")) {
          fetchCategories();
          setFlash({
            type: "success",
            message: "Category Updated Successfully",
          });
        }
      }
      setIsLoading(false);
      setShowPopup(false);
    } catch (error) {
      console.log(error);
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
    }
  }

  return (
    <Backdrop>
      <div className="add-category-popup">
        <PopupHead title={categoryToEdit ? "Update Category" : "Add New Category"} setShowPopup={setShowPopup} />
        <form encType="multipart/form-data" onSubmit={submitAddCategoryForm}>
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Category Name"
            defaultValue={categoryToEdit?.name}
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Enter Category Description"
            defaultValue={categoryToEdit?.description}
          />
          <ImageInput
            label="Icon"
            name="categoryPhoto"
            defaultValue={categoryToEdit?.icon}
          />
          <Button isLoading={isLoading}>
            {categoryToEdit ? "Update Category" : "Add Category"}
          </Button>
        </form>
      </div>
    </Backdrop>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddCategoryPopup);
