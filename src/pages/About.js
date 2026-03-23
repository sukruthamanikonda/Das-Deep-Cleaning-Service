import React from 'react';
import { COMPANY_INFO } from '../constants';

export default function About() {
  return (
    <div className="min-h-screen bg-white py-20 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary mb-6">About Das Deep Cleaning Service</h1>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
          <p className="mb-6">
            Welcome to <span className="font-bold text-primary">{COMPANY_INFO.name}</span>, Bengaluru's premier provider of professional deep cleaning services. 
            We believe that a clean environment is the foundation of a healthy and happy life.
          </p>
          <p className="mb-6">
            Specializing in residential and commercial cleaning, our team of trained experts uses industrial-grade equipment 
            and eco-friendly solutions to deliver results that go beyond the surface. From compact 1BHKs to expansive villas 
            and corporate offices, we treat every space with the care it deserves.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-primary-superlight p-8 rounded-2xl border border-primary-light">
              <h3 className="text-xl font-bold text-primary-dark mb-3">Our Mission</h3>
              <p>To provide affordable, high-quality hygiene solutions that transform living and working spaces into sanctuaries of cleanliness.</p>
            </div>
            <div className="bg-primary-superlight p-8 rounded-2xl border border-primary-light">
              <h3 className="text-xl font-bold text-primary-dark mb-3">Our Promise</h3>
              <p>Transparency, Punctuality, and Perfection. We don't consider the job done until you are completely satisfied.</p>
            </div>
          </div>

          <p>
             We proudly serve the <strong>Bengaluru</strong> area, bringing the shine back to homes in kamla nagar, Shakti Ganapathi nagar, Basaveswara nagar, and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}