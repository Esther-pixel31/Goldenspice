import {
  Edit3,
  Plus,
  Search,
} from "lucide-react";
import {
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
  const price = Number(property.price);

  if (!Number.isFinite(price)) {
    return "—";
  }

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatLabel(value) {
  if (!value) {
    return "—";
  }

  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function AdminProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [search, setSearch] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [listingFilter, setListingFilter] =
    useState("ALL");

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      try {
        const data =
          await getAdminProperties();

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

    loadProperties();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const filteredProperties = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return properties.filter(
      (property) => {
        const matchesSearch =
          !query ||
          property.title
            .toLowerCase()
            .includes(query) ||
          property.location
            .toLowerCase()
            .includes(query) ||
          property.property_type
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "ALL" ||
          property.status === statusFilter;

        const matchesListing =
          listingFilter === "ALL" ||
          property.listing_type ===
            listingFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesListing
        );
      }
    );
  }, [
    properties,
    search,
    statusFilter,
    listingFilter,
  ]);

  return (
    <section className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-eyebrow">
            PROPERTY MANAGEMENT
          </p>

          <h1>Properties</h1>

          <p>
            Search, review and manage
            Goldenspice property listings.
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

      <div className="admin-property-toolbar">
        <div className="admin-property-search">
          <Search
            size={18}
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search properties..."
            aria-label="Search properties"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          aria-label="Filter by status"
        >
          <option value="ALL">
            All statuses
          </option>
          <option value="AVAILABLE">
            Available
          </option>
          <option value="SOLD">
            Sold
          </option>
          <option value="RENTED">
            Rented
          </option>
          <option value="UNAVAILABLE">
            Unavailable
          </option>
        </select>

        <select
          value={listingFilter}
          onChange={(event) =>
            setListingFilter(
              event.target.value
            )
          }
          aria-label="Filter by listing type"
        >
          <option value="ALL">
            Sale & Rent
          </option>
          <option value="FOR_SALE">
            For Sale
          </option>
          <option value="FOR_RENT">
            For Rent
          </option>
        </select>
      </div>

      <div className="admin-dashboard-panel">
        {loading ? (
          <div
            className="admin-loading"
            role="status"
          >
            Loading properties...
          </div>
        ) : error ? (
          <div
            className="admin-properties-message"
            role="alert"
          >
            <strong>
              Unable to load properties
            </strong>
            <span>{error}</span>
          </div>
        ) : filteredProperties.length ===
          0 ? (
          <div className="admin-empty-state">
            <h3>
              No matching properties
            </h3>

            <p>
              Try changing your search or
              filters.
            </p>
          </div>
        ) : (
          <>
            <div className="admin-properties-summary">
              <span>
                Showing{" "}
                <strong>
                  {filteredProperties.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {properties.length}
                </strong>{" "}
                properties
              </span>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table admin-properties-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Listing</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>
                      <span className="sr-only">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProperties.map(
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
                          {property.property_type}
                        </td>

                        <td>
                          {formatLabel(
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
                            {formatLabel(
                              property.status
                            )}
                          </span>
                        </td>

                        <td>
                          {property.featured
                            ? "Yes"
                            : "No"}
                        </td>

                        <td>
                          <Link
                            to={`/admin/properties/${encodeURIComponent(
                              property.slug
                            )}/edit`}
                            className="admin-edit-link"
                          >
                            <Edit3 size={16} />
                            Edit
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AdminProperties;
