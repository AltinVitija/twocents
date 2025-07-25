import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUserPosts, clearUser } from "../store/slices/userSlice";
import { goHome } from "../store/slices/appSlice";
import { PostCard } from "../components/PostCard";
import { NetWorthPill } from "../components/NetWorthPill";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const UserProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const selectedUserId = useSelector(
    (state: RootState) => state.app.selectedUserId
  );

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchUserPosts(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const handleBack = () => {
    dispatch(goHome());
    dispatch(clearUser());
  };

  const user = posts.length > 0 ? posts[0].author : null;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
        <span>←</span>
        <span>Back to Feed</span>
      </button>

      {user && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <NetWorthPill
              tier={user.net_worth_tier}
              username={user.username}
              className="text-lg px-4 py-2"
            />
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {user.age && <span>{user.age} years old</span>}
            {user.gender && <span>{user.gender}</span>}
            {user.location && <span>{user.location}</span>}
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Posts ({posts.length})</h2>
      </div>

      {error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            Error loading user posts: {error}
          </div>
          <button
            onClick={() =>
              selectedUserId && dispatch(fetchUserPosts(selectedUserId))
            }
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.uuid} post={post} />
          ))}
          {posts.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-lg mb-2">No posts found</div>
              <div className="text-sm">
                This user hasn't posted anything yet
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
