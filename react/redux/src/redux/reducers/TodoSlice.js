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

    //todo
    //remove todo
    //update todo
    //delete all
  },
});

// Action creators are generated for each case reducer function
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
