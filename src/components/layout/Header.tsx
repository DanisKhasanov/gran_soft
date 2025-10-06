import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = ["English", "Русский", "Español", "Français"];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">ГРАНТ СОФТ</h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Globe className="w-4 h-4" />
            <span>{selectedLanguage}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => {
                      setSelectedLanguage(language);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedLanguage === language
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
