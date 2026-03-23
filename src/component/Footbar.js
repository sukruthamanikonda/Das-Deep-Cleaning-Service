import React from 'react';
import { COMPANY_INFO } from '../constants.js';

function normalizePhone(phone) {
  if (!phone) return '';
  // remove non-digit characters and leading +
  return phone.replace(/[^0-9]/g, '').replace(/^0+/, '');
}

export default function Footer({ navigate }) {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-gray-400 mb-4">{COMPANY_INFO.tagline}</p>
            <p className="text-gray-400 text-sm">
              Providing top-notch deep cleaning services in {COMPANY_INFO.city}.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('home')} className="text-gray-400 hover:text-primary transition">Home</button></li>
              <li><button onClick={() => navigate('services')} className="text-gray-400 hover:text-primary transition">Services</button></li>
              <li><button onClick={() => navigate('about')} className="text-gray-400 hover:text-primary transition">About Us</button></li>
              <li><button onClick={() => navigate('contact')} className="text-gray-400 hover:text-primary transition">Contact</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-primary">{COMPANY_INFO.phone}</a>
                <span className="mx-2 text-gray-600">|</span>
                {/* WhatsApp link - use numeric international format without + or spaces */}
                {COMPANY_INFO.phone && (
                  <a
                    href={`https://wa.me/${normalizePhone(COMPANY_INFO.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    WhatsApp
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}