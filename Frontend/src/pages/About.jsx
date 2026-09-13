import { Link } from "react-router-dom";
import {
  Building2,
  House,
  MonitorUp,
  Plane,
  ArrowRight,
} from "lucide-react";

import Header from "../components/Header.jsx";
import logo from "../assets/logo.png";
import aboutHero from "../assets/about-hero.jpg";
import aboutProperty from "../assets/about-property.jpg";
import aboutTravel from "../assets/about-travel.jpg";

export default function About() {
  const services = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Protect and maximize your property assets.",
      link: "/#property-management",
      linkText: "Learn More",
    },
    {
      icon: House,
      title: "Property Listings",
      description: "Find the right property for sale or rent.",
      link: "/#property-listings",
      linkText: "Browse Listings",
    },
    {
      icon: MonitorUp,
      title: "Digital & Online Marketing",
      description: "Helping hospitality brands grow online.",
      link: "/digital-marketing",
      linkText: "Our Services",
    },
    {
      icon: Plane,
      title: "Travel Services",
      description: "Reliable travel solutions for business and leisure.",
      link: "/#travel",
      linkText: "Explore Travel",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#071d38]">

     {/* SHARED NAVIGATION */}
      <Header />

      {/* HERO */}
      <section
        className="relative min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute inset-0 bg-[#04182d]/65" />

        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-20 lg:px-8">

          <div className="max-w-2xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#e1a83b]">
              About Us
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              More Possibilities.
              <span className="block text-[#e1a83b]">
                One Trusted Partner.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 md:text-lg">
              Goldenspice brings property, digital marketing and travel
              services together to help individuals and businesses create
              greater value, reach more opportunities and travel with
              confidence.
            </p>

            <a
              href="#who-we-are"
              className="mt-8 inline-flex items-center gap-2 bg-[#d79a2b] px-7 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[#bd8120]"
            >
              Get to Know Us
              <ArrowRight size={16} />
            </a>

          </div>
        </div>
      </section>


      {/* WHO WE ARE */}
      <section
        id="who-we-are"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8"
      >

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#d79a2b]">
            Who We Are
          </p>

          <h2 className="max-w-lg text-3xl font-bold leading-tight md:text-4xl">
            Simpler Solutions for a Brighter Tomorrow
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
            Goldenspice is a multi-service company providing professional
            solutions in property, digital marketing and travel. We combine
            expertise, market knowledge and a client-focused approach to make
            it easier for our clients to manage assets, grow their presence
            and travel with confidence.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            src={aboutProperty}
            alt="Modern property"
            className="h-[380px] w-full object-cover"
          />
        </div>

      </section>


      {/* SERVICES */}
      <section className="bg-[#f8f9fa] py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#d79a2b]">
              What We Do
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Four Services. One Vision.
            </h2>

            <p className="mt-3 text-gray-500">
              Helping you manage, grow and explore more.
            </p>

          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group border-r border-gray-200 px-5 text-center last:border-r-0"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff6e6]">
                    <Icon
                      size={31}
                      strokeWidth={1.6}
                      className="text-[#d79a2b]"
                    />
                  </div>

                  <h3 className="text-lg font-bold">
                    {service.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-gray-500">
                    {service.description}
                  </p>

                  <a
                    href={service.link}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#d79a2b]"
                  >
                    {service.linkText}
                    <ArrowRight size={14} />
                  </a>
                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* PURPOSE */}
      <section className="grid bg-[#06233f] lg:grid-cols-2">

        <div className="flex items-center px-6 py-20 lg:px-16">

          <div className="max-w-xl">

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#e1a83b]">
              Our Purpose
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Creating Opportunities That Matter.
            </h2>

            <p className="mt-5 leading-7 text-gray-200">
              We connect people, property and destinations through reliable
              solutions and a client-focused approach.
            </p>

          </div>
        </div>

        <div className="min-h-[350px]">
          <img
            src={aboutTravel}
            alt="Travel"
            className="h-full min-h-[350px] w-full object-cover"
          />
        </div>

      </section>


      {/* CTA */}
      <section className="px-6 py-20 text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#d79a2b]">
          Let's Move Forward
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to create more possibilities?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Whether it's property, digital growth or travel, we're here to help.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <a
            href="/#contact"
            className="bg-[#d79a2b] px-7 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[#bd8120]"
          >
            Get in Touch
          </a>

          <a
            href="/#services"
            className="border border-[#06233f] px-7 py-3 text-sm font-semibold uppercase text-[#06233f] transition hover:bg-[#06233f] hover:text-white"
          >
            Explore Our Services
          </a>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-[#041c34] text-white">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 lg:px-8">

          <div>
            <img
              src={logo}
              alt="Goldenspice"
              className="mb-4 h-12 w-auto"
            />

            <p className="max-w-sm text-sm leading-6 text-gray-300">
              Your trusted partner in property management, digital marketing
              and travel services.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <Link to="/">Home</Link>

              <a href="/#property-management">
                Property Management
              </a>

              <a href="/#property-listings">
                Property Listings
              </a>

              <a href="/#digital-marketing">
                Digital & Online Marketing
              </a>

              <a href="/#travel">
                Travel
              </a>

              <a href="/#partners">
                Our Partners
              </a>

              <Link to="/about">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">
              Contact Us
            </h4>

            <p className="text-sm leading-7 text-gray-300">
              Nairobi, Kenya
              <br />
              info@goldenspice.co.ke
            </p>
          </div>

        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-gray-400">
          © Goldenspice. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}