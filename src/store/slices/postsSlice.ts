import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostsState } from "../../types";
import { apiService } from "../../services/api";
import { mockPosts } from "../../data/mockData";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (filter: string | undefined = "Top Today") => {
    const filterToUse = filter || "Top Today";
    try {
      return await apiService.getPosts(filterToUse);
    } catch (error) {
      console.log("🔄 API failed, using mock data:", error);
      return mockPosts;
    }
  }
);

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  currentFilter: "Top Today",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export const { setFilter, clearError } = postsSlice.actions;
