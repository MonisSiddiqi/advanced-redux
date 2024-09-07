import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification: (state, action) => action.payload,
  },
});

export default notificationSlice;
export const { showNotification } = notificationSlice.actions;
