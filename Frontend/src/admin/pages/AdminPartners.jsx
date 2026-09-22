import {
  Edit3,
  Eye,
  EyeOff,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  deleteAdminPartner,
  getAdminPartners,
  updateAdminPartner,
} from "../api/adminApi.js";


function AdminPartners() {
  const navigate = useNavigate();
  const location = useLocation();

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [busyPartnerId, setBusyPartnerId] =
    useState(null);


  const handleAuthenticationError = useCallback(
    (requestError) => {
      if (
        requestError.message !==
        "AUTHENTICATION_REQUIRED"
      ) {
        return false;
      }

      navigate("/admin/login", {
        replace: true,
        state: {
          from: location.pathname,
          reason: "session-expired",
        },
      });

      return true;
    },
    [navigate, location.pathname]
  );


  const loadPartners = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminPartners();
      setPartners(data);
    } catch (requestError) {
      if (
        handleAuthenticationError(requestError)
      ) {
        return;
      }

      setError(
        requestError.message ||
          "Unable to load partners."
      );
    } finally {
      setLoading(false);
    }
  }, [handleAuthenticationError]);


  useEffect(() => {
    loadPartners();
  }, [loadPartners]);


  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesSearch =
        !query ||
        partner.name
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "VISIBLE" &&
          partner.is_active) ||
        (statusFilter === "HIDDEN" &&
          !partner.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [partners, search, statusFilter]);


  async function handleVisibility(partner) {
    if (busyPartnerId !== null) {
      return;
    }

    setBusyPartnerId(partner.id);
    setError("");

    try {
      const updated =
        await updateAdminPartner(
          partner.id,
          {
            is_active: !partner.is_active,
          }
        );

      setPartners((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );
    } catch (requestError) {
      if (
        handleAuthenticationError(requestError)
      ) {
        return;
      }

      setError(
        requestError.message ||
          "Unable to update partner visibility."
      );
    } finally {
      setBusyPartnerId(null);
    }
  }


  async function handleDelete(partner) {
    if (busyPartnerId !== null) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${partner.name}"?\n\n` +
        "This removes the partner and its " +
        "uploaded logo. This action cannot " +
        "be undone."
    );

    if (!confirmed) {
      return;
    }

    setBusyPartnerId(partner.id);
    setError("");

    try {
      await deleteAdminPartner(partner.id);

      setPartners((current) =>
        current.filter(
          (item) => item.id !== partner.id
        )
      );
    } catch (requestError) {
      if (
        handleAuthenticationError(requestError)
      ) {
        return;
      }

      setError(
        requestError.message ||
          "Unable to delete partner."
      );
    } finally {
      setBusyPartnerId(null);
    }
  }


  return (
    <section className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-eyebrow">
            PARTNER MANAGEMENT
          </p>

          <h1>Partners</h1>

          <p>
            Manage the organizations displayed
            on the Goldenspice Partners page.
          </p>
        </div>

        <Link
          to="/admin/partners/new"
          className="admin-primary-action"
        >
          <Plus size={18} />
          Add Partner
        </Link>
      </div>

      {error && (
        <div
          className="admin-dashboard-error"
          role="alert"
        >
          <div>
            <strong>
              Unable to complete request
            </strong>
            <span>{error}</span>
          </div>

          <button
            type="button"
            onClick={loadPartners}
          >
            Try Again
          </button>
        </div>
      )}

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
            placeholder="Search partners..."
            aria-label="Search partners"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          aria-label="Filter by visibility"
        >
          <option value="ALL">
            All partners
          </option>
          <option value="VISIBLE">
            Visible
          </option>
          <option value="HIDDEN">
            Hidden
          </option>
        </select>
      </div>

      {loading ? (
        <div
          className="admin-loading"
          role="status"
        >
          Loading partners...
        </div>
      ) : partners.length === 0 ? (
        <div className="admin-empty-state">
          <Users size={34} />

          <h3>No partners yet</h3>

          <p>
            Add the first organization to the
            Goldenspice Partners page.
          </p>

          <Link
            to="/admin/partners/new"
            className="admin-primary-action"
          >
            <Plus size={18} />
            Add Partner
          </Link>
        </div>
      ) : (
        <>
          <div className="admin-properties-summary">
            <span>
              Showing{" "}
              <strong>
                {filteredPartners.length}
              </strong>{" "}
              of{" "}
              <strong>{partners.length}</strong>{" "}
              partners
            </span>
          </div>

          {filteredPartners.length === 0 ? (
            <div className="admin-empty-state">
              <Search size={30} />

              <h3>No matching partners</h3>

              <p>
                Try changing your search or
                visibility filter.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table admin-partners-table">
                <thead>
                  <tr>
                    <th>Partner</th>
                    <th>Website</th>
                    <th>Order</th>
                    <th>Visibility</th>
                    <th>
                      <span className="sr-only">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPartners.map(
                    (partner) => {
                      const busy =
                        busyPartnerId ===
                        partner.id;

                      return (
                        <tr key={partner.id}>
                          <td>
                            <div className="admin-partner-cell">
                              <div className="admin-partner-logo">
                                <img
                                  src={
                                    partner.logo_url
                                  }
                                  alt=""
                                />
                              </div>

                              <strong>
                                {partner.name}
                              </strong>
                            </div>
                          </td>

                          <td>
                            {partner.website_url ? (
                              <a
                                href={
                                  partner.website_url
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="admin-text-link"
                              >
                                Visit website
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>

                          <td>
                            {partner.display_order}
                          </td>

                          <td>
                            <span
                              className={
                                partner.is_active
                                  ? "admin-status admin-status-visible"
                                  : "admin-status admin-status-hidden"
                              }
                            >
                              {partner.is_active
                                ? "Visible"
                                : "Hidden"}
                            </span>
                          </td>

                          <td>
                            <div className="admin-partner-actions">
                              <Link
                                to={`/admin/partners/${partner.id}/edit`}
                                className="admin-icon-action"
                                aria-label={`Edit ${partner.name}`}
                                title="Edit"
                              >
                                <Edit3 size={17} />
                              </Link>

                              <button
                                type="button"
                                className="admin-icon-action"
                                onClick={() =>
                                  handleVisibility(
                                    partner
                                  )
                                }
                                disabled={busy}
                                aria-label={
                                  partner.is_active
                                    ? `Hide ${partner.name}`
                                    : `Show ${partner.name}`
                                }
                                title={
                                  partner.is_active
                                    ? "Hide"
                                    : "Show"
                                }
                              >
                                {partner.is_active ? (
                                  <EyeOff size={17} />
                                ) : (
                                  <Eye size={17} />
                                )}
                              </button>

                              <button
                                type="button"
                                className="admin-icon-action admin-icon-action-danger"
                                onClick={() =>
                                  handleDelete(
                                    partner
                                  )
                                }
                                disabled={busy}
                                aria-label={`Delete ${partner.name}`}
                                title="Delete"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}


export default AdminPartners;