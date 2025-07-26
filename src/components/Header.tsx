import React from "react";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  actions,
}) => {
  return (
    <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800">
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </div>
  );
};

export default Header;
