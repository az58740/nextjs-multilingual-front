"use client";

import { useState } from 'react';
import { Link } from '@/lib/i18n';

interface LanguageOption {
  code: string;
  label: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    // You can also handle language change logic here (e.g., via i18n or context)
  };

  return (
	
    <header className="">
     
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

      

      <div className="flex items-center space-x-6">
		
        {/* Language Dropdown */}
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        {isLoggedIn ? (
          <>
            <span>Welcome, User!</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">
            
                Log In
              
            </Link>
            <Link href="/signup" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-md">
             
                Sign Up
             
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
