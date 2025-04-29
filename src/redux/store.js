import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/tasks/taskSlice"
const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice
  },
});

export default store;
