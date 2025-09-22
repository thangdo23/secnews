"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">SecNews</Link>

        <nav className="hidden md:flex gap-6 items-center">
          <div className="group relative">
            <span className="cursor-pointer">Kiến thức</span>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow rounded">
              <Link href="/kien-thuc/network" className="block px-4 py-2">Network</Link>
              <Link href="/kien-thuc/system" className="block px-4 py-2">System</Link>
              <Link href="/kien-thuc/security" className="block px-4 py-2">Security</Link>
            </div>
          </div>
          <Link href="/tin-tuc">Tin tức</Link>
        </nav>

        <div className="flex items-center gap-3">
          <input placeholder="Tìm..." className="hidden md:inline-block border rounded px-2 py-1"/>
          <button className="text-sm px-3 py-2 border rounded">Đăng nhập</button>
        </div>
      </div>
    </header>
  );
}
