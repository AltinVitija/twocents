import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchPosts, setFilter } from "../store/slices/postsSlice";

export const FilterTabs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilter = useSelector(
    (state: RootState) => state.posts.currentFilter
  );

  const filters = [
    "New Today",
    "Top Today",
    "Top All Time",
    "Controversial All Time",
  ];

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
    dispatch(fetchPosts(filter));
  };

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            currentFilter === filter
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}>
          {filter}
        </button>
      ))}
    </div>
  );
};
