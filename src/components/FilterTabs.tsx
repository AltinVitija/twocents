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
    { name: "New Today", icon: "₿", color: "from-orange-500 to-yellow-500" },
    { name: "Top Today", icon: "Ł", color: "from-orange-500 to-yellow-500" },
    { name: "Top All Time", icon: "₳", color: "from-orange-500 to-yellow-500" },
    {
      name: "Controversial All Time",
      icon: "🚀",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
    dispatch(fetchPosts(filter));
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-white mb-2">
          Discover Wealth Stories
        </h2>
        <p className="text-gray-600">
          See what the community is sharing about their financial journey
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="relative">
        {/* Background Container */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-gray-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {filters.map((filter) => {
              const isActive = currentFilter === filter.name;

              return (
                <button
                  key={filter.name}
                  onClick={() => handleFilterChange(filter.name)}
                  className={`
                    group relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300
                    ${
                      isActive
                        ? `bg-gradient-to-r ${filter.color} text-white shadow-lg shadow-current/25 scale-105`
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                    }
                  `}>
                  {/* Background Glow for Active */}
                  {isActive && (
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${filter.color} rounded-xl opacity-30 blur group-hover:opacity-40 transition-opacity`}></div>
                  )}

                  {/* Content */}
                  <div className="relative flex items-center justify-center space-x-2">
                    <span className="text-lg">{filter.icon}</span>
                    <span className="font-semibold whitespace-nowrap">
                      {filter.name.replace(" All Time", "")}
                    </span>
                  </div>

                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
