import React, { useState } from 'react';
import { SERVICES_DATA, EXCLUDED_ITEMS, CONTACT_PHONE } from '../constants';
import logo from '../images/das_logo.png';

import { API_BASE } from '../api';

const API = API_BASE;

export default function Services({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    address: '',
    propertyType: 'home',
    bhkCategory: '1 BHK Furnished',
    notes: ''
  });

  const categories = ['All', ...new Set(SERVICES_DATA.map(s => s.category))];

  const filteredServices = activeCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  // Get category options based on property type
  const getCategoryOptions = (propertyType) => {
    switch (propertyType) {
      case 'home':
        return [
          '1 BHK Furnished',
          '2 BHK Furnished',
          '3 BHK Furnished',
          '1 BHK Unfurnished',
          '2 BHK Unfurnished',
          '3 BHK Unfurnished'
        ];
      case 'villa':
        return [
          'Villa Furnished',
          'Villa Unfurnished'
        ];
      case 'commercial':
        return [
          'Office Cleaning',
          'Flooring Scrub',
          'Carpet Wash'
        ];
      case 'kitchen':
        return [
          'Occupied Kitchen (No Chimney)',
          'Occupied Kitchen + Chimney',
          'Empty Kitchen (No Chimney)',
          'Empty Kitchen + Chimney',
          'Chimney Cleaning'
        ];
      case 'specality':
        return [
          'Bathroom Descaling',
          'Sofa Cleaning',
          'Carpet Washing',
          'Window Cleaning',
          'Mattress Washing'
        ];
      default:
        return [];
    }
  };

  const openBooking = (service) => {
    // Use explicit propertyType and bhkCategory from the service object
    const propertyType = service.propertyType || 'home';
    const bhkCategory = service.bhkCategory || '1 BHK Furnished';

    setSelectedService(service);
    setBookingForm({
      name: '',
      phone: '',
      date: '',
      address: '',
      propertyType,
      bhkCategory, // Set the default dropdown value to match the clicked service
      notes: ''
    });
  };

  const closeBooking = () => {
    setSelectedService(null);
    setBookingForm({ name: '', phone: '', date: '', address: '', propertyType: 'home', bhkCategory: '1 BHK Furnished', notes: '' });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const newBookingItem = {
      id: Date.now().toString(),
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      ...bookingForm,
      timestamp: Date.now()
    };

    // Construct WhatsApp message with booking details
    const whatsappNumber = CONTACT_PHONE.replace(/[^0-9]/g, '');
    const message = `*New Booking Request*%0A%0A` +
      `*Service:* ${selectedService.title}%0A` +
      `*Property:* ${bookingForm.propertyType} (${bookingForm.bhkCategory})%0A` +
      `*Name:* ${bookingForm.name}%0A` +
      `*Phone:* ${bookingForm.phone}%0A` +
      `*Date:* ${bookingForm.date}%0A` +
      `*Address:* ${bookingForm.address}%0A%0A` +
      `*Total Price Estimate:* ${selectedService.priceDescription}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    try {
      const requestBody = JSON.stringify({
        items: [newBookingItem],
        total: selectedService.basePrice || 0,
        name: bookingForm.name,
        phone: bookingForm.phone,
        date: bookingForm.date,
        address: bookingForm.address
      });

      console.log('Sending booking data:', requestBody);

      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      });

      if (!res.ok) {
        throw new Error('Server rejected booking');
      }

    } catch (err) {
      console.error('Booking failed:', err);
      // Backend failed, but we still proceed to WhatsApp silently
    } finally {
      // Regardless of backend success/failure, open WhatsApp and show success
      window.open(whatsappUrl, '_blank');
      navigate('success');
      closeBooking();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Our Services</h1>
          <p className="text-gray-600">Transparent pricing. No hidden charges.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
              <div className="h-56 relative overflow-hidden group">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <span className="text-white p-4 font-medium">{service.category}</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-primary font-bold text-lg mb-4">{service.priceDescription}</p>

                <div className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="text-primary mr-2">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openBooking(service)}
                  className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Excluded Items Section */}
        <div className="mt-24 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center">
            <span className="mr-2">⚠️</span> What's Excluded
          </h3>
          <p className="text-gray-600 mb-6">To ensure transparency, the following are NOT included in our standard packages:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXCLUDED_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center text-gray-600">
                <span className="text-red-400 mr-3 text-lg">×</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-slide-up relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeBooking}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img width="50px" height="50px" src={logo} alt="Das Logo" className="rounded-full" />
              <h2 className="text-2xl font-bold text-secondary">Book Service</h2>
            </div>
            <p className="text-primary font-medium mb-6">{selectedService.title}</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={bookingForm.propertyType}
                  onChange={e => setBookingForm({ ...bookingForm, propertyType: e.target.value })}
                >
                  <option value="home">Home</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="specality">Specialty</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category / Type</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={bookingForm.bhkCategory}
                  onChange={e => setBookingForm({ ...bookingForm, bhkCategory: e.target.value })}
                >
                  {getCategoryOptions(bookingForm.propertyType).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={bookingForm.name}
                  onChange={e => {
                    const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                    setBookingForm({ ...bookingForm, name: value });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={bookingForm.phone}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                    setBookingForm({ ...bookingForm, phone: value });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  required
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={bookingForm.date}
                  onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Address (Bengaluru Only)</label>
                <textarea
                  required
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  value={bookingForm.address}
                  onChange={e => setBookingForm({ ...bookingForm, address: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
              >
                Confirm Booking
              </button>
            </form>
            <p className="text-xs text-center text-gray-400 mt-4">Payment collected after service completion.</p>
          </div>
        </div>
      )}
    </div>
  );
}
