import { addItem,removeItem } from "./cart.slice";


export const addToCart = (item) => {
  return (dispatch) => {
    dispatch(addItem(item));
  };
};
export const removeFromCart = (item) => {
  return (dispatch) => {
    dispatch(removeItem(item));
  };
};