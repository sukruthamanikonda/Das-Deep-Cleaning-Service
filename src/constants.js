import KitchenBefore from "./images/KitchenBefore.jpg";
import KitchenAfter from "./images/kitchenAfter.jpg";

import BathroomBefore from "./images/BathroomBefore.jpg";
import BathroomAfter from "./images/BathroomAfter.jpg";

import WindowsBefore from "./images/windowsBefore.jpg";
import WindowsAfter from "./images/windowsAfter.jpg";

import HouseBefore from "./images/houseBefore.jpg";
import HouseAfter from "./images/houseAfter.jpg";

import SofaBefore from "./images/sofaBefore.jpg";
import SofaAfter from "./images/sofaAfter.jpg";

import CarpetBefore from "./images/carpetBefore.jpg";
import CarpetAfter from "./images/carpetAfter.jpg";

export const COMPANY_INFO = {
  name: "Das Deep Cleaning Service",
  phone: "+91 9101043385",
  address: "10/1, 1st cross, 1st main road, kamla nagar market, Shakti Ganapathi nagar, Basaveswara nagar, Bangalore-560079",
  city: "Bengaluru",
  tagline: "Experience the True Meaning of Clean.",
  email: "contact@dasdeepcleaning.in"
};

export const CONTACT_PHONE = COMPANY_INFO.phone;

export const EXCLUDED_ITEMS = [
  "Emptying & cleaning of cupboard's interior",
  "Glue & paint stain removal",
  "Terrace & inaccessible areas cleaning",
  "Restoration, leakage fixes, painting/touch-ups",
  "Wet wiping of walls or ceiling",
  "Chandelier, false ceiling cleaning, etc."
];

export const COMPARISON_DATA = [
  {
    id: 1,
    label: "Kitchen Deep Cleaning",
    before: KitchenBefore,
    after: KitchenAfter
  },
  {
    id: 2,
    label: "Bathroom Descaling",
    before: BathroomBefore,
    after: BathroomAfter
  },
  {
    id: 3,
    label: "Window Polishing",
    before: WindowsBefore,
    after: WindowsAfter
  },
  {
    id: 4,
    label: "House Deep Cleaning",
    before: HouseBefore,
    after: HouseAfter
  },
  {
    id: 5,
    label: "Sofa Cleaning",
    before: SofaBefore,
    after: SofaAfter
  },
  {
    id: 6,
    label: "Commercial Floor Cleaning",
    before: CarpetBefore,
    after: CarpetAfter
  }
];

export const HERO_IMAGE = "https://img.freepik.com/premium-photo/professional-cleaning-concept-banner-with-soft-focus-blurred-background_1164591-5943.jpg";

