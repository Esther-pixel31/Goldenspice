import { useState } from "react";

import {
  Building2,
  Home as HomeIcon,
  Megaphone,
  Plane,
  Users,
  Handshake,
  Laptop,
  RefreshCw,
  Building,
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  X,
} from "lucide-react";

import Header from "../components/Header.jsx";
import logo from "../assets/logo.png";
import headerImage from "../assets/header.png";

/* ---------------------------------------------------------------------- */
/*  Design tokens                                                          */
/* ---------------------------------------------------------------------- */
const C = {
  navy: "#0B2043",
  navy2: "#0E274E",
  gold: "#C99A4A",
  goldDark: "#B3843A",
  lightBg: "#EEF2F7",
  ink: "#1B2430",
  sub: "#5B6472",
};

const heading = { fontFamily: "'Poppins','Montserrat',sans-serif" };
const body = { fontFamily: "'Inter','Helvetica Neue',sans-serif" };

/* ---------------------------------------------------------------------- */
/*  Inline social icons (avoids relying on brand icons in lucide-react)     */
/* ---------------------------------------------------------------------- */

function FacebookIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

function InstagramIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.97C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/*  Small building blocks                                                  */
/* ---------------------------------------------------------------------- */

function Eyebrow({ children, dark }) {
  return (
    <div
      className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
      style={{ color: C.gold, ...body }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, desc, dark, underline }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="text-2xl md:text-3xl font-bold mb-3 inline-block"
        style={{ color: dark ? "#fff" : C.navy, ...heading }}
      >
        {title}
        {underline && (
          <span
            className="block h-[3px] w-16 mt-3"
            style={{ background: C.gold }}
          />
        )}
      </h2>
      {desc && (
        <p
          className="max-w-xl text-sm leading-relaxed"
          style={{ color: dark ? "#C7CEDA" : C.sub, ...body }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

function GoldButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors hover:brightness-110 " +
        className
      }
      style={{ background: C.gold, color: C.navy, ...body }}
      {...props}
    >
      {children}
    </button>
  );
}

function NavyButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors hover:brightness-125 " +
        className
      }
      style={{ background: C.navy, color: "#fff", ...body }}
      {...props}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "px-6 py-3 text-xs font-bold tracking-widest uppercase border border-white text-white transition-colors hover:bg-white/10 " +
        className
      }
      style={body}
      {...props}
    >
      {children}
    </button>
  );
}

