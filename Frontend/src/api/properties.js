const API_BASE_URL = "http://127.0.0.1:8000";

function normalizeProperty(property) {
  return {
    ...property,
    propertyType: property.property_type,
    listingType: property.listing_type,
    image: property.image_url,
  };
}

export async function getProperties() {
  const response = await fetch(
    `${API_BASE_URL}/api/properties`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load properties: ${response.status}`
    );
  }

  const properties = await response.json();

  return properties.map(normalizeProperty);
}

export async function getPropertyBySlug(slug) {
  const response = await fetch(
    `${API_BASE_URL}/api/properties/${encodeURIComponent(slug)}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to load property: ${response.status}`
    );
  }

  const property = await response.json();

  return normalizeProperty(property);
}