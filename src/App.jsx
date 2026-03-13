import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">
            EduLense
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="bg-gray-100 text-center p-4">
        &copy; {new Date().getFullYear()} EduLense. All rights reserved.
      </footer>
    </Router>
  );
}

export default App;
