import { APIResponse, Post, PostDetail } from "../types";

const API_BASE_URL = "https://api.twocents.money/prod";

async function callAPI<T>(
  method: string,
  params: Record<string, any> = {}
): Promise<T> {
  const body = {
    jsonrpc: "2.0",
    id: "anon",
    method: method,
    params: params,
  };

  console.log(`🔗 API Call: ${method}`, params);

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: APIResponse<T> = await response.json();

  if (data.error) {
    throw new Error(`API Error ${data.error.code}: ${data.error.message}`);
  }

  if (!data.result) {
    throw new Error("No result in API response");
  }

  console.log(`✅ API Success: ${method}`, data.result);
  return data.result;
}

export const apiService = {
  async getPosts(filter: string = "Top Today"): Promise<Post[]> {
    const result = await callAPI<{ posts: Post[] }>("/v1/posts/arena", {
      filter,
    });
    return result.posts || [];
  },

  async getPost(postUuid: string): Promise<PostDetail> {
    const result = await callAPI<{ post: PostDetail }>("/v1/posts/get", {
      post_uuid: postUuid,
    });
    return result.post;
  },

  async getPollResults(postUuid: string): Promise<any> {
    const result = await callAPI<{ poll: any }>("/v1/polls/get", {
      post_uuid: postUuid,
    });
    return result.poll;
  },

  async getUserPosts(userUuid: string): Promise<Post[]> {
    const result = await callAPI<{ posts: Post[] }>("/v1/users/get", {
      user_uuid: userUuid,
    });
    return result.posts || [];
  },
};
