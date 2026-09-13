import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Laptop,
  Megaphone,
  MonitorUp,
  Search,
  Share2,
  Target,
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

export default function DigitalMarketing() {
  const services = [
    {
      icon: Laptop,
      title: "Website Development",
      description:
        "Professional digital experiences designed to showcase your hospitality brand and support direct bookings.",
      items: [
        "Hospitality-focused website development",
        "Mobile-friendly experiences",
        "Brand-focused presentation",
        "Conversion-focused user journeys",
        "Direct booking support",
      ],
    },
    {
      icon: Target,
      title: "Search, Retargeting & Metasearch",
      description:
        "Digital campaigns designed to reach potential guests throughout their online booking journey.",
      items: [
        "Search marketing",
        "Retargeting campaigns",
        "Metasearch marketing",
        "Audience targeting",
        "Campaign optimization",
      ],
    },
    {
      icon: Search,
      title: "SEO & Content Marketing",
      description:
        "Strengthen your online visibility with content and search strategies designed around your hospitality brand.",
      items: [
        "Search engine optimization",
        "Content marketing",
        "Website content optimization",
        "Organic visibility",
        "Hospitality-focused content",
      ],
    },
    {
      icon: Share2,
      title: "Social & Display Marketing",
      description:
        "Build visibility and engagement through strategic social media and digital display campaigns.",
      items: [
        "Social media marketing",
        "Display advertising",
        "Brand awareness campaigns",
        "Audience engagement",
        "Digital campaign management",
      ],
    },
    {
      icon: Globe2,
      title: "OTA Management",
      description:
        "Professional management of your presence across online travel agency channels.",
      items: [
        "OTA presence management",
        "Listing optimization",
        "Online visibility",
        "Channel support",
        "Direct booking strategy support",
      ],
    },
  ];

  const benefits = [
    {
      icon: Globe2,
      title: "Greater Visibility",
      description:
        "Strengthen your hospitality brand's presence across relevant digital channels.",
    },
    {
      icon: Target,
      title: "Reach the Right Guests",
      description:
        "Use targeted digital strategies to connect with audiences most relevant to your business.",
    },
    {
      icon: BarChart3,
      title: "Drive More Bookings",
      description:
        "Build digital journeys designed to turn visibility and interest into booking opportunities.",
    },
    {
      icon: MonitorUp,
      title: "Grow Your Brand",
      description:
        "Create a stronger and more consistent online presence for your hotel or hospitality business.",
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
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full border border-white" />
          <div className="absolute right-16 top-16 h-[330px] w-[330px] rounded-full border border-white" />
        </div>

        <div className="relative mx-auto grid min-h-[500px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">

          <div>
            <p
              className="mb-4 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: C.gold }}
            >
              Digital & Online Marketing
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Grow Your Hotel
              <span className="block" style={{ color: C.gold }}>
                Beyond Borders.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#CED5DF] md:text-lg">
              Digital marketing solutions for hotels and hospitality brands
              designed to strengthen visibility, support direct bookings and
              create opportunities for sustainable online growth.
            </p>

            <a
              href="#digital-services"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
              style={{ background: C.gold, color: C.navy }}
            >
              Explore Our Services
              <ArrowRight size={16} />
            </a>
          </div>

          {/* DIGITAL FEATURE PANEL */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-md border border-white/10 bg-white/5 p-9 backdrop-blur-sm">

              <Megaphone
                size={43}
                strokeWidth={1.4}
                style={{ color: C.gold }}
              />

              <h2 className="mt-6 text-2xl font-bold text-white">
                Hospitality Marketing With Purpose
              </h2>

              <p className="mt-4 leading-7 text-[#C7CEDA]">
                Goldenspice Agency combines digital channels and hospitality
                marketing expertise to help hotels strengthen their online
                presence and reach more potential guests.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Increase online visibility
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Support direct bookings
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: C.gold }} />
                  <span className="text-sm text-[#D7DCE4]">
                    Strengthen hospitality brands
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Goldenspice Agency
            </p>

            <h2
              className="max-w-xl text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: C.navy }}
            >
              Digital Growth Built for Hospitality
            </h2>
          </div>

          <div>
            <p className="text-base leading-8" style={{ color: C.sub }}>
              We focus on digital marketing for the hospitality sector,
              including upscale hotels, hotel chains and hotel groups. Our
              digital solutions are designed to improve visibility, support
              direct bookings and strengthen online performance.
            </p>
          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16" style={{ background: C.light }}>
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

      {/* SERVICES */}
      <section
        id="digital-services"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >

        <div className="mb-14 max-w-2xl">
          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
            style={{ color: C.gold }}
          >
            Our Digital Services
          </p>

          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ color: C.navy }}
          >
            A Complete Digital Marketing Approach
          </h2>

          <p
            className="mt-4 leading-7"
            style={{ color: C.sub }}
          >
            From your website and search visibility to social media and OTA
            channels, our services are designed to support your hospitality
            brand across the digital guest journey.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {services.map(({ icon: Icon, title, description, items }, index) => (
            <div
              key={title}
              className={`border border-[#E3E7EC] bg-white p-8 ${
                index === services.length - 1
                  ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-12"
                  : ""
              }`}
            >
              <div>
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center"
                  style={{ background: "#FBF3E7" }}
                >
                  <Icon size={27} style={{ color: C.gold }} />
                </div>

                <h3
                  className="text-xl font-bold"
                  style={{ color: C.navy }}
                >
                  {title}
                </h3>

                <p
                  className="mt-3 max-w-xl text-sm leading-7"
                  style={{ color: C.sub }}
                >
                  {description}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: C.sub }}
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: C.gold }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* STRATEGY SECTION */}
      <section style={{ background: C.navy }} className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: C.gold }}
            >
              Our Approach
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Visibility. Engagement. Conversion.
            </h2>

            <p className="mt-4 leading-7 text-[#C7CEDA]">
              A connected digital strategy helps your hospitality brand reach
              guests at different stages of their decision-making journey.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="border border-white/10 p-7 text-center">
              <Search
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <p
                className="mt-5 text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                Stage 01
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Be Discovered
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Improve your digital presence so potential guests can discover
                your hospitality brand.
              </p>
            </div>

            <div className="border border-white/10 p-7 text-center">
              <Megaphone
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <p
                className="mt-5 text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                Stage 02
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Build Engagement
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Present relevant content and campaigns that strengthen
                interest in your hotel or hospitality brand.
              </p>
            </div>

            <div className="border border-white/10 p-7 text-center">
              <BarChart3
                size={30}
                className="mx-auto"
                style={{ color: C.gold }}
              />

              <p
                className="mt-5 text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                Stage 03
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Drive Results
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#B9C2CF]">
                Turn stronger digital visibility and engagement into valuable
                booking opportunities.
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
          Grow With Goldenspice
        </p>

        <h2
          className="text-3xl font-bold md:text-4xl"
          style={{ color: C.navy }}
        >
          Ready to strengthen your hospitality brand online?
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl leading-7"
          style={{ color: C.sub }}
        >
          Talk to Goldenspice about a digital marketing approach built around
          your hospitality business.
        </p>

        <a
          href={`${import.meta.env.BASE_URL}#contact`}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
          style={{ background: C.gold, color: C.navy }}
        >
          Get In Touch
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

              <a href={`${import.meta.env.BASE_URL}#travel`}>
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