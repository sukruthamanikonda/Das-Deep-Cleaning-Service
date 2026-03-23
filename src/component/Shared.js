import React from 'react';

export function Button({ onClick, children, variant = 'primary', className = '' }) {
    const baseClass = 'px-6 py-3 rounded-lg font-bold transition-all duration-300';
    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl',
        outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
    };
    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

export function SectionTitle({ children, subtitle = '' }) {
    return (
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{children}</h2>
            {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
        </div>
    );
}

export function BeforeAfterCard({ label, before, after }) {
    const [sliderPos, setSliderPos] = React.useState(50);

    return (
        <div className="relative w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-gray-100">
            <div className="relative w-full h-64 md:h-72 lg:h-64">
                {/* After image is base */}
                <img src={after} alt={`${label} After`} className="absolute inset-0 w-full h-full object-cover" />

                {/* Before image clipped by slider width */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                    <img src={before} alt={`${label} Before`} className="w-full h-full object-cover" />
                </div>

                {/* Vertical divider / handle */}
                <div
                    className="absolute top-0 bottom-0 z-20"
                    style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="h-full w-0.5 bg-white/80" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg -mt-2">
                        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </div>

                {/* Invisible range control on top for interactions */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute left-0 right-0 bottom-0 w-full opacity-0 h-full cursor-col-resize z-30"
                    aria-label="Before and after slider"
                />
            </div>

            {/* Labels and caption */}
            <div className="absolute top-3 left-3 bg-white/90 text-gray-800 px-3 py-1 rounded font-bold text-xs uppercase tracking-wide">Before</div>
            <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-3 py-1 rounded font-bold text-xs uppercase tracking-wide">After</div>
            {label && <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg font-semibold text-sm">{label}</div>}
        </div>
    );
}
