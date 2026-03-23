import React, { useState } from 'react';
import Navbar from './component/Navbar';
import Footbar from './component/Footbar';
import Home from './pages/Home';
import Services from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import BookNow from './pages/BookNow';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={setCurrentPage} />;
      case 'services': return <Services navigate={setCurrentPage} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'booknow': return <BookNow navigate={setCurrentPage} />;
      default: return <Home navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-secondary bg-gray-50">
      <Navbar
        currentPage={currentPage}
        navigate={setCurrentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footbar navigate={setCurrentPage} />
    </div>
  );
}
