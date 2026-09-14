import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PropertyManagement from "./pages/PropertyManagement.jsx";
import DigitalMarketing from "./pages/DigitalMarketing.jsx";
import Travel from "./pages/Travel.jsx";
import PropertyListings from "./pages/PropertyListings.jsx";
import Partners from "./pages/Partners.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/property-management" element={<PropertyManagement />} />
      <Route path="/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/property-listings" element={<PropertyListings />} />
      <Route path="/property-listings/:slug" element={<PropertyDetails />} />
    </Routes>
  );
}

export default App;