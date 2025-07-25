import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setView } from "../store/slices/appSlice";
import { Comment } from "../types";
import { AuthorInfo } from "./AuthorInfo";

interface CommentComponentProps {
  comment: Comment;
  depth?: number;
}

export const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  depth = 0,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setView({ view: "user", id: comment.author.uuid }));
  };

  return (
    <div
      className={`${
        depth > 0 ? "ml-6 border-l-2 border-gray-200 pl-4" : ""
      } py-3`}>
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <AuthorInfo
            author={comment.author}
            timestamp={comment.timestamp}
            onUserClick={handleUserClick}
            size="sm"
          />
          <p className="text-sm text-gray-800 mt-2 mb-2">{comment.content}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <span>↑</span>
              <span>{comment.vote_count}</span>
            </span>
          </div>
        </div>
      </div>
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
