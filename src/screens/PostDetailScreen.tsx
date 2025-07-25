import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchPostDetail,
  clearCurrentPost,
} from "../store/slices/currentPostSlice";
import { goHome } from "../store/slices/appSlice";
import { PostCard } from "../components/PostCard";
import { CommentComponent } from "../components/CommentComponent";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const PostDetailScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { post, loading, error } = useSelector(
    (state: RootState) => state.currentPost
  );
  const selectedPostId = useSelector(
    (state: RootState) => state.app.selectedPostId
  );

  useEffect(() => {
    if (selectedPostId) {
      dispatch(fetchPostDetail(selectedPostId));
    }
  }, [dispatch, selectedPostId]);

  const handleBack = () => {
    dispatch(goHome());
    dispatch(clearCurrentPost());
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error loading post: {error}</div>
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Back to Feed
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">Post not found</div>
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
        <span>←</span>
        <span>Back to Feed</span>
      </button>

      <div className="mb-6">
        <PostCard post={post} onClick={() => {}} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">
            Comments ({post.comments?.length || 0})
          </h3>
        </div>

        <div className="space-y-1">
          {post.comments?.length ? (
            post.comments.map((comment) => (
              <CommentComponent key={comment.uuid} comment={comment} />
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg mb-2">No comments yet</div>
              <div className="text-gray-400 text-sm">
                Be the first to share your thoughts!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
