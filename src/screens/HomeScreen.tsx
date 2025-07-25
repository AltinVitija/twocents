import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchPosts, setFilter, clearError } from "../store/slices/postsSlice";
import { PostCard } from "../components/PostCard";
import { FilterTabs } from "../components/FilterTabs";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts(undefined));
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchPosts());
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error loading posts: {error}</div>
        <button
          onClick={handleRetry}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <FilterTabs />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.uuid} post={post} />
        ))}
        {posts.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg mb-2">No posts found</div>
            <div className="text-sm">
              Try a different filter or check back later
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
