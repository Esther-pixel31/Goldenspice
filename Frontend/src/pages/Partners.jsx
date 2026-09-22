import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Handshake,
  Hotel,
  Megaphone,
  Plane,
  Users,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Header from "../components/Header.jsx";
import logo from "../assets/logo.png";

const C = {
  navy: "#0B2043",
  navyDark: "#061A35",
  gold: "#C99A4A",
  light: "#F6F8FB",
  text: "#1B2430",
  sub: "#5B6472",
};

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");


function resolvePartnerLogoUrl(logoUrl) {
  if (!logoUrl) {
    return "";
  }

  if (
    logoUrl.startsWith("http://") ||
    logoUrl.startsWith("https://")
  ) {
    return logoUrl;
  }

  return `${API_BASE_URL}${
    logoUrl.startsWith("/")
      ? logoUrl
      : `/${logoUrl}`
  }`;
}

export default function Partners() {
  const [partners, setPartners] =
    useState([]);

  const [partnersLoading, setPartnersLoading] =
    useState(true);

  const [partnersError, setPartnersError] =
    useState("");

  const partnershipAreas = [
    {
      icon: Building2,
      title: "Property",
      description:
        "Building relationships that support property management, property sales, listings and related property solutions.",
    },
    {
      icon: Hotel,
      title: "Hospitality",
      description:
        "Working alongside hospitality businesses and industry stakeholders to support stronger market presence and growth.",
    },
    {
      icon: Megaphone,
      title: "Digital & Marketing",
      description:
        "Collaborating around digital solutions, online visibility, marketing and brand growth.",
    },
    {
      icon: Plane,
      title: "Travel",
      description:
        "Developing relationships that support reliable and convenient business and leisure travel solutions.",
    },
  ];
      useEffect(() => {
      let cancelled = false;

      async function loadPartners() {
        setPartnersLoading(true);
        setPartnersError("");

        try {
          const response = await fetch(
            `${API_BASE_URL}/api/partners`
          );

          if (!response.ok) {
            throw new Error(
              "Unable to load partners."
            );
          }

          const data = await response.json();

          if (!cancelled) {
            setPartners(
              Array.isArray(data) ? data : []
            );
          }
        } catch (requestError) {
          if (!cancelled) {
            setPartnersError(
              requestError.message ||
                "Unable to load partners."
            );
          }
        } finally {
          if (!cancelled) {
            setPartnersLoading(false);
          }
        }
      }

      loadPartners();

      return () => {
        cancelled = true;
      };
    }, []);
  return (
    <div className="min-h-screen bg-white" style={{ color: C.text }}>

      {/* SHARED HEADER */}
      <Header />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: C.navyDark }}
      >
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full border border-white" />
          <div className="absolute right-20 top-20 h-[340px] w-[340px] rounded-full border border-white" />
        </div>

        <div className="relative mx-auto grid min-h-[500px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">

          {/* LEFT */}
          <div>
            <p
              className="mb-4 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: C.gold }}
            >
              Our Partners
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Stronger Together.
              <span className="block" style={{ color: C.gold }}>
                Growing Together.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#CED5DF] md:text-lg">
              We believe meaningful partnerships create stronger
              opportunities. Goldenspice builds professional relationships
              that support better solutions for our clients and the markets
              we serve.
            </p>

            <a
              href="#our-partners"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
              style={{ background: C.gold, color: C.navy }}
            >
              Meet Our Partners
              <ArrowRight size={16} />
            </a>
          </div>

          {/* RIGHT PANEL */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-md border border-white/10 bg-white/5 p-9 backdrop-blur-sm">

              <Handshake
                size={45}
                strokeWidth={1.4}
                style={{ color: C.gold }}
              />

              <h2 className="mt-6 text-2xl font-bold text-white">
                Partnerships That Create Possibilities
              </h2>

              <p className="mt-4 leading-7 text-[#C7CEDA]">
                We value relationships built around professionalism,
                collaboration, shared opportunities and long-term value.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Professional collaboration
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Shared opportunities
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Long-term relationships
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Partnership at Goldenspice
            </p>

            <h2
              className="max-w-xl text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: C.navy }}
            >
              Building Valuable Relationships Across Our Services
            </h2>
          </div>

          <div>
            <p
              className="text-base leading-8"
              style={{ color: C.sub }}
            >
              Our approach to partnership is centered on collaboration and
              creating opportunities that benefit our clients, partners and
              the businesses we work with. We value professional
              relationships that complement the services Goldenspice
              provides.
            </p>
          </div>

        </div>
      </section>

      {/* PARTNERS LOGO AREA */}
      <section
        id="our-partners"
        className="scroll-mt-24 py-20"
        style={{ background: C.light }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Our Network
            </p>

            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ color: C.navy }}
            >
              Our Partners
            </h2>

            <p
              className="mt-4 leading-7"
              style={{ color: C.sub }}
            >
              Goldenspice works through professional relationships across
              the sectors and services we support.
            </p>
          </div>

          {/*
            PARTNER LOGOS GO HERE.

            When you have the actual logos, we will replace these
            placeholders with the real partner logos.
          */}

            {partnersLoading ? (
            <div
              className="py-10 text-center"
              role="status"
            >
              <p
                className="text-sm font-semibold"
                style={{ color: C.sub }}
              >
                Loading partners...
              </p>
            </div>
          ) : partnersError ? (
            <div className="py-10 text-center">
              <p
                className="text-sm font-semibold"
                style={{ color: C.sub }}
              >
                Our partner network is currently
                unavailable. Please try again
                later.
              </p>
            </div>
          ) : partners.length === 0 ? (
            <div className="py-10 text-center">
              <Handshake
                size={32}
                className="mx-auto mb-4"
                style={{ color: C.gold }}
              />

              <p
                className="text-sm font-semibold"
                style={{ color: C.sub }}
              >
                Our partner network will be
                updated here soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => {
                const logo = (
                  <div className="flex min-h-[150px] items-center justify-center border border-[#E3E7EC] bg-white p-8 transition duration-200 hover:border-[#C99A4A] hover:shadow-sm">
                    <img
                      src={resolvePartnerLogoUrl(
                        partner.logo_url
                      )}
                      alt={`${partner.name} logo`}
                      className="max-h-[90px] max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                );

                if (partner.website_url) {
                  return (
                    <a
                      key={partner.id}
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${partner.name} website`}
                      className="block"
                    >
                      {logo}
                    </a>
                  );
                }

                return (
                  <div key={partner.id}>
                    {logo}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* PARTNERSHIP AREAS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-12 max-w-2xl">

          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
            style={{ color: C.gold }}
          >
            Where We Collaborate
          </p>

          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ color: C.navy }}
          >
            Partnerships Across Our Business
          </h2>

          <p
            className="mt-4 leading-7"
            style={{ color: C.sub }}
          >
            Our multi-service approach creates opportunities for
            collaboration across property, hospitality, digital marketing
            and travel.
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {partnershipAreas.map(
            ({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border border-[#E3E7EC] bg-white p-7"
              >
                <div
                  className="mb-6 flex h-13 w-13 items-center justify-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "#FBF3E7",
                  }}
                >
                  <Icon size={24} style={{ color: C.gold }} />
                </div>

                <h3
                  className="text-lg font-bold"
                  style={{ color: C.navy }}
                >
                  {title}
                </h3>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: C.sub }}
                >
                  {description}
                </p>
              </div>
            )
          )}

        </div>
      </section>

      {/* PARTNERSHIP VALUES */}
      <section className="py-20" style={{ background: C.navy }}>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              What We Value
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Partnerships Built on Shared Value
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="border border-white/10 p-8 text-center">

              <Users
                size={31}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <h3 className="mt-5 text-lg font-bold text-white">
                Collaboration
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Working together to identify opportunities and create
                practical solutions.
              </p>

            </div>

            <div className="border border-white/10 p-8 text-center">

              <Handshake
                size={31}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <h3 className="mt-5 text-lg font-bold text-white">
                Professional Relationships
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Building relationships based on professionalism,
                communication and mutual value.
              </p>

            </div>

            <div className="border border-white/10 p-8 text-center">

              <ArrowRight
                size={31}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <h3 className="mt-5 text-lg font-bold text-white">
                Growth
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Creating relationships that can support new opportunities
                and sustainable growth.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* BECOME A PARTNER */}
      <section className="px-6 py-20 text-center">

        <p
          className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
          style={{ color: C.gold }}
        >
          Partner With Goldenspice
        </p>

        <h2
          className="text-3xl font-bold md:text-4xl"
          style={{ color: C.navy }}
        >
          Interested in working together?
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl leading-7"
          style={{ color: C.sub }}
        >
          We welcome opportunities to build professional relationships
          that complement our services and create value.
        </p>

        <a
          href={`${import.meta.env.BASE_URL}#contact`}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
          style={{
            background: C.gold,
            color: C.navy,
          }}
        >
          Become a Partner
          <ArrowRight size={16} />
        </a>

      </section>

      {/* FOOTER */}
      <footer className="text-white" style={{ background: "#04152B" }}>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 lg:px-8">

          <div>
            <img
              src={logo}
              alt="Goldenspice"
              className="mb-4 h-12 w-auto"
            />

            <p className="max-w-sm text-sm leading-6 text-[#AEB7C4]">
              Your trusted partner in property management, digital
              marketing and travel services.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-sm text-[#AEB7C4]">

              <a href={import.meta.env.BASE_URL}>
                Home
              </a>

              <a
                href={`${import.meta.env.BASE_URL}property-management`}
              >
                Property Management
              </a>

              <a
                href={`${import.meta.env.BASE_URL}#property-listings`}
              >
                Property Listings
              </a>

              <a
                href={`${import.meta.env.BASE_URL}digital-marketing`}
              >
                Digital & Online Marketing
              </a>

              <a
                href={`${import.meta.env.BASE_URL}travel`}
              >
                Travel
              </a>

              <a
                href={`${import.meta.env.BASE_URL}partners`}
              >
                Our Partners
              </a>

              <a
                href={`${import.meta.env.BASE_URL}about`}
              >
                About Us
              </a>

            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold">
              Contact Us
            </h4>

            <p className="text-sm leading-7 text-[#AEB7C4]">
              Nairobi, Kenya
              <br />
              info@goldenspice.co.ke
            </p>
          </div>

        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-[#8B94A3]">
          © Goldenspice. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}