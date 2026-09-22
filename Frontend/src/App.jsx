import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PropertyManagement from "./pages/PropertyManagement.jsx";
import DigitalMarketing from "./pages/DigitalMarketing.jsx";
import Travel from "./pages/Travel.jsx";
import PropertyListings from "./pages/PropertyListings.jsx";
import Partners from "./pages/Partners.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";

import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AdminProperties from "./admin/pages/AdminProperties.jsx";
import AdminPropertyForm from "./admin/pages/AdminPropertyForm.jsx";
import AdminPartners from "./admin/pages/AdminPartners.jsx";
import AdminPartnerForm from "./admin/pages/AdminPartnerForm.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/property-management"
        element={<PropertyManagement />}
      />
      <Route
        path="/digital-marketing"
        element={<DigitalMarketing />}
      />
      <Route path="/travel" element={<Travel />} />
      <Route path="/partners" element={<Partners />} />
      <Route
        path="/property-listings"
        element={<PropertyListings />}
      />
      <Route
        path="/property-listings/:slug"
        element={<PropertyDetails />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/properties"
            element={<AdminProperties />}
          />

          <Route
            path="/admin/properties/new"
            element={<AdminPropertyForm />}
          />
          <Route
            path="/admin/properties/:slug/edit"
            element={<AdminPropertyForm />}
          />
          <Route
              path="/admin/partners"
              element={<AdminPartners />}
            />

            <Route
              path="/admin/partners/new"
              element={<AdminPartnerForm />}
            />

            <Route
              path="/admin/partners/:partnerId/edit"
              element={<AdminPartnerForm />}
            />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;