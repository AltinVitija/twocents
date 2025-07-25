import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const containerHeight = {
    sm: "h-32",
    md: "h-64",
    lg: "h-96",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerHeight[size]}`}>
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200`}></div>

        {/* Animated Ring */}
        <div
          className={`
          absolute top-0 left-0 ${sizeClasses[size]} rounded-full 
          border-4 border-transparent border-t-orange-500 border-r-orange-500
          animate-spin
        `}></div>

        {/* Inner Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 font-medium animate-pulse">{text}</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <div
              className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}></div>
            <div
              className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}></div>
            <div
              className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
    </div>
  );
};
