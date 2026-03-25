"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { motion } from "framer-motion";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (slug: string) => {
    return pathname === `/` || pathname === `/${slug}`;
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-50 rounded-lg bg-gray-800 p-2 text-gray-100 md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto border-r border-gray-800 bg-gray-900 md:static md:translate-x-0"
      >
        {/* Logo Section */}
        <div className="border-b border-gray-800 p-6">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                <span className="text-sm font-bold text-white">⚡</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">TechHub</h1>
                <p className="text-xs text-gray-500">AI & Tools</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Home Link */}
        <nav className="space-y-1 px-4 py-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
              pathname === "/"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
            }`}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
        </nav>

        {/* Navigation Section */}
        <div className="border-t border-gray-800 px-4 py-4">
          <p className="mb-4 px-4 text-xs font-semibold uppercase text-gray-500">
            Sections
          </p>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.slug);

              return (
                <motion.div key={item.slug} whileHover={{ x: 4 }}>
                  <Link
                    href={`/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.count}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-xs text-gray-400">
              Your complete tech & AI resource hub with 350+ tools and counting.
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main content offset for desktop */}
      <style>{`
        @media (min-width: 768px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </>
  );
}
