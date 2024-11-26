import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    updateTodo: (state, action) => {
      state.isUpdate = false;
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    curentTodo: (state, action) => {
      state.todo = action.payload;
      state.isUpdate = true;
    },
  },
});

//untuk di component
export const { addTodo, deleteTodo, toggleTodo, updateTodo, curentTodo } =
  todosSlice.actions;
//untuk di store
export default todosSlice.reducer;
