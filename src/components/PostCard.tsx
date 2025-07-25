import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setView } from "../store/slices/appSlice";
import { Post } from "../types";
import { NetWorthPill } from "./NetWorthPill";
import { AuthorInfo } from "./AuthorInfo";
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

  return (
    <div
      onClick={handlePostClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer hover:border-gray-300">
      <AuthorInfo
        author={post.author}
        timestamp={post.timestamp}
        onUserClick={handleUserClick}
      />

      <p className="text-gray-800 mt-3 mb-4 leading-relaxed">{post.content}</p>

      {post.post_type === "poll" && post.poll_data && (
        <PollComponent poll={post.poll_data} />
      )}

      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <span className="flex items-center space-x-1">
          <span>↑</span>
          <span>{post.vote_count}</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>💬</span>
          <span>{post.comment_count}</span>
        </span>
      </div>
    </div>
  );
};
