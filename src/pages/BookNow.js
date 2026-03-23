import React, { useState } from 'react';
import { SERVICES_DATA, CONTACT_PHONE } from '../constants';
import logo from '../images/das_logo.png';
import { API_BASE } from '../api';

const API = API_BASE;

export default function BookNow({ navigate }) {
    const [bookingForm, setBookingForm] = useState({
        name: '',
        phone: '',
        date: '',
        address: '',
        propertyType: 'home',
        bhkCategory: '1 BHK Furnished',
        notes: ''
    });

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
                    'Villa Unfurnished',
                ];
            case 'commercial':
                return [
                    'Office Cleaning',
                    'Flooring Scrub',
                    'Carpet Wash',
                ];
            case 'kitchen':
                return [
                    'Occupied Kitchen (No Chimney)',
                    'Occupied Kitchen + Chimney',
                    'Empty Kitchen (No Chimney)',
                    'Empty Kitchen + Chimney',
                    'Chimney Cleaning',
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

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const matchedService = SERVICES_DATA.find(s => s.bhkCategory === bookingForm.bhkCategory) || {};
        const serviceId = matchedService.id || 'generic-booking';
        const basePrice = matchedService.basePrice || 0;

        const newBookingItem = {
            id: Date.now().toString(),
            serviceId: serviceId,
            serviceName: bookingForm.bhkCategory,
            ...bookingForm,
            timestamp: Date.now()
        };

        try {
            const res = await fetch(`${API}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: [newBookingItem],
                    total: basePrice,
                    name: bookingForm.name,
                    phone: bookingForm.phone,
                    date: bookingForm.date,
                    address: bookingForm.address
                })
            });

            if (!res.ok) {
                throw new Error('Server rejected booking');
            }

            // WhatsApp message
            const whatsappNumber = CONTACT_PHONE.replace(/[^0-9]/g, '');
            const message = `*New Booking Request*%0A%0A` +
                `*Property:* ${bookingForm.propertyType} (${bookingForm.bhkCategory})%0A` +
                `*Name:* ${bookingForm.name}%0A` +
                `*Phone:* ${bookingForm.phone}%0A` +
                `*Date:* ${bookingForm.date}%0A` +
                `*Address:* ${bookingForm.address}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');

            navigate('success');
        } catch (err) {
            console.error('Booking failed:', err);
            alert(`Booking Request Failed!\n${err.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-slide-up relative overflow-y-auto max-h-[90vh]">

                <div className="flex items-center gap-4 mb-4">
                    <img width="50px" height="50px" src={logo} alt="Das Logo" className="rounded-full" />
                    <h2 className="text-2xl font-bold text-secondary">Book Service</h2>
                </div>
                <p className="text-primary font-medium mb-6">{bookingForm.bhkCategory}</p>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                        <select
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            value={bookingForm.propertyType}
                            onChange={e => {
                                const newType = e.target.value;
                                const newCats = getCategoryOptions(newType);
                                setBookingForm({
                                    ...bookingForm,
                                    propertyType: newType,
                                    bhkCategory: newCats.length > 0 ? newCats[0] : ''
                                });
                            }}
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
                            placeholder="Enter your name"
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
                            placeholder="10-digit number"
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
                            placeholder="#123, Street Name, Area..."
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
    );
}
