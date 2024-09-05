import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  products: [],
  showCart: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    add: (state, action) => {
      const product = action.payload;

      const isProductExist = state.products.find(
        (item) => item.id === product.id
      );

      if (isProductExist) {
        const index = state.products.findIndex(
          (item) => item.id === product.id
        );
        state.products[index].quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
    },
    remove: (state, action) => {
      const product = action.payload;

      state.products = state.products.filter((item) => item.id !== product.id);
    },
    increment: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index].quantity += 1;
      } else {
        console.log("Product not found");
      }
    },
    decrement: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index === -1) return;

      const quantity = state.products[index].quantity;
      if (quantity <= 1) {
        state.products.splice(index, 1);
      } else {
        state.products[index].quantity -= 1;
      }
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export default cartSlice;

export const { add, remove, increment, decrement, toggleCart } =
  cartSlice.actions;
