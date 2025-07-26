import React, { useState } from "react";
import { Post } from "../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  ArrowUp,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageCircle,
  Share,
} from "lucide-react";
import { navigateToPost } from "../store/slices/uiSlice";
import { fetchComments } from "../store/slices/postsSlice";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  /** Local UI state */
  const [showComments, setShowComments] = useState(false);

  /** Read the comments (cached by slice) */
  const comments = useAppSelector(
    (s) => s.posts.commentsByPostId[post.uuid] || []
  );
  const commentsLoading = useAppSelector(
    (s) => s.posts.commentsLoading[post.uuid] || false
  );
  const commentsError = useAppSelector(
    (s) => s.posts.commentsError[post.uuid] || null
  );

  const handleNavigate = () =>
    dispatch(navigateToPost({ postId: post.uuid, post }));

  const toggleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showComments && comments.length === 0 && !commentsLoading) {
      dispatch(fetchComments(post.uuid));
    }
    setShowComments(!showComments);
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  /* Helpers */
  const formatBalance = (bal: number) =>
    bal >= 1e6
      ? `${(bal / 1e6).toFixed(1)}M`
      : bal >= 1e3
      ? `${(bal / 1e3).toFixed(0)}K`
      : bal.toLocaleString();

  const timeAgo = (dt: string) => {
    const diff = Date.now() - new Date(dt).getTime();
    const hrs = Math.floor(diff / 36e5);
    if (hrs < 1) return "now";
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div
      className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer overflow-hidden mb-4"
      onClick={handleNavigate}>
      {/* HEADER */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 text-sm font-bold text-black shadow-lg">
              ${formatBalance(post.author_meta.balance)}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="bg-gray-700 rounded px-2 py-1 flex items-center">
                <span className="text-green-400 mr-1">↑</span>
                {post.upvote_count}
              </span>
              <span className="bg-gray-700 rounded px-2 py-1">
                🎂 {post.author_meta.age}
              </span>
              <span className="text-blue-400 font-medium">
                {post.author_meta.gender}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {timeAgo(post.created_at)}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {post.title || post.text}
        </h2>
        {post.title && post.text && (
          <p className="text-gray-300 mb-3 line-clamp-3">{post.text}</p>
        )}

        {/* Poll indicator */}
        {post.post_meta.poll && post.post_meta.poll.length > 0 && (
          <div className="mb-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center space-x-2 text-sm text-gray-400">
              <span>📊 Poll • {post.post_meta.poll.length} options</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>📍 {post.author_meta.arena}</span>
          <span>#{post.topic}</span>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleComments}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <MessageCircle size={18} />
            <span>{post.comment_count}</span>
            {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            onClick={stop}
            className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
            <ArrowUp size={18} />
            <span>{post.upvote_count}</span>
          </button>
          <button
            onClick={stop}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
            <Eye size={18} />
            <span className="text-sm">
              {post.view_count > 1000
                ? `${(post.view_count / 1000).toFixed(1)}K`
                : post.view_count}
            </span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={stop}
            className="text-gray-400 hover:text-white transition-colors">
            <Share size={18} />
          </button>
          <button
            onClick={stop}
            className="text-gray-400 hover:text-yellow-400 transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* COMMENTS (lazy‑loaded) */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold mb-3 text-white">
            Comments ({comments.length})
          </h3>
          {commentsLoading ? (
            <div className="text-gray-500 text-center py-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
              Loading comments...
            </div>
          ) : commentsError ? (
            <div className="text-red-400 text-center py-6">
              <div className="mb-2">{commentsError}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(fetchComments(post.uuid));
                }}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors">
                Retry
              </button>
            </div>
          ) : !comments.length ? (
            <div className="text-gray-500 text-center py-6">
              No comments yet
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((c) => (
                <div key={c.uuid} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between mb-1 text-xs text-gray-400">
                    <span>
                      {c.author_meta.age} • {c.author_meta.gender}
                    </span>
                    <span>
                      ${formatBalance(c.author_meta.balance)} • ↑
                      {c.upvote_count}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
