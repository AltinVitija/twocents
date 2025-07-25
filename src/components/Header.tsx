import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { goHome } from "../store/slices/appSlice";

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentView = useSelector((state: RootState) => state.app.currentView);

  const handleLogoClick = () => {
    if (currentView !== "home") {
      dispatch(goHome());
    }
  };

  const handleBackClick = () => {
    dispatch(goHome());
  };

  if (currentView === "post") {
    return (
      <header className="bg-black border-b border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            <span className="text-lg font-medium">Back</span>
          </button>

          <h1 className="text-lg font-semibold text-white">Post</h1>

          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold">2¢</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-black border-b border-gray-800 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="w-8"></div>

        <button
          onClick={handleLogoClick}
          className={`text-xl font-semibold text-white ${
            currentView !== "home"
              ? "hover:text-gray-300 transition-colors"
              : ""
          }`}>
          twocents
        </button>

        <button className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-yellow-400 rounded-md flex flex-col justify-center items-center space-y-0.5">
            <div className="w-3 h-0.5 bg-yellow-400 rounded"></div>
            <div className="w-3 h-0.5 bg-yellow-400 rounded"></div>
            <div className="w-3 h-0.5 bg-yellow-400 rounded"></div>
          </div>
        </button>
      </div>
    </header>
  );
};
