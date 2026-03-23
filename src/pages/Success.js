import React from 'react';

export default function Success({ navigate }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4 animate-fade-in">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="text-blue-500 text-5xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-secondary mb-2">Booking Successful</h1>
        <p className="text-gray-600 mb-6">
          Thank you. Your booking has been received. A confirmation has been sent via WhatsApp.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('services')}
            className="px-5 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark shadow-md"
          >
            Book Another Service
          </button>
          <button
            onClick={() => navigate('home')}
            className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 border border-gray-200"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
