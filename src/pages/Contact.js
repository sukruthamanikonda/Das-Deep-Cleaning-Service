import React, { useState } from 'react';
import { COMPANY_INFO } from '../constants';

import { API_BASE } from '../api';

const API = API_BASE;

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary mb-4">Get In Touch</h1>
          <p className="text-gray-600">We are here to answer any questions you may have.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0 mr-4">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600 mt-1">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0 mr-4">
                  📞
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-primary font-bold mt-1 block hover:underline text-lg">
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Available 9 AM - 6 PM</p>
                </div>
              </div>

            </div>

            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Service Area</h4>
              <p className="text-gray-600">We currently serve all major areas within Bengaluru city limits.</p>
            </div>
          </div>

          {/* Map Placeholder or Simple Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message })
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('sent');
      setName(''); setPhone(''); setMessage('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="space-y-6" onSubmit={submit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input value={name} onChange={e => setName(e.target.value.replace(/[^A-Za-z ]/g, ''))} type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Your Name" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 15))} type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Your Phone Number" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="How can we help you?" required></textarea>
      </div>
      <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition-colors" type="submit">Send Message</button>
      {status === 'sending' && <p className="text-sm text-gray-500">Sending...</p>}
      {status === 'sent' && <p className="text-sm text-blue-500">Message sent. We'll get back to you shortly.</p>}
      {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again later.</p>}
    </form>
  );
}