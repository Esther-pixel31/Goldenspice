import { useState } from "react";
import {
  Building2,
  Users,
  Handshake,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Banknote,
  Search,
  FileText,
  Home,
  TrendingUp,
} from "lucide-react";

import Header from "../components/Header.jsx";
import ContactModal from "../components/ContactModal.jsx";
import logo from "../assets/logo.png";
import Footer from "../components/Footer.jsx";

const C = {
  navy: "#0B2043",
  navyDark: "#061A35",
  gold: "#C99A4A",
  light: "#F6F8FB",
};

export default function PropertyManagement() {
  const [contactOpen, setContactOpen] = useState(false);
  const lettingServices = [
    "Property assessment",
    "Rental pricing",
    "Rent collection",
    "Property advertising",
    "Tenant enquiries and viewings",
    "Tenant screening",
    "Service charge administration",
    "Rent arrears monitoring",
    "Lease preparation",
    "Property handover",
  ];

  const salesServices = [
    "Residential properties",
    "Commercial properties",
    "Industrial properties",
    "Investment properties",
    "Market assessment",
    "Property listing and marketing",
    "Buyer identification",
    "Property viewings",
    "Negotiation",
    "Transaction support",
    "Post-sale support",
  ];

  const marketingServices = [
    "Digital marketing",
    "Social media marketing",
    "Property listing platforms",
    "Website marketing",
    "Professional property photography",
    "Property brochures",
    "Property signage",
    "Direct and corporate networks",
  ];

  const benefits = [
    {
      icon: Building2,
      title: "Asset Protection",
      description:
        "Professional management focused on protecting the value and condition of your property.",
    },
    {
      icon: Banknote,
      title: "Financial Performance",
      description:
        "Practical property management designed to support stronger and more consistent returns.",
    },
    {
      icon: Users,
      title: "Tenant Management",
      description:
        "Structured tenant enquiries, screening, leasing and ongoing administration.",
    },
    {
      icon: TrendingUp,
      title: "Market Exposure",
      description:
        "Targeted marketing designed to attract qualified tenants and property buyers.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B2430]">

      {/* SHARED HEADER */}
      <Header />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: C.navyDark }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full border border-white" />
          <div className="absolute -right-4 top-10 h-72 w-72 rounded-full border border-white" />
        </div>

        <div className="relative mx-auto grid min-h-[470px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p
              className="mb-4 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: C.gold }}
            >
              Property Management
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              We Protect.
              <span className="block" style={{ color: C.gold }}>
                We Manage.
              </span>
              <span className="block">We Maximize.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#CED5DF] md:text-lg">
              Comprehensive property management solutions designed to protect
              your assets and improve their financial performance.
            </p>

            <a
              href="#property-services"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
              style={{ background: C.gold, color: C.navy }}
            >
              Explore Our Services
              <ArrowRight size={16} />
            </a>
          </div>

          {/* HERO FEATURE PANEL */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-md border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <Building2
                size={42}
                strokeWidth={1.5}
                style={{ color: C.gold }}
              />

              <h2 className="mt-6 text-2xl font-bold text-white">
                Property Expertise You Can Rely On
              </h2>

              <p className="mt-4 leading-7 text-[#C7CEDA]">
                From letting and tenant management to property sales and
                strategic marketing, Goldenspice provides professional support
                throughout the property lifecycle.
              </p>

              <div className="mt-7 grid grid-cols-3 border-t border-white/10 pt-6 text-center">
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: C.gold }}
                  >
                    01
                  </div>
                  <div className="mt-1 text-xs text-[#C7CEDA]">
                    Letting
                  </div>
                </div>

                <div className="border-x border-white/10">
                  <div
                    className="text-xl font-bold"
                    style={{ color: C.gold }}
                  >
                    02
                  </div>
                  <div className="mt-1 text-xs text-[#C7CEDA]">
                    Sales
                  </div>
                </div>

                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: C.gold }}
                  >
                    03
                  </div>
                  <div className="mt-1 text-xs text-[#C7CEDA]">
                    Marketing
                  </div>
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
              Property Management Solutions
            </p>

            <h2
              className="max-w-xl text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: C.navy }}
            >
              Professional Management for Valuable Property Assets
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-[#5B6472]">
              Our property management services are designed to help property
              owners protect their assets, reduce management challenges and
              improve property performance. We provide support across property
              letting, sales and marketing.
            </p>
          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: C.light }} className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
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

                <p className="mt-3 text-sm leading-6 text-[#5B6472]">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MAIN SERVICES */}
      <section
        id="property-services"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
            style={{ color: C.gold }}
          >
            What We Do
          </p>

          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ color: C.navy }}
          >
            Complete Property Solutions
          </h2>

          <p className="mt-4 leading-7 text-[#5B6472]">
            Our property services cover three core areas, giving property
            owners and clients professional support from letting through to
            sales and market exposure.
          </p>
        </div>

        <div className="space-y-10">

          {/* PROPERTY LETTING */}
          <div className="grid overflow-hidden border border-[#E3E7EC] lg:grid-cols-[0.7fr_1.3fr]">

            <div
              className="flex flex-col justify-between p-8 lg:p-10"
              style={{ background: C.navy }}
            >
              <div>
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(201,154,74,0.15)" }}
                >
                  <KeyRound size={25} style={{ color: C.gold }} />
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: C.gold }}
                >
                  Service 01
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  Property Letting
                </h3>

                <p className="mt-4 leading-7 text-[#C7CEDA]">
                  We assist property owners in finding suitable tenants while
                  helping reduce vacancy periods and supporting effective
                  property administration.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10">
              <h4
                className="mb-6 text-lg font-bold"
                style={{ color: C.navy }}
              >
                Our Letting Services
              </h4>

              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {lettingServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-3 text-sm text-[#5B6472]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: C.gold }}
                    />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROPERTY SALES */}
          <div className="grid overflow-hidden border border-[#E3E7EC] lg:grid-cols-[0.7fr_1.3fr]">

            <div
              className="flex flex-col justify-between p-8 lg:p-10"
              style={{ background: C.navy }}
            >
              <div>
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(201,154,74,0.15)" }}
                >
                  <Handshake size={25} style={{ color: C.gold }} />
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: C.gold }}
                >
                  Service 02
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  Property Sales
                </h3>

                <p className="mt-4 leading-7 text-[#C7CEDA]">
                  We assist clients in buying and selling residential,
                  commercial, industrial and investment properties.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10">
              <h4
                className="mb-6 text-lg font-bold"
                style={{ color: C.navy }}
              >
                Our Property Sales Services
              </h4>

              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {salesServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-3 text-sm text-[#5B6472]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: C.gold }}
                    />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROPERTY MARKETING */}
          <div className="grid overflow-hidden border border-[#E3E7EC] lg:grid-cols-[0.7fr_1.3fr]">

            <div
              className="flex flex-col justify-between p-8 lg:p-10"
              style={{ background: C.navy }}
            >
              <div>
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(201,154,74,0.15)" }}
                >
                  <Megaphone size={25} style={{ color: C.gold }} />
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: C.gold }}
                >
                  Service 03
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  Property Marketing
                </h3>

                <p className="mt-4 leading-7 text-[#C7CEDA]">
                  We develop targeted property marketing strategies to
                  maximize exposure and attract qualified buyers and tenants.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10">
              <h4
                className="mb-6 text-lg font-bold"
                style={{ color: C.navy }}
              >
                Our Marketing Channels
              </h4>

              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {marketingServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-3 text-sm text-[#5B6472]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: C.gold }}
                    />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: C.light }} className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Our Approach
            </p>

            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ color: C.navy }}
            >
              Professional Support at Every Stage
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="text-center">
              <Search
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <div
                className="mx-auto my-5 h-px w-12"
                style={{ background: C.gold }}
              />

              <h3
                className="font-bold"
                style={{ color: C.navy }}
              >
                Understand
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5B6472]">
                We assess the property, market conditions and your objectives.
              </p>
            </div>

            <div className="text-center">
              <FileText
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <div
                className="mx-auto my-5 h-px w-12"
                style={{ background: C.gold }}
              />

              <h3
                className="font-bold"
                style={{ color: C.navy }}
              >
                Plan
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5B6472]">
                We develop the appropriate letting, sales or marketing
                approach for the property.
              </p>
            </div>

            <div className="text-center">
              <Home
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <div
                className="mx-auto my-5 h-px w-12"
                style={{ background: C.gold }}
              />

              <h3
                className="font-bold"
                style={{ color: C.navy }}
              >
                Deliver
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5B6472]">
                We implement the agreed solution and support the property
                through the relevant process.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-20 text-center"
        style={{ background: C.navy }}
      >
        <p
          className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
          style={{ color: C.gold }}
        >
          Let's Work Together
        </p>

        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Have a property you need professionally managed?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#C7CEDA]">
          Talk to Goldenspice about your property letting, sales or marketing
          requirements.
        </p>

        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-90"
          style={{
            background: C.gold,
            color: C.navy,
          }}
        >
          Get In Touch
          <ArrowRight size={16} />
        </button>
      </section>

      {/* SHARED FOOTER */}
      <Footer
        onContactClick={() => setContactOpen(true)}
      />

      {/* SHARED CONTACT MODAL */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />

    </div>
  );
}