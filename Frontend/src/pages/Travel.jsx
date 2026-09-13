import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  Headphones,
  Hotel,
  MapPin,
  Plane,
  Route,
  Sparkles,
} from "lucide-react";

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

export default function Travel() {
  const services = [
    {
      icon: Plane,
      number: "01",
      title: "Flight Booking",
      description:
        "Domestic and international flight booking support for business and leisure travellers.",
    },
    {
      icon: Hotel,
      number: "02",
      title: "Hotel Booking",
      description:
        "Hotel reservation support to help clients find suitable accommodation for their travel needs.",
    },
    {
      icon: Car,
      number: "03",
      title: "Airport Transfers",
      description:
        "Airport transfer arrangements to support convenient movement to and from your destination.",
    },
    {
      icon: Route,
      number: "04",
      title: "Car Hire",
      description:
        "Car hire arrangements for travellers who require reliable transportation during their trip.",
    },
    {
      icon: BriefcaseBusiness,
      number: "05",
      title: "Corporate Travel",
      description:
        "Travel support for companies and organizations managing business travel requirements.",
    },
    {
      icon: Sparkles,
      number: "06",
      title: "Holiday Packages",
      description:
        "Holiday travel arrangements designed around leisure trips and memorable travel experiences.",
    },
    {
      icon: Headphones,
      number: "07",
      title: "Travel Consultation",
      description:
        "Travel consultation and planning support to help clients make informed travel arrangements.",
    },
  ];

  const highlights = [
    {
      icon: Plane,
      title: "Business & Leisure",
      description:
        "Travel solutions for individual, leisure and corporate travel requirements.",
    },
    {
      icon: CalendarDays,
      title: "Travel Planning",
      description:
        "Support with coordinating the essential elements of your journey.",
    },
    {
      icon: Building2,
      title: "Corporate Travel",
      description:
        "Professional travel support for companies and organizations.",
    },
    {
      icon: MapPin,
      title: "Complete Support",
      description:
        "From flights and accommodation to transfers, car hire and consultation.",
    },
  ];

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

        <div className="relative mx-auto grid min-h-[510px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">
          {/* Hero copy */}
          <div>
            <p
              className="mb-4 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: C.gold }}
            >
              Goldenspice Travel
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Your Journey.
              <span className="block" style={{ color: C.gold }}>
                Thoughtfully Planned.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#CED5DF] md:text-lg">
              Reliable travel solutions for business and leisure, from flight
              and hotel bookings to transfers, car hire, holiday packages and
              travel consultation.
            </p>

            <a
              href="#travel-services"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
              style={{ background: C.gold, color: C.navy }}
            >
              Explore Travel Services
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Hero information card */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-md border border-white/10 bg-white/5 p-9 backdrop-blur-sm">
              <Plane
                size={44}
                strokeWidth={1.4}
                style={{ color: C.gold }}
              />

              <h2 className="mt-6 text-2xl font-bold text-white">
                Travel Made Simpler
              </h2>

              <p className="mt-4 leading-7 text-[#C7CEDA]">
                Whether travelling for business or leisure, Goldenspice
                provides travel planning and booking support across the key
                parts of your journey.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Flight & hotel bookings
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Transfers & car hire
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Corporate & leisure travel
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
              Travel With Goldenspice
            </p>

            <h2
              className="max-w-xl text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: C.navy }}
            >
              Travel Solutions for Business and Leisure
            </h2>
          </div>

          <div>
            <p
              className="text-base leading-8"
              style={{ color: C.sub }}
            >
              Goldenspice provides travel solutions for individuals and
              organizations. Our services cover the essential parts of travel,
              including flights, accommodation, transportation, corporate
              travel, holiday packages and travel consultation.
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-16" style={{ background: C.light }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border border-[#E3E7EC] bg-white p-6"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center"
                  style={{ background: "#FBF3E7" }}
                >
                  <Icon size={23} style={{ color: C.gold }} />
                </div>

                <h3
                  className="text-base font-bold"
                  style={{ color: C.navy }}
                >
                  {title}
                </h3>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: C.sub }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVEL SERVICES */}
      <section
        id="travel-services"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
            style={{ color: C.gold }}
          >
            What We Offer
          </p>

          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ color: C.navy }}
          >
            Our Travel Services
          </h2>

          <p
            className="mt-4 leading-7"
            style={{ color: C.sub }}
          >
            Practical travel support covering the key services you need when
            planning business or leisure travel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(
            ({ icon: Icon, number, title, description }, index) => (
              <div
                key={title}
                className={`group border border-[#E3E7EC] bg-white p-8 transition-shadow hover:shadow-lg ${
                  index === services.length - 1
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center"
                    style={{ background: "#FBF3E7" }}
                  >
                    <Icon size={26} style={{ color: C.gold }} />
                  </div>

                  <span
                    className="text-sm font-bold"
                    style={{ color: C.gold }}
                  >
                    {number}
                  </span>
                </div>

                <h3
                  className="mt-7 text-xl font-bold"
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

      {/* TRAVEL JOURNEY */}
      <section className="py-20" style={{ background: C.navy }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Your Travel Journey
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              From Planning to Your Destination
            </h2>

            <p className="mt-4 leading-7 text-[#C7CEDA]">
              Tell us what you need and let Goldenspice help coordinate the
              travel services required for your journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* 1 */}
            <div className="border border-white/10 p-8 text-center">
              <Headphones
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <p
                className="mt-5 text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                Step 01
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Tell Us Your Plans
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Share your travel requirements, destination and preferred
                arrangements.
              </p>
            </div>

            {/* 2 */}
            <div className="border border-white/10 p-8 text-center">
              <CalendarDays
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <p
                className="mt-5 text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                Step 02
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Plan Your Travel
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                We help coordinate the travel services required for your
                journey.
              </p>
            </div>

            {/* 3 */}
            <div className="border border-white/10 p-8 text-center">
              <Plane
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <p
                className="mt-5 text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                Step 03
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Travel
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Proceed with your business or leisure journey with the
                necessary arrangements in place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <p
          className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
          style={{ color: C.gold }}
        >
          Start Planning
        </p>

        <h2
          className="text-3xl font-bold md:text-4xl"
          style={{ color: C.navy }}
        >
          Where would you like to go?
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl leading-7"
          style={{ color: C.sub }}
        >
          Talk to Goldenspice about your next business trip, holiday or travel
          arrangement.
        </p>

        <a
          href={`${import.meta.env.BASE_URL}#contact`}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
          style={{ background: C.gold, color: C.navy }}
        >
          Plan Your Trip
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
              Your trusted partner in property management, digital marketing
              and travel services.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Quick Links</h4>

            <div className="flex flex-col gap-2 text-sm text-[#AEB7C4]">
              <a href={import.meta.env.BASE_URL}>Home</a>

              <a href={`${import.meta.env.BASE_URL}property-management`}>
                Property Management
              </a>

              <a href={`${import.meta.env.BASE_URL}#property-listings`}>
                Property Listings
              </a>

              <a href={`${import.meta.env.BASE_URL}digital-marketing`}>
                Digital & Online Marketing
              </a>

              <a href={`${import.meta.env.BASE_URL}travel`}>
                Travel
              </a>

              <a href={`${import.meta.env.BASE_URL}about`}>
                About Us
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Contact Us</h4>

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