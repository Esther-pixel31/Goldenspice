import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowRight,
  Building2,
} from "lucide-react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ContactModal from "../components/ContactModal.jsx";

import { getProperties } from "../api/properties";
import { formatPropertyPrice } from "../utils/property.js";


const C = {
  navy: "#0B2043",
  navyDark: "#061A35",
  gold: "#C99A4A",
  light: "#F6F8FB",
  text: "#1B2430",
  sub: "#5B6472",
};


export default function PropertyListings() {
  const [contactOpen, setContactOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState("ALL");
  const [propertyType, setPropertyType] = useState("ALL");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Load properties from FastAPI.
  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        setError("");

        const data = await getProperties();

        setProperties(data);
      } catch (err) {
        console.error(
          "Failed to load properties:",
          err
        );

        setError(
          "We could not load the property listings."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);


  // Filter the properties already loaded from the API.
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (property.status !== "AVAILABLE") {
        return false;
      }

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        property.title
          .toLowerCase()
          .includes(query) ||
        property.location
          .toLowerCase()
          .includes(query) ||
        property.propertyType
          .toLowerCase()
          .includes(query);

      const matchesListingType =
        listingType === "ALL" ||
        property.listingType === listingType;

      const matchesPropertyType =
        propertyType === "ALL" ||
        property.propertyType === propertyType;

      return (
        matchesSearch &&
        matchesListingType &&
        matchesPropertyType
      );
    });
  }, [
    properties,
    search,
    listingType,
    propertyType,
  ]);


  return (
    <div
      className="min-h-screen bg-white"
      style={{ color: C.text }}
    >
      <Header
        onContactClick={() => setContactOpen(true)}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: C.navyDark }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white" />
          <div className="absolute right-24 top-20 h-64 w-64 rounded-full border border-white" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <p
            className="mb-4 text-sm font-bold uppercase tracking-[0.2em]"
            style={{ color: C.gold }}
          >
            Property Listings
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Find a Property
            <span
              className="block"
              style={{ color: C.gold }}
            >
              That Fits Your Needs.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#CED5DF] md:text-lg">
            Explore properties available for sale and rent
            through Goldenspice.
          </p>
        </div>
      </section>


      {/* SEARCH / FILTERS */}
      <section
        className="border-b border-[#E3E7EC]"
        style={{ background: C.light }}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">

            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: C.gold }}
              />

              <input
                type="text"
                placeholder="Search by property or location..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-[#DDE2E8] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#C99A4A]"
              />
            </div>


            {/* LISTING TYPE */}
            <select
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value)
              }
              className="border border-[#DDE2E8] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#C99A4A]"
            >
              <option value="ALL">
                Sale & Rent
              </option>

              <option value="FOR_SALE">
                For Sale
              </option>

              <option value="FOR_RENT">
                For Rent
              </option>
            </select>


            {/* PROPERTY TYPE */}
            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
              className="border border-[#DDE2E8] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#C99A4A]"
            >
              <option value="ALL">
                All Property Types
              </option>

              <option value="House">
                House
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Townhouse">
                Townhouse
              </option>

              <option value="Commercial">
                Commercial
              </option>
            </select>

          </div>
        </div>
      </section>


      {/* LISTINGS */}
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* HEADING / RESULT COUNT */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Available Properties
            </p>

            <h2
              className="text-3xl font-bold"
              style={{ color: C.navy }}
            >
              Properties For Sale & Rent
            </h2>
          </div>

          <p
            className="text-sm"
            style={{ color: C.sub }}
          >
            {loading
              ? "Loading..."
              : `${filteredProperties.length} ${
                  filteredProperties.length === 1
                    ? "property"
                    : "properties"
                } found`}
          </p>
        </div>


        {/* LOADING */}
        {loading ? (
          <div
            className="flex min-h-72 items-center justify-center border border-[#E3E7EC] px-6 text-center"
            style={{ background: C.light }}
          >
            <p
              className="text-sm"
              style={{ color: C.sub }}
            >
              Loading properties...
            </p>
          </div>


        ) : error ? (

          /* API ERROR */
          <div
            className="flex min-h-72 flex-col items-center justify-center border border-[#E3E7EC] px-6 text-center"
            style={{ background: C.light }}
          >
            <Building2
              size={38}
              strokeWidth={1.5}
              style={{ color: C.gold }}
            />

            <h3
              className="mt-5 text-xl font-bold"
              style={{ color: C.navy }}
            >
              Unable to load properties
            </h3>

            <p
              className="mt-2 max-w-md text-sm leading-6"
              style={{ color: C.sub }}
            >
              {error}
            </p>
          </div>


        ) : filteredProperties.length > 0 ? (

          /* PROPERTY GRID */
          <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">

            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="group overflow-hidden border border-[#E3E7EC] bg-white"
              >

                {/* PROPERTY IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{ background: C.light }}
                    >
                      <Building2
                        size={44}
                        strokeWidth={1.4}
                        style={{ color: C.gold }}
                      />
                    </div>
                  )}

                  <div
                    className="absolute left-4 top-4 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      background: C.gold,
                      color: C.navy,
                    }}
                  >
                    {property.listingType === "FOR_SALE"
                      ? "For Sale"
                      : "For Rent"}
                  </div>

                  {property.featured && (
                    <div
                      className="absolute right-4 top-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{
                        background: C.navy,
                      }}
                    >
                      Featured
                    </div>
                  )}
                </div>


                {/* PROPERTY INFORMATION */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-[#6B7280]">
                    <MapPin
                      size={14}
                      style={{ color: C.gold }}
                    />

                    {property.location}
                  </div>

                  <h3
                    className="text-xl font-bold"
                    style={{ color: C.navy }}
                  >
                    {property.title}
                  </h3>

                  <p
                    className="mt-3 text-lg font-bold"
                    style={{ color: C.gold }}
                  >
                    {formatPropertyPrice(property)}
                  </p>


                  {/* PROPERTY SPECS */}
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-y border-[#ECEFF3] py-4 text-xs text-[#5B6472]">

                    {property.bedrooms != null && (
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} />

                        <span>
                          {property.bedrooms} Beds
                        </span>
                      </div>
                    )}

                    {property.bathrooms != null && (
                      <div className="flex items-center gap-2">
                        <Bath size={16} />

                        <span>
                          {property.bathrooms} Baths
                        </span>
                      </div>
                    )}

                    {property.size != null && (
                      <div className="flex items-center gap-2">
                        <Maximize2 size={15} />

                        <span>
                          {property.size} m²
                        </span>
                      </div>
                    )}

                  </div>


                  {/* VIEW DETAILS */}
                  <Link
                    to={`/property-listings/${property.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
                    style={{ color: C.navy }}
                  >
                    View Property

                    <ArrowRight
                      size={15}
                      style={{ color: C.gold }}
                    />
                  </Link>
                </div>
              </article>
            ))}

          </div>

        ) : (

        <div
          className="flex min-h-72 flex-col items-center justify-center border border-[#E3E7EC] px-6 text-center"
            style={{ background: C.light }}
          >
            <Building2
              size={38}
              strokeWidth={1.5}
              style={{ color: C.gold }}
            />

            <h3
              className="mt-5 text-xl font-bold"
              style={{ color: C.navy }}
            >
              No properties found
            </h3>

            <p
              className="mt-2 max-w-md text-sm leading-6"
              style={{ color: C.sub }}
            >
              Try changing your search or filters to view
              other available properties.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setListingType("ALL");
                setPropertyType("ALL");
              }}
              className="mt-5 text-xs font-bold uppercase tracking-wider"
              style={{ color: C.gold }}
            >
              Clear Filters
            </button>
          </div>
        )}

      </main>


      {/* PROPERTY ENQUIRY CTA */}
      <section
        className="px-6 py-16 text-center"
        style={{ background: C.navy }}
      >
        <p
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: C.gold }}
        >
          Property Enquiries
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Looking for a particular property?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#C7CEDA]">
          Talk to Goldenspice and let us know what type of
          property you are looking for.
        </p>

        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="mt-7 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
          style={{
            background: C.gold,
            color: C.navy,
          }}
        >
          Contact Us

          <ArrowRight size={16} />
        </button>
      </section>


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