function LearnMore({ children = "Learn More", color = C.gold }) {
  return (
    <span
      role="link"
      tabIndex={0}
      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide mt-4 cursor-pointer"
      style={{ color, ...body }}
    >
      {children} <ArrowRight size={14} />
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/*  Contact modal (frontend-only for now -- wire up to a backend later)     */
/* ---------------------------------------------------------------------- */

function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Frontend-only for now: simulate a network round trip.
    // Swap this timeout for a real fetch() call once the backend is ready.
    setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{ background: "rgba(11,32,67,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-[#5B6472]"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <Eyebrow>Contact Us</Eyebrow>
        <h3 className="text-xl font-bold mb-1" style={{ color: C.navy, ...heading }}>
          Let's Work Together
        </h3>
        <p className="text-[13px] mb-5" style={{ color: C.sub, ...body }}>
          Send us a message and our team will get back to you shortly.
        </p>

        {status === "sent" ? (
          <p className="text-sm font-medium" style={{ color: C.navy, ...body }}>
            Thanks -- your message has been sent!
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input
              required
              placeholder="Your name"
              className="w-full border border-[#E4E8EE] px-4 py-2.5 text-sm outline-none focus:border-[#C99A4A]"
              style={body}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full border border-[#E4E8EE] px-4 py-2.5 text-sm outline-none focus:border-[#C99A4A]"
              style={body}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              required
              rows={4}
              placeholder="How can we help?"
              className="w-full border border-[#E4E8EE] px-4 py-2.5 text-sm outline-none focus:border-[#C99A4A] resize-none"
              style={body}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <GoldButton className="w-full" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </GoldButton>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Header                                                                  */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/*  Hero                                                                    */
/* ---------------------------------------------------------------------- */

function Hero({ onContactClick }) {
  return (
    <section className="relative w-full h-[220px] sm:h-[300px] md:h-[340px] lg:h-[480px] overflow-hidden">
      <div className="absolute inset-0 flex">
       <div
          className="w-full h-full bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(${headerImage})`,
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
           "linear-gradient(90deg, rgba(11,32,67,0.45) 0%, rgba(11,32,67,0.32) 40%, rgba(11,32,67,0.1) 70%, rgba(11,32,67,0.22) 100%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5 sm:px-6 md:px-8">
        <div className="max-w-xl">
          <h1
             className="text-xl sm:text-2xl md:text-3xl lg:text-[50px] font-bold text-white mb-2 sm:mb-3 md:mb-5 flex flex-col gap-2 md:gap-3"
             style={heading}
          >
            <span>Your Partner in</span>
            <span>
              Property, <span style={{ color: C.gold }}>Digital Growth</span>
            </span>
            <span>
              & <span style={{ color: C.gold }}>Travel</span>
            </span>
          </h1>
          <p
            className="hidden sm:block text-xs sm:text-sm md:text-[15px] text-[#D6DCE6] leading-relaxed mb-3 md:mb-8 max-w-md"
            style={body}
          >
            Professional solutions designed to help you manage valuable
            assets, grow your hospitality brand online, and travel with
            confidence.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <GoldButton className="!px-3 !py-1.5 sm:!px-6 sm:!py-3 text-[10px] sm:text-xs">
              Explore Our Services
            </GoldButton>
            <OutlineButton
              onClick={onContactClick}
              className="!px-3 !py-1.5 sm:!px-6 sm:!py-3 text-[10px] sm:text-xs"
            >
              Contact Us
            </OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Services overview                                                       */
/* ---------------------------------------------------------------------- */

function ServicesOverview() {
  const cards = [
    {
      icon: Building2,
      title: "Property Management",
      desc: "Comprehensive property management solutions designed to protect assets and maximize returns.",
      cta: "Learn More",
    },
    {
      icon: HomeIcon,
      title: "Property Listings",
      desc: "Find the perfect property for sale or rent. Residential, commercial, and investment opportunities.",
      cta: "Browse Listings",
    },
    {
      icon: Megaphone,
      title: "Digital & Online Marketing",
      desc: "Specialized digital marketing for hotels and hospitality brands to increase visibility and direct bookings.",
      cta: "Our Services",
    },
    {
      icon: Plane,
      title: "Travel Services",
      desc: "Air ticketing, hotel bookings and visa processing for smooth and worry-free travel experiences.",
      cta: "Explore Travel",
    },
  ];

  return (
    <section id="services" className="scroll-mt-20 max-w-7xl mx-auto px-5 md:px-8 py-16 text-center">
      <Eyebrow>Our Services</Eyebrow>
      <h2
        className="text-2xl md:text-[28px] font-bold mb-10"
        style={{ color: C.navy, ...heading }}
      >
        Solutions That Move You Forward
        <span
          className="block h-[3px] w-16 mt-3 mx-auto"
          style={{ background: C.gold }}
        />
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ icon: Icon, title, desc, cta }) => (
          <div
            key={title}
            className="border border-[#E4E8EE] p-6 text-left hover:shadow-lg transition-shadow"
          >
            <div
              className="w-11 h-11 flex items-center justify-center mb-4"
              style={{ background: "#FBF3E7" }}
            >
              <Icon size={22} style={{ color: C.gold }} />
            </div>
            <h3
              className="font-bold text-[15px] mb-2"
              style={{ color: C.navy, ...heading }}
            >
              {title}
            </h3>
            <p className="text-[13px] leading-relaxed" style={{ color: C.sub, ...body }}>
              {desc}
            </p>
            <LearnMore>{cta}</LearnMore>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  About us                                                                */
/* ---------------------------------------------------------------------- */

function AboutUs() {
  return (
    <section style={{ background: C.lightBg }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
        <div className="px-5 md:px-8 py-14">
          <SectionHeading
            eyebrow="About Us"
            title="Your Trusted Partner in Property, Hospitality & Travel"
            desc="We bring together expertise in property management, digital marketing and travel services to deliver exceptional value and long-term results. Our commitment is to professionalism, transparency and client satisfaction."
          />
          <div className="mt-6">
            <GoldButton>Read More About Us</GoldButton>
          </div>
        </div>
        <div
          className="h-72 md:h-[420px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80)",
          }}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Property management (dark)                                             */
/* ---------------------------------------------------------------------- */

function PropertyManagement() {
  const cols = [
    {
      icon: Users,
      letter: "A",
      title: "Property Letting",
      desc: "We assist property owners in finding suitable tenants while reducing vacancy periods.",
      bullet:
        "11 letting services including rent collection, tenant screening, lease preparation and more.",
    },
    {
      icon: Handshake,
      letter: "B",
      title: "Property Sales",
      desc: "We assist clients in buying and selling residential, commercial, industrial, and investment properties.",
      bullet:
        "8 sales services including marketing, buyer identification, negotiation and more.",
    },
    {
      icon: Megaphone,
      letter: "C",
      title: "Property Marketing",
      desc: "We develop targeted marketing strategies to maximize property exposure and attract qualified buyers and tenants.",
      bullet:
        "8 marketing channels including digital, social media, photography and more.",
    },
  ];

  return (
    <section  id="property-management"  style={{ background: C.navy }}
       className="scroll-mt-20 py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Property Management"
            title="We Protect. We Manage. We Maximize."
            desc="Comprehensive property management solutions designed to protect assets and improve their financial performance."
            dark
          />
          <div className="shrink-0">
            <GoldButton>View Details</GoldButton>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cols.map(({ icon: Icon, letter, title, desc, bullet }) => (
            <div key={letter}>
              <div
                className="w-14 h-14 rounded-full border flex items-center justify-center mb-4"
                style={{ borderColor: C.gold }}
              >
                <Icon size={22} style={{ color: C.gold }} />
              </div>
              <h3
                className="font-bold text-white text-[15px] mb-2"
                style={heading}
              >
                {letter}. {title}
              </h3>
              <p
                className="text-[13px] leading-relaxed text-[#C7CEDA] mb-3"
                style={body}
              >
                {desc}
              </p>
              <p
                className="text-[12px] leading-relaxed text-[#9AA6B8] flex gap-2"
                style={body}
              >
                <span style={{ color: C.gold }}>*</span>
                {bullet}
              </p>
              <LearnMore />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Property listings                                                      */
/* ---------------------------------------------------------------------- */

function PropertyCard({ label, items, image, cta }) {
  return (
    <div className="relative overflow-hidden border border-[#E4E8EE]">
      <div
        className="h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <div
          className="text-[11px] font-bold tracking-widest uppercase mb-3"
          style={{ color: C.navy, ...body }}
        >
          {label}
        </div>
        <ul className="space-y-2 mb-5">
          {items.map((it) => (
            <li
              key={it}
              className="flex items-center gap-2 text-[13px]"
              style={{ color: C.sub, ...body }}
            >
              <CheckCircle2 size={15} style={{ color: C.gold }} />
              {it}
            </li>
          ))}
        </ul>
        <GoldButton>{cta}</GoldButton>
      </div>
    </div>
  );
}

function PropertyListings() {
  const items = ["Bungalows", "Apartments", "Mansionettes", "Go downs", "Vacant Land"];
  return (
    <section
      id="property-listings"
      className="scroll-mt-20 max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <SectionHeading
          eyebrow="Property Listings"
          title="Find Your Ideal Property"
          desc="Explore a wide range of properties for sale and rent."
        />
        <div className="shrink-0">
          <NavyButton>View All Listings</NavyButton>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <PropertyCard
          label="Properties on Sale"
          items={items}
          cta="Browse Sale Properties"
          image="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80"
        />
        <PropertyCard
          label="Properties for Rent"
          items={items}
          cta="Browse Rental Properties"
          image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80"
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Digital marketing                                                       */
/* ---------------------------------------------------------------------- */

function DigitalMarketing() {
  const cols = [
    {
      icon: Laptop,
      title: "Website Development",
      desc: "Mobile-first, conversion focused websites that showcase your hotel and drive direct bookings.",
    },
    {
      icon: RefreshCw,
      title: "360-Degree Digital Media Marketing",
      desc: "Data-driven strategies across SEO, social media, ads, content and more to increase visibility.",
    },
    {
      icon: Globe,
      title: "OTA Management",
      desc: "Reduce dependence on OTAs and drive more guests directly to your official website.",
    },
  ];
  return (
    <section id="digital-marketing" style={{ background: C.lightBg }}
      className="scroll-mt-20 py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="h-72 md:h-96 bg-cover bg-center order-2 md:order-1"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80)",
          }}
        />
        <div className="order-1 md:order-2">
          <SectionHeading
            eyebrow="Digital & Online Marketing"
            title="Grow Your Hotel Beyond Borders"
            desc="Goldenspice Agency is your premier partner in cutting-edge digital marketing for hotels and hospitality brands."
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-8 mb-8">
            {cols.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-3"
                  style={{ background: "#FBF3E7" }}
                >
                  <Icon size={18} style={{ color: C.gold }} />
                </div>
                <h4
                  className="font-bold text-[13px] mb-1.5"
                  style={{ color: C.navy, ...heading }}
                >
                  {title}
                </h4>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: C.sub, ...body }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <NavyButton>Explore Our Marketing Services</NavyButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Travel services                                                         */
/* ---------------------------------------------------------------------- */

function TravelServices() {
  const cols = [
    {
      icon: Plane,
      title: "Air Ticketing",
      desc: "Through our GDS, we provide the most direct and convenient routing with the best value.",
      bullets: ["Alternative airlines", "Alternative routes", "Alternative timings", "Alternative dates"],
    },
    {
      icon: Building,
      title: "Hotel Bookings",
      desc: "We offer the best rates and a wide selection of hotels worldwide.",
      bullets: ["Broad selection", "Easy booking options", "Competitive rates guaranteed"],
    },
    {
      icon: FileText,
      title: "Visa Processing",
      desc: "Our experienced team provides end-to-end support for visa applications.",
      bullets: ["Guidance & consultation", "Document requirements", "Consulate & embassy liaison"],
    },
  ];
  return (
    <section id="digital-marketing" style={{ background: C.lightBg }}
      className="scroll-mt-20 py-16">
      <SectionHeading
        eyebrow="Travel Services"
        title="Travel Smarter. Travel Better."
        desc="Reliable travel solutions for your business and leisure needs."
      />
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {cols.map(({ icon: Icon, title, desc, bullets }) => (
          <div key={title}>
            <Icon size={26} style={{ color: C.gold }} className="mb-3" />
            <h3
              className="font-bold text-[15px] mb-2"
              style={{ color: C.navy, ...heading }}
            >
              {title}
            </h3>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: C.sub, ...body }}>
              {desc}
            </p>
            <ul className="space-y-1.5 mb-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-[12px]"
                  style={{ color: C.sub, ...body }}
                >
                  <CheckCircle2 size={13} style={{ color: C.gold }} />
                  {b}
                </li>
              ))}
            </ul>
            <LearnMore />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  CTA bar                                                                 */
/* ---------------------------------------------------------------------- */

function CtaBar({ onContactClick }) {
  return (
    <section id="contact" style={{ background: C.navy2 }} className="scroll-mt-20 py-6">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(201,154,74,0.15)" }}
          >
            <Phone size={18} style={{ color: C.gold }} />
          </div>
          <div>
            <div className="text-white font-bold text-sm" style={heading}>
              Let's Work Together
            </div>
            <div className="text-[#AEB7C4] text-xs" style={body}>
              Whether it's property, marketing, or travel, we are here to
              help you achieve your goals.
            </div>
          </div>
        </div>
        <GoldButton className="shrink-0" onClick={onContactClick}>
          Get In Touch
        </GoldButton>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Footer                                                                  */
/* ---------------------------------------------------------------------- */

function Footer() {
  const quick = [
    "Home",
    "Property Management",
    "Property Listings",
    "Digital & Online Marketing",
    "Travel",
    "About Us",
    "Contact Us",
  ];
  const services = [
    "Property Letting",
    "Property Sales",
    "Property Marketing",
    "Air Ticketing",
    "Hotel Bookings",
    "Visa Processing",
  ];
  return (
    <footer style={{ background: C.navy }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Goldenspice logo" className="h-12 w-auto" />
            <div>
              <div className="text-white font-bold text-sm" style={heading}>
                GOLDENSPICE
              </div>
              <div
                className="text-[8px] tracking-[0.2em] uppercase"
                style={{ color: C.gold }}
              >
                Property - Marketing - Travel
              </div>
            </div>
          </div>
          <p className="text-[13px] text-[#AEB7C4] leading-relaxed mb-4" style={body}>
            Your trusted partner in property management, digital marketing and
            travel services.
          </p>
          <div className="flex gap-3">
            {[FacebookIcon, LinkedinIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <Icon size={14} className="text-white" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4" style={heading}>
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quick.map((l) => (
              <li key={l}>
                <span
                  role="link"
                  tabIndex={0}
                  className="text-[13px] text-[#AEB7C4] hover:text-white cursor-pointer"
                  style={body}
                >
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4" style={heading}>
            Our Services
          </h4>
          <ul className="space-y-2">
            {services.map((l) => (
              <li key={l}>
                <span
                  role="link"
                  tabIndex={0}
                  className="text-[13px] text-[#AEB7C4] hover:text-white cursor-pointer"
                  style={body}
                >
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4" style={heading}>
            Contact Us
          </h4>
          <ul className="space-y-3 text-[13px] text-[#AEB7C4]" style={body}>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: C.gold }} />
              123 Business Park, Nairobi, Kenya
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} style={{ color: C.gold }} />
              +254 700 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} style={{ color: C.gold }} />
              info@goldenspice.co.ke
            </li>
            <li className="flex items-center gap-2">
              <Globe size={15} style={{ color: C.gold }} />
              www.goldenspice.co.ke
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8B94A3]" style={body}>
          <span>(c) 2024 Goldenspice. All Rights Reserved.</span>
          <span className="flex gap-4">
            <span role="link" tabIndex={0} className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span role="link" tabIndex={0} className="hover:text-white cursor-pointer">Terms of Use</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/*  Page                                                                    */
/* ---------------------------------------------------------------------- */

export default function GoldenspiceSite() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div style={{ background: "#fff", ...body }}>
      <Header onContactClick={openContact} />
      <Hero onContactClick={openContact} />
      <ServicesOverview />
      <AboutUs />
      <PropertyManagement />
      <PropertyListings />
      <DigitalMarketing />
      <TravelServices />
      <CtaBar onContactClick={openContact} />
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
