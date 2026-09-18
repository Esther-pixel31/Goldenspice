export function formatPropertyPrice(property) {
  const formatted = new Intl.NumberFormat("en-KE").format(
    property.price
  );

  if (property.listingType === "FOR_RENT") {
    return `KES ${formatted} / month`;
  }

  return `KES ${formatted}`;
}
