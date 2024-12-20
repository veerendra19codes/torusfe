import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart } from 'lucide-react';

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              location.pathname === '/dashboard' ? 'bg-gray-100' : ''
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/analytics"
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              location.pathname === '/analytics' ? 'bg-gray-100' : ''
            }`}
          >
            <BarChart className="w-5 h-5 mr-2" />
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;