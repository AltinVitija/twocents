import React from "react";

interface NetWorthPillProps {
  tier: string;
  username: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const NetWorthPill: React.FC<NetWorthPillProps> = ({
  tier,
  username,
  onClick,
  className = "",
}) => {
  const getGradient = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "bronze":
        return "bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700";
      case "silver":
        return "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500";
      case "gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500";
      case "platinum":
        return "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-300 hover:to-purple-500";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium transition-all hover:scale-105 ${getGradient(
        tier
      )} ${className}`}>
      {username}
    </button>
  );
};
