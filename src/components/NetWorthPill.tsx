import React from "react";

interface NetWorthPillProps {
  tier: string;
  username: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const NetWorthPill: React.FC<NetWorthPillProps> = ({
  tier,
  username,
  onClick,
  className = "",
  size = "md",
}) => {
  // Safe number function to prevent NaN
  const safeNumber = (value: any, defaultValue: number = 0): number => {
    const num = Number(value);
    return isNaN(num) || !isFinite(num) ? defaultValue : num;
  };

  // Extract number from username (remove $ and commas for comparison)
  const getNetWorthValue = (username: string): number => {
    if (!username || typeof username !== "string") return 0;

    const cleanNum = username.replace(/[$,\s]/g, "");
    const parsed = parseInt(cleanNum, 10);
    return safeNumber(parsed, 0);
  };

  const netWorth = getNetWorthValue(username);

  // Color based on actual net worth amount
  const getColorClass = () => {
    if (netWorth >= 10000000) {
      // 10M+
      return "bg-orange-400 text-black"; // Gold for highest tier
    } else if (netWorth >= 1000000) {
      // 1M+
      return "bg-yellow-400 text-black";
    } else if (netWorth >= 100000) {
      // 100k+
      return "bg-gray-400 text-black";
    } else {
      return "bg-gray-600 text-white"; // Dark gray for lowest
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "lg":
        return "px-4 py-2 text-base";
      default:
        return "px-3 py-1.5 text-sm";
    }
  };

  // Format the username to ensure it has $ and proper commas
  const formatUsername = (username: string): string => {
    if (!username || typeof username !== "string") {
      return "$ 0";
    }

    // If username already contains $, extract the number and reformat
    if (username.includes("$")) {
      const numPart = username.replace(/[$,\s]/g, "");
      const parsed = parseInt(numPart, 10);
      const safeAmount = safeNumber(parsed, 0);

      try {
        const formatted = safeAmount.toLocaleString("en-US", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        });
        return `$ ${formatted}`;
      } catch (error) {
        return `$ ${safeAmount}`;
      }
    } else {
      // If no $ in username, try to parse as number
      const parsed = parseInt(username.replace(/[,\s]/g, ""), 10);
      const safeAmount = safeNumber(parsed, 0);

      try {
        const formatted = safeAmount.toLocaleString("en-US", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        });
        return `$ ${formatted}`;
      } catch (error) {
        return `$ ${safeAmount}`;
      }
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center space-x-1 rounded-full font-semibold
        transition-all duration-200 hover:scale-105
        ${getColorClass()}
        ${getSizeClasses()}
        ${className}
      `}>
      <span>{formatUsername(username)}</span>
    </button>
  );
};
