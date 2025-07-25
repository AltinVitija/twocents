import React from "react";
import { Post } from "../types";
import { NetWorthPill } from "./NetWorthPill";

interface AuthorInfoProps {
  author: Post["author"];
  timestamp: string;
  onUserClick?: (e: React.MouseEvent) => void;
  size?: "sm" | "md";
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
  author,
  timestamp,
  onUserClick,
  size = "md",
}) => {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const pillSize = size === "sm" ? "text-xs px-2 py-0.5" : "";

  return (
    <div className="flex items-center space-x-2">
      <NetWorthPill
        tier={author.net_worth_tier}
        username={author.username}
        onClick={onUserClick}
        className={pillSize}
      />
      {author.age && (
        <span className={`${textSize} text-gray-500`}>{author.age}y</span>
      )}
      {author.gender && (
        <span className={`${textSize} text-gray-500`}>{author.gender}</span>
      )}
      {author.location && (
        <span className={`${textSize} text-gray-500`}>{author.location}</span>
      )}
      <span className={`${textSize} text-gray-400`}>
        {new Date(timestamp).toLocaleDateString()}
      </span>
    </div>
  );
};
