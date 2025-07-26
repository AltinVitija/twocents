// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  theme: "dark" | "light";
  sidebarOpen: boolean;
  sortBy: "latest" | "popular" | "controversial";
  showPostModal: boolean;
  selectedPostId: string | null;
  currentView: "feed" | "post-detail";
  selectedPost: any | null;
}

const initialState: UIState = {
  theme: "dark",
  sidebarOpen: false,
  sortBy: "latest",
  showPostModal: false,
  selectedPostId: null,
  currentView: "feed",
  selectedPost: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSortBy: (
      state,
      action: PayloadAction<"latest" | "popular" | "controversial">
    ) => {
      state.sortBy = action.payload;
    },
    showModal: (state, action: PayloadAction<string>) => {
      state.showPostModal = true;
      state.selectedPostId = action.payload;
    },
    hideModal: (state) => {
      state.showPostModal = false;
      state.selectedPostId = null;
    },
    navigateToPost: (
      state,
      action: PayloadAction<{ postId: string; post: any }>
    ) => {
      state.currentView = "post-detail";
      state.selectedPostId = action.payload.postId;
      state.selectedPost = action.payload.post;
    },
    navigateToFeed: (state) => {
      state.currentView = "feed";
      state.selectedPostId = null;
      state.selectedPost = null;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSortBy,
  showModal,
  hideModal,
  navigateToPost,
  navigateToFeed,
} = uiSlice.actions;

export default uiSlice.reducer;
