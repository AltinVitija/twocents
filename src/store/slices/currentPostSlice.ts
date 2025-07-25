import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentPostState } from "../../types";
import { apiService } from "../../services/api";
import { mockPostDetail } from "../../data/mockData";

export const fetchPostDetail = createAsyncThunk(
  "currentPost/fetchPostDetail",
  async (postUuid: string) => {
    try {
      return await apiService.getPost(postUuid);
    } catch (error) {
      console.log("🔄 API failed for post detail, using mock data:", error);
      return mockPostDetail;
    }
  }
);

export const fetchPollResults = createAsyncThunk(
  "currentPost/fetchPollResults",
  async (postUuid: string) => {
    try {
      const poll = await apiService.getPollResults(postUuid);
      return { postUuid, poll };
    } catch (error) {
      console.log("🔄 Poll API failed:", error);
      return { postUuid, poll: null };
    }
  }
);

const initialState: CurrentPostState = {
  post: null,
  loading: false,
  error: null,
};

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.post = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post details";
      });
  },
});

export const { clearCurrentPost } = currentPostSlice.actions;
