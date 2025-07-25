import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../types";

const initialState: AppState = {
  currentView: "home",
  selectedPostId: null,
  selectedUserId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setView: (
      state,
      action: PayloadAction<{ view: "home" | "post" | "user"; id?: string }>
    ) => {
      state.currentView = action.payload.view;
      if (action.payload.view === "post") {
        state.selectedPostId = action.payload.id || null;
        state.selectedUserId = null;
      } else if (action.payload.view === "user") {
        state.selectedUserId = action.payload.id || null;
        state.selectedPostId = null;
      } else {
        state.selectedPostId = null;
        state.selectedUserId = null;
      }
    },
    goHome: (state) => {
      state.currentView = "home";
      state.selectedPostId = null;
      state.selectedUserId = null;
    },
  },
});

export const { setView, goHome } = appSlice.actions;
