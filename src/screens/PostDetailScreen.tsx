import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchPostDetail,
  clearCurrentPost,
} from "../store/slices/currentPostSlice";
import { goHome, setView } from "../store/slices/appSlice";
import { PostCard } from "../components/PostCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NetWorthPill } from "../components/NetWorthPill";
import { Comment } from "../types";

const CommentComponent: React.FC<{ comment: Comment; depth?: number }> = ({
  comment,
  depth = 0,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUserClick = () => {
    dispatch(setView({ view: "user", id: comment.author.uuid }));
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffMs = now.getTime() - commentTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) {
      return `${diffHours} hr. ago`;
    } else {
      return "now";
    }
  };

  // Safe number formatting function
  const safeNumber = (value: any, defaultValue: number = 0): number => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // Safe display for author info
  const safeAge = safeNumber(comment.author.age, 27);
  const safeGender = comment.author.gender || "M";
  const safeVoteCount = safeNumber(comment.vote_count, 0);

  return (
    <div
      className={`${
        depth > 0 ? "ml-8 border-l border-gray-800 pl-4" : ""
      } py-4`}>
      <div className="flex items-start justify-between mb-2">
        <NetWorthPill
          tier={comment.author.net_worth_tier}
          username={comment.author.username}
          onClick={handleUserClick}
          size="sm"
        />
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <span>↑ {safeVoteCount}</span>
          <span>🎂 {safeAge}</span>
          <span>👤 {safeGender}</span>
          <span>{formatTimeAgo(comment.timestamp)}</span>
          <span>⋯</span>
        </div>
      </div>
      <p className="text-white text-sm mb-3 leading-relaxed">
        {comment.content}
      </p>
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentComponent
            key={reply.uuid}
            comment={reply}
            depth={depth + 1}
          />
        ))}
    </div>
  );
};

export const PostDetailScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { post, loading, error } = useSelector(
    (state: RootState) => state.currentPost
  );
  const selectedPostId = useSelector(
    (state: RootState) => state.app.selectedPostId
  );

  useEffect(() => {
    if (selectedPostId) {
      dispatch(fetchPostDetail(selectedPostId));
    }
  }, [dispatch, selectedPostId]);

  const handleBack = () => {
    dispatch(goHome());
    dispatch(clearCurrentPost());
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-400 mb-4 text-lg">{error}</div>
          <button
            onClick={handleBack}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-gray-400 mb-4 text-lg">Post not found</div>
          <button
            onClick={handleBack}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Post Content */}
      <div className="border-b border-gray-800">
        <PostCard post={post} onClick={() => {}} />
      </div>

      {/* Action Bar */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="bg-yellow-400 text-black p-3 rounded-lg hover:bg-yellow-300 transition-colors">
              <span>↑</span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <span>↓</span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <span>↩</span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Sort by</span>
          <div className="flex items-center space-x-1 text-yellow-400 text-sm">
            <span>Latest</span>
            <span>⋄</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="divide-y divide-gray-800">
        {post.comments?.length ? (
          post.comments.map((comment) => (
            <CommentComponent key={comment.uuid} comment={comment} />
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">No comments yet</div>
            <div className="text-gray-600 text-sm">
              Be the first to share your thoughts
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
        <div className="flex items-center justify-between text-gray-400">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>2</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🔄</span>
              <span>6</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>❤️</span>
              <span>407</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📊</span>
              <span>9.6K</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>🔖</span>
            <span>↗</span>
          </div>
        </div>
      </div>
    </div>
  );
};
