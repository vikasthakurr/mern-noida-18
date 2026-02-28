import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../redux/reducers/TodoSlice.js";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export default store;
