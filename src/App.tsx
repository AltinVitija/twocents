import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchPosts } from "./store/slices/postsSlice";
import Header from "./components/Header";
import PostDetailScreen from "./components/PostDetailScreen";
import Feed from "./screens/Feed";

/**
 * Keeps the screen routing (feed vs. detail) and triggers the initial
 * load for the feed.
 */
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((s) => s.posts);
  const { currentView } = useAppSelector((s) => s.ui);

  useEffect(() => {
    dispatch(fetchPosts(filter));
  }, [filter, dispatch]);

  return (
    <>
      {currentView === "feed" && <Feed />}
      {currentView === "post-detail" && <PostDetailScreen />}
    </>
  );
};

export default AppContent;
