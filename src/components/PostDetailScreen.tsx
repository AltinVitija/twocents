import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchPostDetail,
  fetchPollResults,
  fetchComments,
} from "../store/slices/postsSlice";
import { navigateToFeed } from "../store/slices/uiSlice";
import {
  MessageCircle,
  ArrowUp,
  Share,
  Bookmark,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Header from "./Header";

const PostDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPostId, selectedPost } = useAppSelector((state) => state.ui);
  const { currentPost, pollResults } = useAppSelector((state) => state.posts);
  const [showComments, setShowComments] = useState(false);

  // Get comments and loading states
  const comments = useAppSelector((state) =>
    selectedPostId ? state.posts.commentsByPostId[selectedPostId] || [] : []
  );
  const commentsLoading = useAppSelector((state) =>
    selectedPostId
      ? state.posts.commentsLoading[selectedPostId] || false
      : false
  );
  const commentsError = useAppSelector((state) =>
    selectedPostId ? state.posts.commentsError[selectedPostId] || null : null
  );

  useEffect(() => {
    if (selectedPostId) {
      dispatch(fetchPostDetail(selectedPostId));
      if (
        selectedPost?.post_meta?.poll &&
        selectedPost.post_meta.poll.length > 0
      ) {
        dispatch(fetchPollResults(selectedPostId));
      }
    }
  }, [selectedPostId, dispatch, selectedPost]);

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(1)}M`;
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(0)}K`;
    }
    return balance.toLocaleString();
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleCommentsToggle = () => {
    if (
      !showComments &&
      selectedPostId &&
      comments.length === 0 &&
      !commentsLoading
    ) {
      dispatch(fetchComments(selectedPostId));
    }
    setShowComments(!showComments);
  };

  const handleBackPress = () => {
    dispatch(navigateToFeed());
  };

  if (!selectedPost) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-400">Loading post...</span>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Header
        title="Post"
        showBack={true}
        onBack={handleBackPress}
        actions={
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Share size={18} />
            </button>
            <button className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        }
      />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Post Header */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 text-sm font-bold text-black shadow-lg">
                  ${formatBalance(selectedPost.author_meta.balance)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="bg-gray-700 rounded px-2 py-1 flex items-center">
                    <span className="text-green-400 mr-1">↑</span>
                    {selectedPost.upvote_count}
                  </span>
                  <span className="bg-gray-700 rounded px-2 py-1">
                    🎂 {selectedPost.author_meta.age}
                  </span>
                  <span className="text-blue-400 font-medium">
                    {selectedPost.author_meta.gender}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {timeAgo(selectedPost.created_at)}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">
              {selectedPost.title || selectedPost.text}
            </h1>

            {selectedPost.title && selectedPost.text && (
              <p className="text-gray-300 mb-4 text-lg">{selectedPost.text}</p>
            )}

            {/* Post body content */}
            {currentPost && (currentPost.body || currentPost.text) && (
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed mb-4">
                {currentPost.body || currentPost.text}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>📍 {selectedPost.author_meta.arena}</span>
              <span>#{selectedPost.topic}</span>
            </div>

            {/* Poll Section */}
            {selectedPost.post_meta.poll &&
              selectedPost.post_meta.poll.length > 0 &&
              pollResults && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Poll Results
                  </h3>
                  <div className="space-y-4">
                    {selectedPost.post_meta.poll.map(
                      (option: string, index: number) => {
                        const optionData = pollResults[index.toString()];
                        const votes = optionData?.votes || 0;
                        const totalVotes = Object.values(pollResults).reduce(
                          (sum: number, d: any) => sum + (d?.votes || 0),
                          0
                        );
                        const percentage =
                          totalVotes === 0 ? 0 : (votes / totalVotes) * 100;

                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium">
                                {option}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">
                                  {votes}
                                </span>
                                <span className="text-xs text-gray-500">
                                  votes
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-700 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="text-sm text-yellow-400 font-medium">
                              {percentage.toFixed(1)}%
                            </div>
                          </div>
                        );
                      }
                    )}
                    <div className="pt-2 text-sm text-gray-500 border-t border-gray-700">
                      Total votes:{" "}
                      {Object.values(pollResults).reduce(
                        (sum: number, d: any) => sum + (d?.votes || 0),
                        0
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleCommentsToggle}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MessageCircle size={18} />
                  <span>{selectedPost.comment_count}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                  <ArrowUp size={18} />
                  <span>{selectedPost.upvote_count}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Eye size={18} />
                  <span className="text-sm">
                    {selectedPost.view_count > 1000
                      ? `${(selectedPost.view_count / 1000).toFixed(1)}K`
                      : selectedPost.view_count}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                Comments ({comments.length})
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {commentsLoading ? (
                  <div className="text-gray-500 text-center py-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500 mr-3"></div>
                    Loading comments...
                  </div>
                ) : commentsError ? (
                  <div className="text-red-400 text-center py-8">
                    <div className="mb-3">{commentsError}</div>
                    <button
                      onClick={() =>
                        selectedPostId &&
                        dispatch(fetchComments(selectedPostId))
                      }
                      className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors">
                      Retry Loading Comments
                    </button>
                  </div>
                ) : !comments.length ? (
                  <div className="text-gray-500 text-center py-8">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map((comment: any) => (
                    <div
                      key={comment.uuid}
                      className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded px-2 py-1 text-xs font-bold text-black">
                            ${formatBalance(comment.author_meta.balance)}
                          </div>
                          <span className="text-sm text-gray-400">
                            {comment.author_meta.age} •{" "}
                            {comment.author_meta.gender}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {timeAgo(comment.created_at)}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <ArrowUp size={12} />
                            <span>{comment.upvote_count}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailScreen;
