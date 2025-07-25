export interface Post {
  uuid: string;
  content: string;
  author: {
    uuid: string;
    username: string;
    net_worth_tier: "bronze" | "silver" | "gold" | "platinum";
    age?: number;
    gender?: string;
    location?: string;
  };
  timestamp: string;
  vote_count: number;
  comment_count: number;
  post_type: "text" | "poll" | "image";
  poll_data?: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      vote_count: number;
    }>;
    total_votes: number;
  };
}

export interface Comment {
  uuid: string;
  content: string;
  author: {
    uuid: string;
    username: string;
    net_worth_tier: "bronze" | "silver" | "gold" | "platinum";
    age?: number;
    gender?: string;
    location?: string;
  };
  timestamp: string;
  vote_count: number;
  parent_uuid?: string;
  replies?: Comment[];
}

export interface PostDetail extends Post {
  comments: Comment[];
}

export interface APIResponse<T> {
  jsonrpc: string;
  id: string;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentFilter: string;
}

export interface CurrentPostState {
  post: PostDetail | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  currentView: "home" | "post" | "user";
  selectedPostId: string | null;
  selectedUserId: string | null;
}

export interface UserState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentUser: any | null;
}
