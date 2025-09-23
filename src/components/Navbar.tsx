"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed inset-x-0 top-0 bg-blue-800 text-white px-6 py-3 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold"><Link href="/">SecNews</Link></h1>
        <ul className="hidden md:flex space-x-6 font-medium items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/tin-tuc">Tin tức</Link></li>
          <li className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2">Kiến thức ▾</button>
            {open && (
              <div className="absolute bg-white text-black mt-2 rounded shadow-md right-0 w-44 z-50">
                <ul className="p-2">
                  <li className="py-1"><Link href="/kien-thuc/system">System</Link></li>
                  <li className="py-1"><Link href="/kien-thuc/security">Security</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="mr-3">☰</button>
        </div>
        <button className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold hidden md:inline-block">
          Subscribe
        </button>
      </div>
      {/* mobile expanded menu */}
        {open && (
        <div className="md:hidden bg-blue-700 text-white">
          <ul className="p-4 space-y-2 font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tin-tuc">Tin tức</Link></li>
            <li><Link href="/kien-thuc/system">System</Link></li>
            <li><Link href="/kien-thuc/security">Security</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
