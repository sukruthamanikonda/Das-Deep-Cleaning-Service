import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, Star, MapPin,
  ArrowRight, Home, Building2, Droplets, X, Phone
} from 'lucide-react';
import { Button, SectionTitle, BeforeAfterCard } from '../component/Shared';
import { SERVICES_DATA, CONTACT_PHONE, COMPARISON_DATA } from '../constants';

const HomeView = ({ navigate, onBook }) => {
  // Clean phone number for WhatsApp link
  const whatsappNumber = CONTACT_PHONE.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;


  return (
    <div className="w-full relative">
      {/* Call Floating Button */}
      <a
        href={`tel:${CONTACT_PHONE}`}
        className="fixed bottom-24 right-6 z-50 bg-blue-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group border-2 border-white/20"
        aria-label="Call Us"
      >
        <Phone className="w-7 h-7 p-0.5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold whitespace-nowrap">
          Call Now
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group border-2 border-white/20"
        aria-label="Contact on WhatsApp"
      >
        {/* Official WhatsApp SVG Icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold whitespace-nowrap">
          Chat with Us
        </span>
      </a>

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://img.freepik.com/premium-photo/professional-cleaning-concept-banner-with-soft-focus-blurred-background_1164591-5943.jpg"
            alt="Professional Cleaning"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30"></div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-500/30 mb-6 inline-block backdrop-blur-sm">
              #1 Deep Cleaning Service in Bengaluru
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Purest Clean</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl mb-8 leading-relaxed font-medium">
              Professional deep cleaning for homes, offices, and villas.
              We don't just clean; we hygiene-check your space using advanced machinery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('services')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 text-base md:text-lg animate-pulse"
              >
                Explore Services
              </Button>
              <Button variant="outline" className="!border-white !text-white hover:!bg-white/10" onClick={() => navigate('contact')}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Features Block */}
      <section className="py-12 bg-white relative -mt-10 z-20 container mx-auto px-6 rounded-3xl shadow-xl grid grid-cols-2 md:grid-cols-3 gap-2 border-b-4 border-blue-500">
        {[
          { icon: CheckCircle, label: "Completed Jobs", val: "2000+", bg: "bg-blue-100", col: "text-blue-600" },
          { icon: Star, label: "Happy Clients", val: "98%", bg: "bg-amber-100", col: "text-amber-600" },
          { icon: MapPin, label: "Bengaluru Areas", val: "All", bg: "bg-purple-100", col: "text-purple-600" }
        ].map((item, idx) => (
          <div key={idx} className="text-center group">
            <div className={`w-12 h-12 mx-auto rounded-xl ${item.bg} ${item.col} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{item.val}</h3>
            <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Info Graphic Section - Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="How We Work" title="Simple 4-Step Process" />

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Book Service", desc: "Choose your service and schedule a time via our website.", color: "border-blue-500" },
              { step: "02", title: "Confirmation", desc: "We confirm your slot and assign a professional team.", color: "border-purple-500" },
              { step: "03", title: "Deep Clean", desc: "Our team arrives with machinery and eco-friendly solutions.", color: "border-blue-500" },
              { step: "04", title: "Relax", desc: "Inspect the work and enjoy your sparkling clean space.", color: "border-orange-500" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`bg-white p-8 rounded-2xl shadow-lg border-t-4 ${item.color} relative overflow-hidden group`}
              >
                <span className="absolute top-0 right-0 text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-100 to-slate-200 -mr-4 -mt-4 z-0 group-hover:from-slate-200 group-hover:to-slate-300 transition-colors">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Visual Proof" title="See The Difference Yourself" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPARISON_DATA.map(item => (
              <BeforeAfterCard key={item.id} label={item.label} before={item.before} after={item.after} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="text-4xl font-heading font-bold text-slate-900 mt-2">Top Rated Services</h2>
            </div>
            <button onClick={() => navigate('services')} className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
              View All Services <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES_DATA.filter(s => s.popular).slice(0, 3).map(service => (
              <div key={service.id} className="group rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-white" onClick={() => navigate('services')}>
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 uppercase shadow-md">Popular</div>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-6 bg-white relative">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-blue-600 font-bold text-lg mb-4">{service.priceDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 2).map((f, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">{f}</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-400 group-hover:text-primary-500 flex items-center gap-1 transition-colors">
                    Book Now <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Graphic / Info */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SectionTitle subtitle="Transparent Pricing" title="No Hidden Charges" />
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We believe in complete transparency. Our prices are competitive and reflect the high quality of service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Apartments */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3 mx-auto">
                  <Home size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-blue-900">Apartments</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">1 BHK Unfurnished</h4>
                    <p className="text-xs text-slate-500">Machine Scrubbing</p>
                  </div>
                  <p className="text-blue-600 font-bold text-lg">₹3498</p>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">1 BHK Furnished</h4>
                    <p className="text-xs text-slate-500">Deep Cleaning</p>
                  </div>
                  <p className="text-blue-600 font-bold text-lg">₹3998</p>
                </div>
              </div>
            </div>

            {/* Column 2: Villas */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow overflow-hidden relative">
              <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3 mx-auto">
                  <Building2 size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-blue-900">Villas</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Unfurnished</h4>
                    <p className="text-xs text-slate-500">Per Square Foot</p>
                  </div>
                  <p className="text-blue-600 font-bold text-lg">₹5 / sqft</p>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Furnished</h4>
                    <p className="text-xs text-slate-500">Per Square Foot</p>
                  </div>
                  <p className="text-blue-600 font-bold text-lg">₹6 / sqft</p>
                </div>
              </div>
            </div>

            {/* Column 3: Specialty */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-purple-50 p-6 text-center border-b border-purple-100">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3 mx-auto">
                  <Droplets size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-purple-900">Specialty</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Bathroom</h4>
                    <p className="text-xs text-slate-500">Deep Descaling</p>
                  </div>
                  <p className="text-blue-600 font-bold text-lg">₹499</p>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Sofa Washing</h4>
                    <p className="text-xs text-slate-500">Shampoo & Vacuum</p>
                  </div>
                  <p className="text-blue-600 font-bold text-lg">₹150 / seat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-red-50 rounded-3xl p-8 md:p-12 border border-red-100 shadow-inner">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">What's Excluded</h2>
              <p className="text-slate-600 mt-2">To ensure transparency, here is what is <span className="font-bold text-red-500">NOT</span> included.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-y-4 gap-x-12">
              {[
                "Emptying & cleaning of cupboard's interior",
                "Glue & paint stain removal",
                "Terrace & inaccessible areas cleaning",
                "Restoration, leakage fixes, painting/touch-ups",
                "Wet wiping of walls or ceiling",
                "Chandelier, false ceiling cleaning, etc."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-red-100 text-red-500 rounded-full p-1 mt-0.5 shrink-0">
                    <X size={16} />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-blue mb-6">Ready for a Spotless Home?</h2>
          <p className="text-blue-300 text-xl mb-8 max-w-2xl mx-auto font-semibold">Book your deep cleaning service today in Bengaluru. Limited slots available.</p>
          <Button
            variant="white"
            onClick={() => navigate('services')}
            className="mx-auto text-base md:text-xl px-6 py-3 md:px-10 md:py-4 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 font-extrabold tracking-wide uppercase bg-gradient-to-r from-white to-blue-50 text-blue-700 hover:text-blue-800 animate-bounce"
          >
            Explore Services
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomeView;