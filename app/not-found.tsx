'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Could not find the requested resource. 
        Usually this means the Middleware is not redirecting to a locale (like /en).
      </p>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Try these links:</p>
        <div className="flex gap-4 justify-center">
          <a href="/en" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
            Go to English Home (/en)
          </a>
          <a href="/ur" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">
            Go to Urdu Home (/ur)
          </a>
        </div>
      </div>
    </div>
  );
}
