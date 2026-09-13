import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PropertyManagement from "./pages/PropertyManagement.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/property-management" element={<PropertyManagement />} />
    </Routes>
  );
}

export default App;