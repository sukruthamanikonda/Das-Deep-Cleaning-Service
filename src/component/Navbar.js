import React, { useState } from 'react';
import logo from "../images/das_logo.png"

export default function Navbar({ currentPage, navigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'book_now', label: 'Book Now', page: 'booknow' },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <div className="flex items-center gap-1 sm:gap-2">
              <img width="40px" height="40px" src={logo} alt="Das Logo" className="sm:w-[50px] sm:h-[50px] rounded-full" />
              <span className="font-bold text-lg sm:text-2xl tracking-tight text-primary-dark">Das Deep Cleaning Service</span>

            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.page || item.id)}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-200 
                  ${(currentPage === item.id || currentPage === item.page)
                    ? 'text-primary font-bold bg-primary-light/30'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.page || item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${(currentPage === item.id || currentPage === item.page)
                  ? 'text-primary bg-primary-light'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
