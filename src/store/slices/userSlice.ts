import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../../types";
import { apiService } from "../../services/api";
import { mockPosts } from "../../data/mockData";

export const fetchUserPosts = createAsyncThunk(
  "user/fetchUserPosts",
  async (userUuid: string) => {
    try {
      return await apiService.getUserPosts(userUuid);
    } catch (error) {
      console.log("🔄 User API failed, using mock data:", error);
      return mockPosts.filter((post) => post.author.uuid === userUuid);
    }
  }
);

const initialState: UserState = {
  posts: [],
  loading: false,
  error: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.posts = [];
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user posts";
      });
  },
});

export const { clearUser } = userSlice.actions;
