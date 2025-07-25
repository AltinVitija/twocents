import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setView } from "../store/slices/appSlice";
import { Post } from "../types";
import { NetWorthPill } from "./NetWorthPill";
import { PollComponent } from "./PollComponent";

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePostClick = () => {
    if (onClick) {
      onClick();
    } else {
      dispatch(setView({ view: "post", id: post.uuid }));
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setView({ view: "user", id: post.author.uuid }));
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now.getTime() - postTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hr${diffHours > 1 ? "s" : ""}. ago`;
    } else {
      return "now";
    }
  };

  // Safe number formatting function
  const safeNumber = (value: any, defaultValue: number = 0): number => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  return (
    <div
      onClick={handlePostClick}
      className="bg-black text-white p-4 cursor-pointer hover:bg-gray-900 transition-colors">
      {/* Header with title and net worth */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white text-lg font-medium leading-tight flex-1 mr-4">
          {post.content.split(".")[0]} {/* Use first sentence as title */}
        </h3>
        <NetWorthPill
          tier={post.author.net_worth_tier}
          username={post.author.username}
          onClick={handleUserClick}
          size="sm"
        />
      </div>

      {/* Full content if it's longer */}
      {post.content.includes(".") && post.content.split(".").length > 1 && (
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {post.content.split(".").slice(1).join(".").trim()}
        </p>
      )}

      {/* Poll component */}
      {post.post_type === "poll" && post.poll_data && (
        <div className="mb-4">
          <PollComponent poll={post.poll_data} />
        </div>
      )}

      {/* Author info */}
      <div className="flex items-center space-x-4 mb-3 text-gray-400 text-sm">
        {/* Age */}
        {post.author.age && (
          <div className="flex items-center space-x-1">
            <span>📅</span>
            <span>{safeNumber(post.author.age) || "Unknown"}</span>
          </div>
        )}

        {/* Gender */}
        {post.author.gender && (
          <div className="flex items-center space-x-1">
            <span>👤</span>
            <span>{post.author.gender}</span>
          </div>
        )}

        {/* Location */}
        {post.author.location && (
          <div className="flex items-center space-x-1">
            <span>🌍</span>
            <span>{post.author.location}</span>
          </div>
        )}

        {/* Time */}
        <div className="flex items-center space-x-1">
          <span>⏰</span>
          <span>{formatTimeAgo(post.timestamp)}</span>
        </div>
      </div>

      {/* Engagement metrics */}
      <div className="flex items-center space-x-6 text-gray-400 text-sm">
        <div className="flex items-center space-x-1">
          <span>📈</span>
          <span>{safeNumber(post.vote_count)}</span>
        </div>

        <div className="flex items-center space-x-1">
          <span>💬</span>
          <span>{safeNumber(post.comment_count)}</span>
        </div>

        <div className="flex items-center space-x-1">
          <span>👁</span>
          <span>
            {Math.floor(
              safeNumber(post.vote_count) * 1.5 +
                safeNumber(post.comment_count) * 2
            )}
          </span>
        </div>

        <div className="ml-auto">
          <span>⋯</span>
        </div>
      </div>
    </div>
  );
};
