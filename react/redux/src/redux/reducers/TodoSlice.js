import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      };
      state.push(newTodo);
    },

    updateTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      const todo = state.find((item) => item.id === id);
      if (todo) {
        if (text !== undefined) todo.text = text;
        if (completed !== undefined) todo.completed = completed;
      }
    },

    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    removeAll: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, updateTodo, deleteTodo, removeAll } = todoSlice.actions;
export default todoSlice.reducer;
