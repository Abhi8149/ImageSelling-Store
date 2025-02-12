"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // const { data: session } = useSession();
  const session = useSession();
  const [isOpen, setIsOpen] = useState(true);
  console.log(session?.data?.user);

  return (

    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - empty for centering */}
          <div className="w-1/3"></div>

          {/* Center section - Shop name */}
          <div className="w-1/3 flex justify-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
              PixelPerfect
            </Link>
          </div>

          {/* Right section - User info and orders */}
          <div className="w-1/3 flex justify-end items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/orders"
                  className="text-gray-300 hover:text-white transition-colors bg-red-500 p-1 rounded-sm"
                >
                  My Orders
                </Link>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors bg-red-500 p-1 rounded-sm"
                >
                  Logout
                </Link>
                <div className="relative">
                  <div
                    className="flex items-center space-x-2 text-gray-300 hover:trans bg-blue-600 p-1 rounded-sm "
                  >
                    <span>{session.data?.user?.email.split('@')[0]}</span>
                  </div>
                  
                </div>
                <div>
                {session.data?.user.role==='admin' &&<Link
                  href="/admin"
                  className="text-gray-300 hover:text-white transition-colors bg-blue-600 p-1"
                >
                  Admin
                </Link>}
                </div>

              </>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  
  );
}