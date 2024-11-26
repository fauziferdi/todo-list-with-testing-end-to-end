import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./async/todoSlice";
import langReducer from "./slices/langSlice";

export const store = configureStore({
  reducer: {
    lang: langReducer,
    todos: todoReducer,
  },
});
