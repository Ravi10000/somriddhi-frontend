import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, quantity, price } = action.payload;

      //   const { id, updatedItem } = action.payload;
      // Find the index of the item with the given ID
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        // If the item exists, update it with the new data
        state.items[index] = { ...state.items[index], price, quantity };
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      const { id } = action.payload;

      // Find the index of the item with the given ID
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        // If the item exists, remove it from the array
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem,removeItem } = cartSlice.actions;

export default cartSlice.reducer;
