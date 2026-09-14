import {
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const C = {
  navy: "#0B2043",
  navyDark: "#061A35",
  gold: "#C99A4A",
};

export default function Footer({ onContactClick }) {
  return (
    <>
      {/* CTA BAR */}
      <section
        className="w-full"
        style={{ background: "#132F59" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Phone size={19} style={{ color: C.gold }} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Let's Work Together
              </h3>

              <p className="mt-0.5 text-xs text-[#D0D8E4]">
                Whether it's property, marketing, or travel, we are here to
                help you achieve your goals.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onContactClick}
            className="shrink-0 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
            style={{
              background: C.gold,
              color: C.navy,
            }}
          >
            Get In Touch
          </button>

        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer
        className="text-white"
        style={{ background: C.navy }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

          {/* COMPANY */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Goldenspice"
                className="h-14 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-[#B9C5D6]">
              Your trusted partner in property management,
              digital marketing and travel services.
            </p>

            <div className="mt-5 flex gap-3">

                <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-white/20"
                >
                    f
                </a>

                <a
                    href="#"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold transition-colors hover:bg-white/20"
                >
                    in
                </a>

                <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold transition-colors hover:bg-white/20"
                >
                    IG
                </a>

                <a
                    href="#"
                    aria-label="YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold transition-colors hover:bg-white/20"
                >
                    YT
                </a>

                </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-5 text-sm font-bold">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-sm text-[#C1CCDA]">

              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <Link
                to="/property-management"
                className="hover:text-white"
              >
                Property Management
              </Link>

              {/* No dedicated Property Listings page yet */}
              <a
                href={`${import.meta.env.BASE_URL}#property-listings`}
                className="hover:text-white"
              >
                Property Listings
              </a>

              <Link
                to="/digital-marketing"
                className="hover:text-white"
              >
                Digital & Online Marketing
              </Link>

              <Link
                to="/travel"
                className="hover:text-white"
              >
                Travel
              </Link>

              <Link
                to="/partners"
                className="hover:text-white"
              >
                Our Partners
              </Link>

              <Link
                to="/about"
                className="hover:text-white"
              >
                About Us
              </Link>

              <button
                type="button"
                onClick={onContactClick}
                className="w-fit text-left hover:text-white"
              >
                Contact Us
              </button>

            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="mb-5 text-sm font-bold">
              Our Services
            </h4>

            <div className="flex flex-col gap-3 text-sm text-[#C1CCDA]">

              <Link
                to="/property-management"
                className="hover:text-white"
              >
                Property Letting
              </Link>

              <Link
                to="/property-management"
                className="hover:text-white"
              >
                Property Sales
              </Link>

              <Link
                to="/property-management"
                className="hover:text-white"
              >
                Property Marketing
              </Link>

              <Link
                to="/travel"
                className="hover:text-white"
              >
                Air Ticketing
              </Link>

              <Link
                to="/travel"
                className="hover:text-white"
              >
                Hotel Bookings
              </Link>

              <Link
                to="/travel"
                className="hover:text-white"
              >
                Visa Processing
              </Link>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-5 text-sm font-bold">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm text-[#C1CCDA]">

              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: C.gold }}
                />

                <span>
                  Nairobi, Kenya
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="shrink-0"
                  style={{ color: C.gold }}
                />

                <span>
                  Contact Goldenspice
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={16}
                  className="shrink-0"
                  style={{ color: C.gold }}
                />

                <span>
                  info@goldenspice.co.ke
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Globe
                  size={16}
                  className="shrink-0"
                  style={{ color: C.gold }}
                />

                <span>
                  goldenspice.co.ke
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-[#8796AA] sm:flex-row sm:items-center sm:justify-between lg:px-8">

            <p>
              © {new Date().getFullYear()} Goldenspice. All Rights Reserved.
            </p>

            <div className="flex gap-5">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
            </div>

          </div>
        </div>

      </footer>
    </>
  );
}