export const SERVICES_DATA = [
  // Home Unfurnished
  {
    id: 'h1-u',
    title: '1 BHK Unfurnished Deep Clean',
    priceDescription: 'Starts From ₹3498',
    basePrice: 3498,
    category: 'Home Cleaning',
    propertyType: 'home',
    bhkCategory: '1 BHK Unfurnished',
    image: 'https://tse3.mm.bing.net/th/id/OIP.rboG_PWX2yyyWY-_FeaxawHaFj?w=640&h=480&rs=1&pid=ImgDetMain&o=7&rm=3',
    features: [
      'Extensive deep cleaning of all rooms',
      'Dry dusting: Switch boards, AC, Fans',
      'Wet wiping: Glass partitions, Mirrors',
      'Machine scrubbing & Hygiene Check'
    ]
  },
  {
    id: 'h2-u',
    title: '2 BHK Unfurnished Deep Clean',
    priceDescription: 'Starts From ₹4499',
    basePrice: 4499,
    category: 'Home Cleaning',
    propertyType: 'home',
    bhkCategory: '2 BHK Unfurnished',
    image: 'https://tse1.mm.bing.net/th/id/OIP.2kZ_XbB86hEWGKiXzf3LNAHaFj?w=1024&h=768&rs=1&pid=ImgDetMain&o=7&rm=3',
    features: [
      'Extensive deep cleaning of all rooms',
      'Dry dusting: Switch boards, AC, Fans',
      'Wet wiping: Glass partitions, Mirrors',
      'Machine scrubbing & Hygiene Check'
    ]
  },
  {
    id: 'h3-u',
    title: '3 BHK Unfurnished Deep Clean',
    priceDescription: 'Starts From ₹5498',
    basePrice: 5498,
    category: 'Home Cleaning',
    propertyType: 'home',
    bhkCategory: '3 BHK Unfurnished',
    image: 'https://tse2.mm.bing.net/th/id/OIP.gkS3QdViSh_XlYsTRVn4qQHaFh?rs=1&pid=ImgDetMain&o=7&rm=3',
    popular: true,
    features: [
      'Extensive deep cleaning of all rooms',
      'Dry dusting: Switch boards, AC, Fans',
      'Wet wiping: Glass partitions, Mirrors',
      'Machine scrubbing & Hygiene Check'
    ]
  },
  // Home Furnished
  {
    id: 'h1-f',
    title: '1 BHK Furnished Deep Clean',
    priceDescription: 'Starts From ₹3998',
    basePrice: 3998,
    category: 'Home Cleaning',
    propertyType: 'home',
    bhkCategory: '1 BHK Furnished',
    image: 'https://imagecdn.99acres.com/media1/28374/19/567499507M-1738905300987.jpg',
    features: [
      'Dry dusting: Ceiling, Walls, Switch boards',
      'Wet wiping: Windows, Doors, Cabinet exterior',
      'Machine scrubbing: Floor cleaning',
      'Dry Vaccuming: Sofa, Carpet, Mattress'
    ]
  },
  {
    id: 'h2-f',
    title: '2 BHK Furnished Deep Clean',
    priceDescription: 'Starts From ₹4999',
    basePrice: 4999,
    category: 'Home Cleaning',
    propertyType: 'home',
    bhkCategory: '2 BHK Furnished',
    image: 'https://i.ytimg.com/vi/3rFwPqlIzlE/maxresdefault.jpg',
    popular: true,
    features: [
      'Dry dusting: Ceiling, Walls, Switch boards',
      'Wet wiping: Windows, Doors, Cabinet exterior',
      'Machine scrubbing: Floor cleaning',
      'Dry Vaccuming: Sofa, Carpet, Mattress'
    ]
  },
  {
    id: 'h3-f',
    title: '3 BHK Furnished Deep Clean',
    priceDescription: 'Starts From ₹5898',
    basePrice: 5898,
    category: 'Home Cleaning',
    propertyType: 'home',
    bhkCategory: '3 BHK Furnished',
    image: 'https://images.livspace-cdn.com/w:1440/q:100/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/false-ceiling-homes-pilot-1660820004-eRVFP/hometour-1660820029-cuOHh/23-1661176709-AE0YS/3-min-1661176724-FkfHK.jpg',
    features: [
      'Dry dusting: Ceiling, Walls, Switch boards',
      'Wet wiping: Windows, Doors, Cabinet exterior',
      'Machine scrubbing: Floor cleaning',
      'Dry Vaccuming: Sofa, Carpet, Mattress'
    ]
  },
  // Villas
  {
    id: 'v-u',
    title: 'Villa Unfurnished Deep Clean',
    priceDescription: 'Starts From ₹5 per Sqft',
    category: 'Villa Cleaning',
    propertyType: 'villa',
    bhkCategory: 'Villa Unfurnished',
    image: 'https://tse2.mm.bing.net/th/id/OIP.UZ04zQ1JL2aKFD_HFLlyDAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    features: [
      'Charged per square foot',
      'Extensive deep cleaning of all rooms',
      'Dry dusting: Switch boards, AC, Fans',
      'Wet wiping: Glass partitions, Mirrors',
      'Machine scrubbing & Hygiene Check'
    ]
  },
  {
    id: 'v-f',
    title: 'Villa Furnished Deep Clean',
    priceDescription: 'Starts From ₹6 per Sqft',
    category: 'Villa Cleaning',
    propertyType: 'villa',
    bhkCategory: 'Villa Furnished',
    image: 'https://houseinhanoi.vn/wp-content/uploads/2021/10/330m2-Huge-Villa-for-rent-in-Long-Bien-District-Hano-16-scaled.jpg',
    features: [
      'Dry dusting: Ceiling, Walls, Switch boards',
      'Wet wiping: Windows, Doors, Cabinet exterior',
      'Machine scrubbing: Floor cleaning',
      'Dry Vaccuming: Sofa, Carpet, Mattress'
    ]
  },
  // Kitchen
  {
    id: 'k-o-nc',
    title: 'Occupied Kitchen (No Chimney)',
    priceDescription: 'Starts From ₹1700',
    basePrice: 1700,
    category: 'Kitchen',
    propertyType: 'kitchen',
    bhkCategory: 'Occupied Kitchen (No Chimney)',
    image: 'https://hometriangle.com/blogs/content/images/2023/10/deep-house-cleaning----hometriangle-blog.jpg',
    features: [
      'Stain removal: Tiles, Stove, Slab, Sink',
      'Dry dusting: Ceiling, Walls, Corners',
      'Wet wiping: Cabinet exterior, Window'
    ]
  },
  {
    id: 'k-o-c',
    title: 'Occupied Kitchen + Chimney',
    priceDescription: 'Starts From ₹1998',
    basePrice: 1998,
    category: 'Kitchen',
    propertyType: 'kitchen',
    bhkCategory: 'Occupied Kitchen + Chimney',
    image: 'https://mastercleaners.com.au/wp-content/uploads/2020/04/bigstock-Sanitary-Day-In-The-Restaurant-316095811.jpg',
    features: [
      'Stain removal: Exhaust, Fixtures, Stove',
      'Dry dusting: Vents, Cabinet tops',
      'Wet wiping: Full degreasing',
      'Full kitchen deep clean'
    ]
  },
  {
    id: 'k-e-nc',
    title: 'Empty Kitchen (No Chimney)',
    priceDescription: 'Starts From ₹1249',
    basePrice: 1249,
    category: 'Kitchen',
    propertyType: 'kitchen',
    bhkCategory: 'Empty Kitchen (No Chimney)',
    image: 'https://crewcare.co.nz/admin_assets/blog/crewcare-cleaning-kitchen.jpg',
    features: [
      'Move-in/out special',
      'Deep tile scrubbing & Stain removal',
      'Wet wiping: Slabs, Sink, Windows'
    ]
  },
  {
    id: 'k-e-c',
    title: 'Empty Kitchen + Chimney',
    priceDescription: 'Starts From ₹1499',
    basePrice: 1499,
    category: 'Kitchen',
    propertyType: 'kitchen',
    bhkCategory: 'Empty Kitchen + Chimney',
    image: 'https://tse1.mm.bing.net/th/id/OIP.7HU5Zesbl9KKmXeJAd6InAHaB6?w=1656&h=428&rs=1&pid=ImgDetMain&o=7&rm=3',
    features: [
      'Chimney filter cleaning',
      'Stain removal: Oil & Grease',
      'Deep hygiene wash',
      'Dry dusting: Corners & Ceiling'
    ]
  },
  // Specialty
  {
    id: 'sp-bath',
    title: 'Bathroom Deep Clean',
    priceDescription: 'Starts From ₹499',
    basePrice: 499,
    category: 'Specialty Cleaning',
    propertyType: 'specality',
    bhkCategory: 'Bathroom Descaling',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    features: [
      'Stain removal: Shower, Taps, Toilet, Tiles',
      'Wet wiping: Geyser, Mirrors, Doors, Exhaust',
      'Deep descaling of Basin & Drain trap'
    ]
  },
  {
    id: 'sp-sofa',
    title: 'Sofa Washing',
    priceDescription: 'Starts From ₹150 per seat',
    category: 'Specialty Cleaning',
    propertyType: 'specality',
    bhkCategory: 'Sofa Cleaning',
    image: 'https://tse1.explicit.bing.net/th/id/OIP.53fN652Rb-6yJE6c155a_gHaEK?w=1536&h=864&rs=1&pid=ImgDetMain&o=7&rm=3',
    features: [
      'Dry vacuuming',
      'Wet shampooing',
      'Stain removal',
      'Fabric conditioning'
    ]
  },
  {
    id: 'sp-mattress',
    title: 'Mattress Washing',
    priceDescription: 'Starts From ₹498',
    basePrice: 498,
    category: 'Specialty Cleaning',
    propertyType: 'specality',
    bhkCategory: 'Mattress Washing',
    image: 'https://tse1.mm.bing.net/th/id/OIP.IpEQfJXhUIF4B88aSAyrjwHaEX?rs=1&pid=ImgDetMain&o=7&rm=3',
    features: ['Dust mite removal', 'Deep vacuum', 'Shampoo wash']
  },
  {
    id: 'sp-carpet',
    title: 'Carpet Washing',
    priceDescription: 'Starts From ₹17/sqft (min 25sqft)',
    category: 'Specialty Cleaning',
    propertyType: 'specality',
    bhkCategory: 'Carpet Washing',
    image: 'https://tse3.mm.bing.net/th/id/OIP.WGumtc9XldCbdmT8wpLYuwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    features: ['Up to 25 sqft: ₹17/sqft', 'Deep dust extraction', 'Stain Treatment']
  },
  {
    id: 'sp-chimney',
    title: 'Chimney Cleaning',
    priceDescription: 'Starts From ₹499',
    basePrice: 499,
    category: 'Kitchen',
    propertyType: 'kitchen',
    bhkCategory: 'Chimney Cleaning',
    image: '/images/chimney-cleaning.png',
    features: ['Oil and grease removal', 'Filter cleaning', 'Motor wiping']
  },
  {
    id: 'sp-win',
    title: 'Window Cleaning',
    priceDescription: 'Starts From ₹249',
    basePrice: 249,
    category: 'Specialty Cleaning',
    propertyType: 'specality',
    bhkCategory: 'Window Cleaning',
    image: 'https://allclean.london/wp-content/uploads/2024/03/extendable-window-cleaning-service-all-clean-london-residential.webp',
    features: ['Glass polishing', 'Track cleaning', 'Mesh dusting']
  },
  // Commercial
  {
    id: 'c-off',
    title: 'Commercial Office Cleaning',
    priceDescription: 'Starts From ₹6 per Sqft',
    category: 'Commercial',
    propertyType: 'commercial',
    bhkCategory: 'Office Cleaning',
    image: 'https://entretien5etoiles.com/wp-content/uploads/2023/04/clean-openspace-office.jpg',
    features: ['Workstation cleaning', 'Floor buffing', 'Common area cleaning']
  },
  {
    id: 'c-fl',
    title: 'Commercial Flooring Scrub',
    priceDescription: 'Starts From ₹3 to ₹7 per Sqft',
    category: 'Commercial',
    propertyType: 'commercial',
    bhkCategory: 'Flooring Scrub',
    image: 'https://tse3.mm.bing.net/th/id/OIP.h3lKxOvSt3DFl-WmzHiRLQHaGN?rs=1&pid=ImgDetMain&o=7&rm=3',
    features: ['Heavy machine scrubbing', 'Stain removal', 'Buffing']
  },
  {
    id: 'c-carp',
    title: 'Commercial Carpet Wash',
    priceDescription: 'Starts From ₹2 to ₹5 per Sqft',
    category: 'Commercial',
    propertyType: 'commercial',
    bhkCategory: 'Carpet Wash',
    image: 'https://tse2.mm.bing.net/th/id/OIP.06INng2R9Kl6RWwqMsZbAwHaEf?w=1024&h=622&rs=1&pid=ImgDetMain&o=7&rm=3',
    features: ['Large area extraction', 'Quick dry technology', 'Deodorizing']
  }
];

export const MOCK_REVIEWS = [
  { name: "Aditi Rao", rating: 5, text: "Excellent service! My 2BHK looks brand new. The team was professional and on time." },
  { name: "Rahul Sharma", rating: 4, text: "Very thorough cleaning of my kitchen chimney. Highly recommended for Bengaluru residents." },
  { name: "Priya K", rating: 5, text: "The villa cleaning service is worth every penny. They covered every corner." }
];