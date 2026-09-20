import {
  ArrowLeft,
  Plus,
  Save,
  X,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  createAdminProperty,
} from "../api/adminApi.js";

const INITIAL_FORM = {
  title: "",
  slug: "",
  location: "",
  property_type: "",
  listing_type: "FOR_SALE",
  status: "AVAILABLE",
  price: "",
  bedrooms: "",
  bathrooms: "",
  size: "",
  description: "",
  image_url: "",
  featured: false,
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function AdminPropertyForm() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState(INITIAL_FORM);
  const [features, setFeatures] =
    useState([]);
  const [featureInput, setFeatureInput] =
    useState("");
  const [slugEdited, setSlugEdited] =
    useState(false);
  const [error, setError] =
    useState("");
  const [success, setSuccess] =
    useState("");
  const [submitting, setSubmitting] =
    useState(false);

  const canSubmit = useMemo(() => {
    return Boolean(
      form.title.trim() &&
      form.slug.trim() &&
      form.location.trim() &&
      form.property_type.trim() &&
      form.price !== ""
    );
  }, [form]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleTitleChange(event) {
    const title = event.target.value;

    setForm((current) => ({
      ...current,
      title,
      slug: slugEdited
        ? current.slug
        : createSlug(title),
    }));
  }

  function handleSlugChange(event) {
    setSlugEdited(true);

    updateField(
      "slug",
      createSlug(event.target.value)
    );
  }

  function addFeature() {
    const feature = featureInput.trim();

    if (!feature) {
      return;
    }

    const exists = features.some(
      (item) =>
        item.toLowerCase() ===
        feature.toLowerCase()
    );

    if (!exists) {
      setFeatures((current) => [
        ...current,
        feature,
      ]);
    }

    setFeatureInput("");
  }

  function handleFeatureKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addFeature();
    }
  }

  function removeFeature(feature) {
    setFeatures((current) =>
      current.filter(
        (item) => item !== feature
      )
    );
  }

  function optionalNumber(value) {
    if (value === "") {
      return null;
    }

    return Number(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit || submitting) {
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    const propertyData = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      location: form.location.trim(),
      property_type:
        form.property_type.trim(),
      listing_type: form.listing_type,
      status: form.status,
      price: Number(form.price),
      bedrooms: optionalNumber(
        form.bedrooms
      ),
      bathrooms: optionalNumber(
        form.bathrooms
      ),
      size: optionalNumber(form.size),
      description:
        form.description.trim() || null,
      features,
      image_url:
        form.image_url.trim() || null,
      featured: form.featured,
    };

    try {
      await createAdminProperty(
        propertyData
      );

      setSuccess(
        "Property created successfully."
      );

      window.setTimeout(() => {
        navigate("/admin/properties", {
          replace: true,
        });
      }, 700);
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
          "Unable to create property."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="admin-page">
      <div className="admin-form-page-heading">
        <Link
          to="/admin/properties"
          className="admin-back-link"
        >
          <ArrowLeft size={17} />
          Back to Properties
        </Link>

        <div className="admin-page-heading">
          <div>
            <p className="admin-page-eyebrow">
              PROPERTY MANAGEMENT
            </p>

            <h1>Add Property</h1>

            <p>
              Create a new Goldenspice
              property listing.
            </p>
          </div>
        </div>
      </div>

      <form
        className="admin-property-form"
        onSubmit={handleSubmit}
      >
        {error && (
          <div
            className="admin-form-alert admin-form-alert-error"
            role="alert"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="admin-form-alert admin-form-alert-success"
            role="status"
          >
            {success}
          </div>
        )}

        <section className="admin-form-section">
          <div className="admin-form-section-heading">
            <h2>Basic Information</h2>
            <p>
              Main information displayed on
              the property listing.
            </p>
          </div>

          <div className="admin-form-grid">
            <label className="admin-form-field admin-form-field-wide">
              <span>
                Property Title
                <b>*</b>
              </span>

              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. Four Bedroom House"
                maxLength={255}
                required
              />
            </label>

            <label className="admin-form-field">
              <span>
                Slug
                <b>*</b>
              </span>

              <input
                type="text"
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="four-bedroom-house"
                maxLength={255}
                required
              />

              <small>
                Used in the property's web
                address.
              </small>
            </label>

            <label className="admin-form-field">
              <span>
                Location
                <b>*</b>
              </span>

              <input
                type="text"
                value={form.location}
                onChange={(event) =>
                  updateField(
                    "location",
                    event.target.value
                  )
                }
                placeholder="e.g. Karen, Nairobi"
                maxLength={255}
                required
              />
            </label>

            <label className="admin-form-field">
              <span>
                Property Type
                <b>*</b>
              </span>

              <input
                type="text"
                value={form.property_type}
                onChange={(event) =>
                  updateField(
                    "property_type",
                    event.target.value
                  )
                }
                placeholder="e.g. House, Apartment"
                maxLength={100}
                required
              />
            </label>

            <label className="admin-form-field">
              <span>
                Listing Type
                <b>*</b>
              </span>

              <select
                value={form.listing_type}
                onChange={(event) =>
                  updateField(
                    "listing_type",
                    event.target.value
                  )
                }
              >
                <option value="FOR_SALE">
                  For Sale
                </option>
                <option value="FOR_RENT">
                  For Rent
                </option>
              </select>
            </label>

            <label className="admin-form-field">
              <span>
                Status
                <b>*</b>
              </span>

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value
                  )
                }
              >
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
            </label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="admin-form-section-heading">
            <h2>Property Details</h2>
            <p>
              Pricing and physical property
              information.
            </p>
          </div>

          <div className="admin-form-grid">
            <label className="admin-form-field">
              <span>
                Price (KES)
                <b>*</b>
              </span>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) =>
                  updateField(
                    "price",
                    event.target.value
                  )
                }
                placeholder="0"
                required
              />
            </label>

            <label className="admin-form-field">
              <span>Size</span>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.size}
                onChange={(event) =>
                  updateField(
                    "size",
                    event.target.value
                  )
                }
                placeholder="Optional"
              />
            </label>

            <label className="admin-form-field">
              <span>Bedrooms</span>

              <input
                type="number"
                min="0"
                step="1"
                value={form.bedrooms}
                onChange={(event) =>
                  updateField(
                    "bedrooms",
                    event.target.value
                  )
                }
                placeholder="Optional"
              />
            </label>

            <label className="admin-form-field">
              <span>Bathrooms</span>

              <input
                type="number"
                min="0"
                step="1"
                value={form.bathrooms}
                onChange={(event) =>
                  updateField(
                    "bathrooms",
                    event.target.value
                  )
                }
                placeholder="Optional"
              />
            </label>

            <label className="admin-form-field admin-form-field-wide">
              <span>Description</span>

              <textarea
                rows="6"
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Describe the property..."
              />
            </label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="admin-form-section-heading">
            <h2>Features & Media</h2>
            <p>
              Add property features and its
              primary image.
            </p>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field admin-form-field-wide">
              <span>Features</span>

              <div className="admin-feature-entry">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(event) =>
                    setFeatureInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleFeatureKeyDown
                  }
                  placeholder="e.g. Swimming Pool"
                />

                <button
                  type="button"
                  onClick={addFeature}
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>

              {features.length > 0 && (
                <div className="admin-feature-list">
                  {features.map(
                    (feature) => (
                      <span key={feature}>
                        {feature}

                        <button
                          type="button"
                          onClick={() =>
                            removeFeature(
                              feature
                            )
                          }
                          aria-label={`Remove ${feature}`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )
                  )}
                </div>
              )}
            </div>

            <label className="admin-form-field admin-form-field-wide">
              <span>Image URL</span>

              <input
                type="url"
                value={form.image_url}
                onChange={(event) =>
                  updateField(
                    "image_url",
                    event.target.value
                  )
                }
                placeholder="https://..."
              />

              <small>
                Direct image uploads will be
                handled separately.
              </small>
            </label>

            <label className="admin-featured-toggle admin-form-field-wide">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target.checked
                  )
                }
              />

              <span>
                <strong>
                  Featured Property
                </strong>

                <small>
                  Highlight this property on
                  the public website.
                </small>
              </span>
            </label>
          </div>
        </section>

        <div className="admin-form-actions">
          <Link
            to="/admin/properties"
            className="admin-secondary-action"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-save-button"
            disabled={
              !canSubmit || submitting
            }
          >
            <Save size={18} />

            {submitting
              ? "Saving..."
              : "Create Property"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminPropertyForm;
