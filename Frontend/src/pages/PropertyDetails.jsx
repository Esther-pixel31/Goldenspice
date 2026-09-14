import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Building2,
  CheckCircle2,
} from "lucide-react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ContactModal from "../components/ContactModal.jsx";

import {
  properties,
  formatPropertyPrice,
} from "../data/properties.js";

const C = {
  navy: "#0B2043",
  navyDark: "#061A35",
  gold: "#C99A4A",
  light: "#F6F8FB",
  text: "#1B2430",
  sub: "#5B6472",
};

export default function PropertyDetails() {
  const { slug } = useParams();
  const [contactOpen, setContactOpen] = useState(false);

  const property = properties.find(
    (item) => item.slug === slug
  );

  // PROPERTY NOT FOUND
  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header
          onContactClick={() => setContactOpen(true)}
        />

        <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <Building2
            size={48}
            strokeWidth={1.5}
            style={{ color: C.gold }}
          />

          <h1
            className="mt-6 text-3xl font-bold"
            style={{ color: C.navy }}
          >
            Property Not Found
          </h1>

          <p
            className="mt-3 max-w-lg text-sm leading-7"
            style={{ color: C.sub }}
          >
            This property may no longer be available or the
            listing address may be incorrect.
          </p>

          <Link
            to="/property-listings"
            className="mt-7 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider"
            style={{
              background: C.gold,
              color: C.navy,
            }}
          >
            <ArrowLeft size={15} />
            Back to Properties
          </Link>
        </main>

        <Footer
          onContactClick={() => setContactOpen(true)}
        />

        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </div>
    );
  }

  const isAvailable = property.status === "AVAILABLE";

  return (
    <div
      className="min-h-screen bg-white"
      style={{ color: C.text }}
    >
      <Header
        onContactClick={() => setContactOpen(true)}
      />

      {/* PROPERTY HEADING */}
      <section style={{ background: C.navyDark }}>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Link
            to="/property-listings"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#C8D0DC] transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Property Listings
          </Link>

          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <span
                  className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: C.gold,
                    color: C.navy,
                  }}
                >
                  {property.listingType === "FOR_SALE"
                    ? "For Sale"
                    : "For Rent"}
                </span>

                {property.featured && (
                  <span className="bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white md:text-5xl">
                {property.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-[#CBD3DE]">
                <MapPin
                  size={16}
                  style={{ color: C.gold }}
                />

                {property.location}
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#B9C3D1]">
                Property Price
              </p>

              <p
                className="mt-2 text-2xl font-bold md:text-3xl"
                style={{ color: C.gold }}
              >
                {formatPropertyPrice(property)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN PROPERTY IMAGE */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="relative h-[320px] overflow-hidden md:h-[500px] lg:h-[600px]">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover"
          />

          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#061A35]/65">
              <span className="bg-white px-8 py-4 text-xl font-bold uppercase tracking-wider text-[#0B2043]">
                {property.status}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* PROPERTY CONTENT */}
      <main className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1fr_360px] lg:px-8">

        {/* LEFT COLUMN */}
        <div>

          {/* PROPERTY OVERVIEW */}
          <section>
            <p
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Property Details
            </p>

            <h2
              className="mt-2 text-3xl font-bold"
              style={{ color: C.navy }}
            >
              Property Overview
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

              {/* BEDROOMS */}
              {property.bedrooms && (
                <div
                  className="border border-[#E2E6EB] p-5"
                  style={{ background: C.light }}
                >
                  <BedDouble
                    size={22}
                    style={{ color: C.gold }}
                  />

                  <p className="mt-4 text-xs text-[#6B7280]">
                    Bedrooms
                  </p>

                  <p
                    className="mt-1 font-bold"
                    style={{ color: C.navy }}
                  >
                    {property.bedrooms}
                  </p>
                </div>
              )}

              {/* BATHROOMS */}
              {property.bathrooms && (
                <div
                  className="border border-[#E2E6EB] p-5"
                  style={{ background: C.light }}
                >
                  <Bath
                    size={22}
                    style={{ color: C.gold }}
                  />

                  <p className="mt-4 text-xs text-[#6B7280]">
                    Bathrooms
                  </p>

                  <p
                    className="mt-1 font-bold"
                    style={{ color: C.navy }}
                  >
                    {property.bathrooms}
                  </p>
                </div>
              )}

              {/* SIZE */}
              <div
                className="border border-[#E2E6EB] p-5"
                style={{ background: C.light }}
              >
                <Maximize2
                  size={22}
                  style={{ color: C.gold }}
                />

                <p className="mt-4 text-xs text-[#6B7280]">
                  Property Size
                </p>

                <p
                  className="mt-1 font-bold"
                  style={{ color: C.navy }}
                >
                  {property.size} m²
                </p>
              </div>

              {/* PROPERTY TYPE */}
              <div
                className="border border-[#E2E6EB] p-5"
                style={{ background: C.light }}
              >
                <Building2
                  size={22}
                  style={{ color: C.gold }}
                />

                <p className="mt-4 text-xs text-[#6B7280]">
                  Property Type
                </p>

                <p
                  className="mt-1 font-bold"
                  style={{ color: C.navy }}
                >
                  {property.propertyType}
                </p>
              </div>
            </div>
          </section>

          {/* DESCRIPTION */}
          <section className="mt-14">
            <h2
              className="text-2xl font-bold"
              style={{ color: C.navy }}
            >
              About This Property
            </h2>

            <div
              className="mt-4 h-1 w-12"
              style={{ background: C.gold }}
            />

            <p
              className="mt-6 max-w-3xl leading-8"
              style={{ color: C.sub }}
            >
              {property.description}
            </p>
          </section>

          {/* FEATURES */}
          <section className="mt-14">
            <h2
              className="text-2xl font-bold"
              style={{ color: C.navy }}
            >
              Features & Amenities
            </h2>

            <div
              className="mt-4 h-1 w-12"
              style={{ background: C.gold }}
            />

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {property.features?.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: C.sub }}
                >
                  <CheckCircle2
                    size={18}
                    style={{ color: C.gold }}
                  />

                  {feature}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - ENQUIRY */}
        <aside>
          <div
            className="sticky top-24 p-7"
            style={{ background: C.navy }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Property Enquiry
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              Interested in this property?
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#C5CEDA]">
              Contact Goldenspice for more information,
              availability or to arrange a property viewing.
            </p>

            <div className="mt-6 border-y border-white/10 py-5">
              <p className="text-xs text-[#AEB9C8]">
                Property
              </p>

              <p className="mt-1 font-bold text-white">
                {property.title}
              </p>

              <p className="mt-1 text-sm text-[#C5CEDA]">
                {property.location}
              </p>
            </div>

            {isAvailable ? (
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
                style={{
                  background: C.gold,
                  color: C.navy,
                }}
              >
                Enquire Now
                <ArrowRight size={15} />
              </button>
            ) : (
              <div className="mt-6 bg-white/10 px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-white">
                Property {property.status}
              </div>
            )}

            <Link
              to="/property-listings"
              className="mt-4 flex w-full items-center justify-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
            >
              View Other Properties
            </Link>
          </div>
        </aside>
      </main>

      <Footer
        onContactClick={() => setContactOpen(true)}
      />

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}