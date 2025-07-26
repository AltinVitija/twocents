// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
