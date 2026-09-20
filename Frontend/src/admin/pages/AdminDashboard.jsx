import {
  Building2,
  CircleCheck,
  CircleDollarSign,
  House,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getAdminProperties,
} from "../api/adminApi.js";

function formatPrice(property) {
  const value = Number(property.price);

  if (!Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-KE",
    {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function formatStatus(status) {
  if (!status) {
    return "Unknown";
  }

  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatListingType(type) {
  if (type === "FOR_SALE") {
    return "For Sale";
  }

  if (type === "FOR_RENT") {
    return "For Rent";
  }

  return type || "—";
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [properties, setProperties] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const loadProperties = useCallback(
    async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getAdminProperties();

        setProperties(data);
      } catch (requestError) {
        if (
          requestError.message ===
          "AUTHENTICATION_REQUIRED"
        ) {
          navigate(
            "/admin/login",
            { replace: true }
          );
          return;
        }

        setError(
          requestError.message ||
            "Unable to load properties."
        );
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadInitialProperties() {
      try {
        const data = await getAdminProperties();

        if (!cancelled) {
          setProperties(data);
        }
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        if (
          requestError.message ===
          "AUTHENTICATION_REQUIRED"
        ) {
          navigate(
            "/admin/login",
            { replace: true }
          );
          return;
        }

        setError(
          requestError.message ||
            "Unable to load properties."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialProperties();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const statistics = useMemo(() => {
    return {
      total: properties.length,

      available: properties.filter(
        (property) =>
          property.status === "AVAILABLE"
      ).length,

      featured: properties.filter(
        (property) => property.featured
      ).length,

      soldOrRented: properties.filter(
        (property) =>
          property.status === "SOLD" ||
          property.status === "RENTED"
      ).length,
    };
  }, [properties]);

  const recentProperties =
    properties.slice(0, 5);

  if (loading) {
    return (
      <section className="admin-page">
        <div className="admin-page-heading">
          <div>
            <p className="admin-page-eyebrow">
              OVERVIEW
            </p>
            <h1>Dashboard</h1>
          </div>
        </div>

        <div
          className="admin-loading"
          role="status"
        >
          Loading dashboard...
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-eyebrow">
            OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p>
            Manage and monitor Goldenspice
            property listings.
          </p>
        </div>

        <Link
          to="/admin/properties/new"
          className="admin-primary-action"
        >
          <Plus size={18} />
          Add Property
        </Link>
      </div>

      {error && (
        <div
          className="admin-dashboard-error"
          role="alert"
        >
          <div>
            <strong>
              Unable to load dashboard
            </strong>
            <span>{error}</span>
          </div>

          <button
            type="button"
            onClick={loadProperties}
          >
            Try Again
          </button>
        </div>
      )}

      {!error && (
        <>
          <div className="admin-stat-grid">
            <article className="admin-stat-card">
              <div className="admin-stat-icon">
                <Building2 size={22} />
              </div>

              <div>
                <span>Total Properties</span>
                <strong>
                  {statistics.total}
                </strong>
              </div>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-icon">
                <CircleCheck size={22} />
              </div>

              <div>
                <span>Available</span>
                <strong>
                  {statistics.available}
                </strong>
              </div>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-icon">
                <Sparkles size={22} />
              </div>

              <div>
                <span>Featured</span>
                <strong>
                  {statistics.featured}
                </strong>
              </div>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-icon">
                <CircleDollarSign
                  size={22}
                />
              </div>

              <div>
                <span>Sold / Rented</span>
                <strong>
                  {statistics.soldOrRented}
                </strong>
              </div>
            </article>
          </div>

          <div className="admin-dashboard-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Recent Properties</h2>
                <p>
                  Latest property listings in
                  the system.
                </p>
              </div>

              <Link
                to="/admin/properties"
                className="admin-text-link"
              >
                View all properties
              </Link>
            </div>

            {recentProperties.length ===
            0 ? (
              <div className="admin-empty-state">
                <House size={34} />

                <h3>
                  No properties yet
                </h3>

                <p>
                  Add your first property to
                  start managing listings.
                </p>

                <Link
                  to="/admin/properties/new"
                  className="admin-primary-action"
                >
                  <Plus size={18} />
                  Add Property
                </Link>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Listing</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Featured</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentProperties.map(
                      (property) => (
                        <tr key={property.id}>
                          <td>
                            <div className="admin-property-cell">
                              <strong>
                                {property.title}
                              </strong>

                              <span>
                                {property.location}
                              </span>
                            </div>
                          </td>

                          <td>
                            {formatListingType(
                              property.listing_type
                            )}
                          </td>

                          <td>
                            {formatPrice(
                              property
                            )}
                          </td>

                          <td>
                            <span
                              className={`admin-status admin-status-${property.status.toLowerCase()}`}
                            >
                              {formatStatus(
                                property.status
                              )}
                            </span>
                          </td>

                          <td>
                            {property.featured
                              ? "Yes"
                              : "No"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default AdminDashboard;
