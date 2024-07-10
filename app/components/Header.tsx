'use client'
import React, { useState } from 'react';

// Helper function to generate navigation links
const generateNavLinks = (className: string) => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/tryme', label: 'Try Me' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' }
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
    <header className="bg-primary shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-start items-center">
          <span className="text-lg font-bold text-light">Empower Vision</span>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {generateNavLinks("text-light hover:text-accent focus:outline-none")}
          </ul>
        </nav>

        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-light focus:outline-none"
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
            {generateNavLinks("text-light hover:text-accent block px-4 py-2")}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
