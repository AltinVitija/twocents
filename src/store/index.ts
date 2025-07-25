import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./slices/postsSlice";
import { currentPostSlice } from "./slices/currentPostSlice";
import { userSlice } from "./slices/userSlice";
import { appSlice } from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    currentPost: currentPostSlice.reducer,
    user: userSlice.reducer,
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
