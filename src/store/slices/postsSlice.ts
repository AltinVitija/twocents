// store/slices/postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.twocents.money/prod";

// Types
export interface AuthorMeta {
  bio: string;
  age: number;
  gender: string;
  balance: number;
  arena: string;
  subscription_type: number;
}

export interface PostMeta {
  poll?: string[];
}

export interface Post {
  uuid: string;
  created_at: string;
  updated_at: string;
  author_uuid: string;
  upvote_count: number;
  comment_count: number;
  view_count: number;
  report_count: number;
  title: string;
  text: string;
  topic: string;
  author_meta: AuthorMeta;
  post_meta: PostMeta;
  post_type: number;
}

export interface Comment {
  uuid: string;
  text: string;
  author_uuid: string;
  created_at: string;
  upvote_count: number;
  author_meta: AuthorMeta;
}

export interface PostDetail extends Post {
  body?: string;
  comments?: Comment[];
}

export interface PollResults {
  [key: string]: {
    votes: number;
  };
}

export interface PostsState {
  posts: Post[];
  currentPost: PostDetail | null;
  pollResults: PollResults | null;
  loading: boolean;
  error: string | null;
  filter: string;
  commentsByPostId: Record<string, Comment[]>;
  commentsLoading: Record<string, boolean>;
  commentsError: Record<string, string | null>;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  pollResults: null,
  loading: false,
  error: null,
  filter: "topAllTime",
  commentsByPostId: {},
  commentsLoading: {},
  commentsError: {},
};

// Helper function for API calls
const callRpc = async (method: string, params: Record<string, any> = {}) => {
  try {
    const { data } = await axios.post(
      API_URL,
      {
        jsonrpc: "2.0",
        id: "anon",
        method,
        params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.error) throw new Error(data.error.message);
    return data.result;
  } catch (err) {
    console.error("RPC error:", err);
    throw err;
  }
};

// Async thunks
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (filter: string) => {
    const response = await callRpc("/v1/posts/arena", {
      filter,
      limit: 100,
    });
    return response.posts || [];
  }
);

export const fetchPostDetail = createAsyncThunk(
  "posts/fetchPostDetail",
  async (post_uuid: string) => {
    const response = await callRpc("/v1/posts/get", { post_uuid });
    return response;
  }
);

export const fetchPollResults = createAsyncThunk(
  "posts/fetchPollResults",
  async (post_uuid: string) => {
    try {
      const response = await callRpc("/v1/polls/get", { post_uuid });
      return response.results;
    } catch {
      return null;
    }
  }
);

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (post_uuid: string) => {
    try {
      const response = await callRpc("/v1/comments/get", { post_uuid });
      return {
        postId: post_uuid,
        comments: response.comments || [],
      };
    } catch (error) {
      return {
        postId: post_uuid,
        comments: [],
      };
    }
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.pollResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchPosts.fulfilled, (s, a) => {
        s.loading = false;
        s.posts = a.payload;
      })
      .addCase(fetchPosts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message || "Failed to fetch posts";
      })
      .addCase(fetchPostDetail.fulfilled, (s, a) => {
        s.currentPost = a.payload;
      })
      .addCase(fetchPollResults.fulfilled, (s, a) => {
        s.pollResults = a.payload;
      })
      .addCase(fetchComments.pending, (s, a) => {
        const postId = a.meta.arg;
        s.commentsLoading[postId] = true;
        s.commentsError[postId] = null;
      })
      .addCase(fetchComments.fulfilled, (s, a) => {
        const { postId, comments } = a.payload;
        s.commentsByPostId[postId] = comments;
        s.commentsLoading[postId] = false;
        if (s.currentPost && s.currentPost.uuid === postId) {
          s.currentPost.comments = comments;
        }
      })
      .addCase(fetchComments.rejected, (s, a) => {
        const postId = a.meta.arg;
        s.commentsLoading[postId] = false;
        s.commentsError[postId] = a.error.message || "Failed to load comments";
      });
  },
});

export const { setFilter, clearError, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
