export const properties = [
  {
    id: 1,
    slug: "four-bedroom-house-karen",
    title: "Four Bedroom House",
    location: "Karen, Nairobi",
    propertyType: "House",
    listingType: "FOR_SALE",
    status: "AVAILABLE",
    price: 32000000,
    bedrooms: 4,
    bathrooms: 4,
    size: 320,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    featured: true,
    description:
      "A spacious four bedroom home in Karen offering comfortable family living, generous indoor spaces and a peaceful residential setting.",
    features: [
      "Four bedrooms",
      "Four bathrooms",
      "Spacious living area",
      "Private garden",
      "Parking",
      "Secure compound",
    ],
  },

  {
    id: 2,
    slug: "three-bedroom-apartment-kilimani",
    title: "Three Bedroom Apartment",
    location: "Kilimani, Nairobi",
    propertyType: "Apartment",
    listingType: "FOR_SALE",
    status: "AVAILABLE",
    price: 18500000,
    bedrooms: 3,
    bathrooms: 3,
    size: 185,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    featured: false,
    description:
      "A modern three bedroom apartment located in Kilimani with spacious interiors and convenient access to the surrounding business and lifestyle amenities.",
    features: [
      "Three bedrooms",
      "Three bathrooms",
      "Modern kitchen",
      "Parking",
      "Security",
      "Spacious living area",
    ],
  },

  {
    id: 3,
    slug: "two-bedroom-apartment-westlands",
    title: "Two Bedroom Apartment",
    location: "Westlands, Nairobi",
    propertyType: "Apartment",
    listingType: "FOR_RENT",
    status: "AVAILABLE",
    price: 150000,
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    featured: true,
    description:
      "A contemporary two bedroom apartment available for rent in Westlands, offering convenient city living and well-designed interior spaces.",
    features: [
      "Two bedrooms",
      "Two bathrooms",
      "Modern kitchen",
      "Parking",
      "Security",
      "Convenient location",
    ],
  },

  {
    id: 4,
    slug: "commercial-office-upper-hill",
    title: "Commercial Office Space",
    location: "Upper Hill, Nairobi",
    propertyType: "Commercial",
    listingType: "FOR_RENT",
    status: "AVAILABLE",
    price: 280000,
    bedrooms: null,
    bathrooms: 2,
    size: 250,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    featured: false,
    description:
      "A professional commercial office space in Upper Hill suitable for businesses looking for a convenient and established Nairobi business location.",
    features: [
      "250 m² office space",
      "Two bathrooms",
      "Reception area",
      "Parking",
      "Security",
      "Business location",
    ],
  },

  {
    id: 5,
    slug: "family-home-runda",
    title: "Five Bedroom Family Home",
    location: "Runda, Nairobi",
    propertyType: "House",
    listingType: "FOR_SALE",
    status: "AVAILABLE",
    price: 68000000,
    bedrooms: 5,
    bathrooms: 5,
    size: 480,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85",
    featured: false,
    description:
      "A large five bedroom family residence in Runda with generous living spaces and a layout suited to comfortable residential living.",
    features: [
      "Five bedrooms",
      "Five bathrooms",
      "Large living spaces",
      "Private garden",
      "Parking",
      "Secure compound",
    ],
  },

  {
    id: 6,
    slug: "three-bedroom-townhouse-kiambu-road",
    title: "Three Bedroom Townhouse",
    location: "Kiambu Road",
    propertyType: "Townhouse",
    listingType: "FOR_RENT",
    status: "AVAILABLE",
    price: 120000,
    bedrooms: 3,
    bathrooms: 3,
    size: 190,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
    featured: false,
    description:
      "A three bedroom townhouse available for rent along Kiambu Road, providing practical family accommodation in a convenient residential area.",
    features: [
      "Three bedrooms",
      "Three bathrooms",
      "Living and dining area",
      "Parking",
      "Security",
      "Family-friendly setting",
    ],
  },
];

export function formatPropertyPrice(property) {
  const formatted = new Intl.NumberFormat("en-KE").format(
    property.price
  );

  if (property.listingType === "FOR_RENT") {
    return `KES ${formatted} / month`;
  }

  return `KES ${formatted}`;
}