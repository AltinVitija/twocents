import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/index";
import { apiService } from "./services/api";
import { Header } from "./components/Header";
import { HomeScreen } from "./screens/HomeScreen";
import { PostDetailScreen } from "./screens/PostDetailScreen";
import { UserProfileScreen } from "./screens/UserProfileScreen";
import { RootState } from "./store/index";

const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
  
  body {
    background-color: #000000 !important;
    color: #ffffff !important;
  }
  
  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  *::-webkit-scrollbar {
    display: none;
  }
`;

const App: React.FC = () => {
  const currentView = useSelector((state: RootState) => state.app.currentView);

  // Inject custom styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    // Set dark background on body
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

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
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="animate-fade-in">{renderCurrentScreen()}</main>
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
