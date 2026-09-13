import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const C = {
  navy: "#0B2043",
  gold: "#C99A4A",
};

const heading = {
  fontFamily: "'Poppins','Montserrat',sans-serif",
};

const body = {
  fontFamily: "'Inter','Helvetica Neue',sans-serif",
};

export default function Header({ onContactClick }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isPropertyManagement = location.pathname === "/property-management";
  const isDigitalMarketing = location.pathname === "/digital-marketing";
  const isTravel = location.pathname === "/travel";
  const isPartners = location.pathname === "/partners";

  const closeMenu = () => setOpen(false);

  const handleContact = () => {
    closeMenu();

    // On the homepage, open the existing contact modal.
    if (location.pathname === "/" && onContactClick) {
      onContactClick();
      return;
    }

    // From another page, return to the homepage contact section.
    window.location.href = "/#contact";
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: C.navy, ...body }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <img
            src={logo}
            alt="Goldenspice logo"
            className="h-12 w-auto"
          />

          <div className="leading-none">
            <div
              className="text-[15px] font-bold tracking-wide text-white"
              style={heading}
            >
              GOLDENSPICE
            </div>

            <div
              className="text-[10.5px] uppercase tracking-[0.25em]"
              style={{ color: C.gold }}
            >
              PROPERTY - MARKETING - TRAVEL
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-7 lg:flex">

          <Link
            to="/"
            className="text-[13px] font-medium transition-colors hover:text-[#C99A4A]"
            style={{
              color: isHome ? C.gold : "#E7EAF0",
            }}
          >
            Home
          </Link>

          <Link
            to="/property-management"
            className="text-[13px] font-medium transition-colors hover:text-[#C99A4A]"
            style={{
              color: isPropertyManagement ? C.gold : "#E7EAF0",
            }}
          >
            Property Management
          </Link>

          <a
            href="/#property-listings"
            className="text-[13px] font-medium text-[#E7EAF0] transition-colors hover:text-[#C99A4A]"
          >
            Property Listings
          </a>

          <Link
            to="/digital-marketing"
            className="text-[13px] font-medium transition-colors hover:text-[#C99A4A]"
            style={{
              color: isDigitalMarketing ? C.gold : "#E7EAF0",
            }}
          >
            Digital & Online Marketing
          </Link>

          <Link
            to="/travel"
            className="text-[13px] font-medium transition-colors hover:text-[#C99A4A]"
            style={{
              color: isTravel ? C.gold : "#E7EAF0",
            }}
          >
            Travel
          </Link>

          <Link
            to="/partners"
            className="text-[13px] font-medium transition-colors hover:text-[#C99A4A]"
            style={{
              color: isPartners ? C.gold : "#E7EAF0",
            }}
          >
            Our Partners
          </Link>

          <Link
            to="/about"
            className="text-[13px] font-medium transition-colors hover:text-[#C99A4A]"
            style={{
              color: isAbout ? C.gold : "#E7EAF0",
            }}
          >
            About Us
          </Link>

          <button
            type="button"
            onClick={handleContact}
            className="text-[13px] font-medium text-[#E7EAF0] transition-colors hover:text-[#C99A4A]"
          >
            Contact Us
          </button>

        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="text-white lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {open && (
        <nav
          className="flex flex-col gap-4 px-5 pb-6 text-sm lg:hidden"
          style={{ background: C.navy }}
        >
          <Link
            to="/"
            onClick={closeMenu}
            style={{ color: isHome ? C.gold : "#E7EAF0" }}
          >
            Home
          </Link>

          <Link
            to="/property-management"
            onClick={() => setOpen(false)}
            style={{
              color: isPropertyManagement ? C.gold : "#E7EAF0",
              }}
           >
            Property Management
          </Link>

          <a
            href="/#property-listings"
            onClick={closeMenu}
            className="text-[#E7EAF0]"
          >
            Property Listings
          </a>

          <Link
            to="/digital-marketing"
            onClick={() => setOpen(false)}
            style={{
              color: isDigitalMarketing ? C.gold : "#E7EAF0",
            }}
          >
            Digital & Online Marketing
          </Link>

          <Link
            to="/travel"
            onClick={() => setOpen(false)}
            style={{
              color: isTravel ? C.gold : "#E7EAF0",
            }}
          >
            Travel
          </Link>

          <Link
            to="/partners"
            onClick={() => setOpen(false)}
            style={{
              color: isPartners ? C.gold : "#E7EAF0",
            }}
          >
            Our Partners
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            style={{ color: isAbout ? C.gold : "#E7EAF0" }}
          >
            About Us
          </Link>

          <button
            type="button"
            onClick={handleContact}
            className="text-left text-[#E7EAF0]"
          >
            Contact Us
          </button>
        </nav>
      )}
    </header>
  );
}