import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/index";
import { apiService } from "./services/api";
import { Header } from "./components/Header";
import { HomeScreen } from "./screens/HomeScreen";
import { PostDetailScreen } from "./screens/PostDetailScreen";
import { UserProfileScreen } from "./screens/UserProfileScreen";
import { RootState } from "./store/index";

const App: React.FC = () => {
  const currentView = useSelector((state: RootState) => state.app.currentView);

  // Test API connection on app load
  useEffect(() => {
    console.log("🚀 TwoCents App initialized");
    console.log("🔗 Testing API connection...");

    apiService
      .getPosts("Top Today")
      .then((result) => console.log("✅ API Test Success:", result))
      .catch((error) =>
        console.log("⚠️ API Test Failed (using mock data):", error)
      );
  }, []);

  const renderCurrentScreen = () => {
    switch (currentView) {
      case "home":
        return <HomeScreen />;
      case "post":
        return <PostDetailScreen />;
      case "user":
        return <UserProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderCurrentScreen()}
      </main>
    </div>
  );
};

const TwoCentsApp: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default TwoCentsApp;
