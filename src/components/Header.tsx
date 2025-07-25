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

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div
          onClick={handleLogoClick}
          className={`${
            currentView !== "home" ? "cursor-pointer hover:opacity-80" : ""
          } transition-opacity`}>
          <h1 className="text-2xl font-bold text-gray-900">twocents</h1>
          <p className="text-sm text-gray-600">
            Your username is your net worth
          </p>
        </div>
      </div>
    </header>
  );
};
