import React, { useEffect, useState } from "react";
import { Post } from "../types";

interface PollComponentProps {
  poll: Post["poll_data"];
}

export const PollComponent: React.FC<PollComponentProps> = ({ poll }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!poll) return null;

  // Safe number function to prevent NaN
  const safeNumber = (value: any, defaultValue: number = 0): number => {
    const num = Number(value);
    return isNaN(num) || !isFinite(num) ? defaultValue : num;
  };

  // Safe random number generator for mock net worth
  const generateMockNetWorth = (): string => {
    try {
      const randomValue = Math.random();
      const baseAmount = 100000;
      const multiplier = 1000000;

      const amount = safeNumber(
        randomValue * multiplier + baseAmount,
        baseAmount
      );

      return amount.toLocaleString("en-US", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    } catch (error) {
      return "100,000"; // Fallback value
    }
  };

  // Safe total votes calculation
  const safeTotalVotes = safeNumber(poll.total_votes, 0);

  return (
    <div className="my-4">
      <h4 className="text-white text-base font-medium mb-4">
        {poll.question || "Poll Question"}
      </h4>

      <div className="bg-gray-900 rounded-lg p-4">
        <div className="space-y-3">
          {poll.options?.map((option) => {
            const safeVoteCount = safeNumber(option.vote_count, 0);
            const percentage =
              safeTotalVotes > 0
                ? safeNumber((safeVoteCount / safeTotalVotes) * 100, 0)
                : 0;

            return (
              <div key={option.id || Math.random()} className="relative">
                <div className="flex items-center justify-between bg-yellow-400 text-black rounded-lg px-4 py-3 font-semibold">
                  <span className="text-sm">{option.text || "Option"}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{safeVoteCount}</span>
                    <div className="bg-black text-white px-2 py-1 rounded text-xs font-mono">
                      $ {generateMockNetWorth()}
                    </div>
                  </div>
                </div>
              </div>
            );
          }) || (
            <div className="text-gray-400 text-center py-4">
              No poll options available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
