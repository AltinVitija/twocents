import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPosts, setFilter } from "../store/slices/postsSlice";
import { ChevronDown, Filter, Search } from "lucide-react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";

export const filters = [
  { label: "Top All Time", value: "topAllTime" },
  { label: "Top Today", value: "topToday" },
  { label: "New Today", value: "newToday" },
  { label: "Controversial", value: "controversial" },
];

const Feed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, filter, error } = useAppSelector((s) => s.posts);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Clicking anywhere outside the filter dropdown closes it.
     */
    const handleClickOutside = (evt: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(evt.target as Node)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value));
    setShowFilters(false);
  };

  const handleRetry = () => {
    dispatch(fetchPosts(filter));
  };

  const currentLabel =
    filters.find((f) => f.value === filter)?.label || "Top All Time";

  return (
    <div className="bg-black min-h-screen text-white">
      <Header
        title="twocents Feed"
        showBack={false}
        actions={
          <div className="flex items-center space-x-3">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="text-gray-400 hover:text-white transition-colors">
                <Filter size={20} />
              </button>
              {showFilters && (
                <div className="absolute right-0 top-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 min-w-48 z-50">
                  {filters.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleFilterChange(opt.value)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                        filter === opt.value
                          ? "text-yellow-400 bg-gray-700"
                          : "text-white"
                      }`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        }
      />

      {/* Current filter indicator */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Showing:{" "}
            <span className="text-white font-medium">{currentLabel}</span>
          </span>
          {posts.length > 0 && (
            <span className="text-xs text-gray-500">{posts.length} posts</span>
          )}
        </div>
      </div>

      {/* Feed content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            <span className="ml-3 text-gray-400">Loading posts…</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-2">Failed to load posts</div>
            <div className="text-gray-500 text-sm mb-4">{error}</div>
            <button
              onClick={handleRetry}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-4 py-2 rounded-lg font-semibold shadow-lg transition-all">
              Retry
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No posts found</div>
            <div className="text-gray-500 text-sm">
              Try switching to a different filter
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p.uuid} post={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
