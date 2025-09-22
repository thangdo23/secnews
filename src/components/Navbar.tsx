import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">SecNews</h1>
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="#">Home</a></li>
          <li><a href="#">Data Breaches</a></li>
          <li><a href="#">Cyber Attacks</a></li>
          <li><a href="#">Vulnerabilities</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <button className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold">
          Subscribe
        </button>
      </div>
    </nav>
  );
}
