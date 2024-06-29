'use client'
import React, { useState } from 'react';

// Helper function to generate navigation links
const generateNavLinks = (className: string) => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return links.map(link => (
    <li key={link.href}>
      <a href={link.href} className={className}>
        {link.label}
      </a>
    </li>
  ));
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-100/90 shadow-md p-4 rounded-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-start items-center">
          <span className="text-lg font-bold text-gray-800">Empower Vision</span>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {generateNavLinks("text-gray-800 hover:text-gray-700 focus:outline-none")}
          </ul>
        </nav>

        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-2 mt-2">
            {generateNavLinks("text-gray-800 hover:text-gray-700 block px-4 py-2")}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
