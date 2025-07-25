import React, { useEffect, useState } from "react";
import { Post } from "../types";

interface PollComponentProps {
  poll: Post["poll_data"];
}

export const PollComponent: React.FC<PollComponentProps> = ({ poll }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!poll) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h4 className="font-medium mb-3">{poll.question}</h4>
      {poll.options.map((option) => {
        const percentage =
          poll.total_votes > 0
            ? (option.vote_count / poll.total_votes) * 100
            : 0;

        return (
          <div key={option.id} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{option.text}</span>
              <span className="text-gray-600">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${percentage}%` : "0%",
                  minWidth: percentage > 0 ? "8px" : "0px",
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {option.vote_count} votes
            </div>
          </div>
        );
      })}
      <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-200">
        {poll.total_votes} total votes
      </p>
    </div>
  );
};
