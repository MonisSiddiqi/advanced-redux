import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  products: [
    {
      id: 1,
      title: "Test Item",
      description: "This product is coming from redux",
      price: 6.0,
    },
    {
      id: 2,
      title: "Test Item 2",
      description: "This product is also coming from redux",
      price: 8.0,
    },
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
});

export default productSlice;
