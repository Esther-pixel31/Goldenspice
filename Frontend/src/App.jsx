import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PropertyManagement from "./pages/PropertyManagement.jsx";
import DigitalMarketing from "./pages/DigitalMarketing.jsx";
import Travel from "./pages/Travel.jsx";
import Partners from "./pages/Partners.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/property-management" element={<PropertyManagement />} />
      <Route path="/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/partners" element={<Partners />} />
    </Routes>
  );
}

export default App;