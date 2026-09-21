import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Save,
  Upload,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  createAdminProperty,
  getAdminProperty,
  updateAdminProperty,
  uploadAdminPropertyImage,
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
  const location = useLocation();

  const { slug } = useParams();
  const isEditing = Boolean(slug);

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
  const [loading, setLoading] =
    useState(isEditing);

  const [selectedImage, setSelectedImage] =
    useState(null);
  const [imagePreview, setImagePreview] =
    useState("");
  const [uploadingImage, setUploadingImage] =
    useState(false);
  const [imageError, setImageError] =
    useState("");

  useEffect(() => {
    if (!isEditing) {
      return undefined;
    }

    let cancelled = false;

    async function loadProperty() {
      try {
        const property =
          await getAdminProperty(slug);

        if (cancelled) {
          return;
        }

        if (!property) {
          setError("Property not found.");
          return;
        }

        setForm({
          title: property.title || "",
          slug: property.slug || "",
          location: property.location || "",
          property_type:
            property.property_type || "",
          listing_type:
            property.listing_type ||
            "FOR_SALE",
          status:
            property.status || "AVAILABLE",
          price:
            property.price !== null
              ? String(property.price)
              : "",
          bedrooms:
            property.bedrooms !== null
              ? String(property.bedrooms)
              : "",
          bathrooms:
            property.bathrooms !== null
              ? String(property.bathrooms)
              : "",
          size:
            property.size !== null
              ? String(property.size)
              : "",
          description:
            property.description || "",
          image_url:
            property.image_url || "",
          featured:
            Boolean(property.featured),
        });

        setFeatures(
          Array.isArray(property.features)
            ? property.features
            : []
        );

        setSlugEdited(true);
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        if (
          requestError.message ===
          "AUTHENTICATION_REQUIRED"
        ) {
          navigate("/admin/login", {
            replace: true,
            state: {
              from: location.pathname,
              reason: "session-expired",
            },
          });
          return;
        }

        setError(
          requestError.message ||
            "Unable to load property."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProperty();

    return () => {
      cancelled = true;
    };
  }, [
    isEditing,
    slug,
    navigate,
    location.pathname,
  ]);

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

  function handleImageSelection(event) {
    const file = event.target.files?.[0];

    setImageError("");

    if (!file) {
      setSelectedImage(null);
      setImagePreview("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSelectedImage(null);
      setImagePreview("");
      event.target.value = "";

      setImageError(
        "Please choose a JPG, PNG or WebP image."
      );

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setSelectedImage(null);
      setImagePreview("");
      event.target.value = "";

      setImageError(
        "Image must be 5 MB or smaller."
      );

      return;
    }

    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  async function handleImageUpload() {
    if (!selectedImage || uploadingImage) {
      return;
    }

    setUploadingImage(true);
    setImageError("");

    try {
      const result =
        await uploadAdminPropertyImage(
          selectedImage
        );

      updateField(
        "image_url",
        result.image_url
      );

      setSelectedImage(null);
      setImagePreview(result.image_url);
    } catch (requestError) {
      if (
        requestError.message ===
        "AUTHENTICATION_REQUIRED"
      ) {
        navigate("/admin/login", {
          replace: true,
          state: {
            from: location.pathname,
            reason: "session-expired",
          },
        });

        return;
      }

      setImageError(
        requestError.message ||
          "Unable to upload image."
      );
    } finally {
      setUploadingImage(false);
    }
  }

  function validateForm() {
    if (!form.title.trim()) {
      return "Property title is required.";
    }

    if (!form.slug.trim()) {
      return "Property slug is required.";
    }

    if (!form.location.trim()) {
      return "Property location is required.";
    }

    if (!form.property_type.trim()) {
      return "Property type is required.";
    }

    if (form.price === "") {
      return "Property price is required.";
    }

    const price = Number(form.price);

    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      return "Price must be a valid number greater than or equal to 0.";
    }

    if (form.bedrooms !== "") {
      const bedrooms = Number(
        form.bedrooms
      );

      if (
        !Number.isInteger(bedrooms) ||
        bedrooms < 0
      ) {
        return "Bedrooms must be a whole number greater than or equal to 0.";
      }
    }

    if (form.bathrooms !== "") {
      const bathrooms = Number(
        form.bathrooms
      );

      if (
        !Number.isInteger(bathrooms) ||
        bathrooms < 0
      ) {
        return "Bathrooms must be a whole number greater than or equal to 0.";
      }
    }

    if (form.size !== "") {
      const size = Number(form.size);

      if (
        !Number.isFinite(size) ||
        size < 0
      ) {
        return "Size must be a valid number greater than or equal to 0.";
      }
    }

    if (form.image_url.trim()) {
      try {
        const imageUrl = new URL(
          form.image_url.trim()
        );

        if (
          imageUrl.protocol !== "http:" &&
          imageUrl.protocol !== "https:"
        ) {
          return "Image URL must start with http:// or https://.";
        }
      } catch {
        return "Please enter a valid image URL.";
      }
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting || uploadingImage) {
      return;
    }

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

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
      if (isEditing) {
        await updateAdminProperty(
          slug,
          propertyData
        );

        setSuccess(
          "Property updated successfully."
        );
      } else {
        await createAdminProperty(
          propertyData
        );

        setSuccess(
          "Property created successfully."
        );
      }

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
        navigate("/admin/login", {
          replace: true,
          state: {
            from: location.pathname,
            reason: "session-expired",
          },
        });
        return;
      }

      setError(
        requestError.message ||
          (isEditing
            ? "Unable to update property."
            : "Unable to create property.")
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="admin-page">
        <div
          className="admin-loading"
          role="status"
        >
          Loading property...
        </div>
      </section>
    );
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

            <h1>
              {isEditing
                ? "Edit Property"
                : "Add Property"}
            </h1>

            <p>
              {isEditing
                ? "Update this Goldenspice property listing."
                : "Create a new Goldenspice property listing."}
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

            <div className="admin-form-field admin-form-field-wide">
              <span>
                Primary Property Image
              </span>

              {(imagePreview ||
                form.image_url) && (
                <div className="admin-image-preview">
                  <img
                    src={
                      imagePreview ||
                      form.image_url
                    }
                    alt="Property preview"
                  />
                </div>
              )}

              <div className="admin-image-upload">
                <label className="admin-image-picker">
                  <ImagePlus size={18} />

                  <span>Choose Image</span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleImageSelection
                    }
                  />
                </label>

                {selectedImage && (
                  <span className="admin-image-filename">
                    {selectedImage.name}
                  </span>
                )}

                <button
                  type="button"
                  className="admin-image-upload-button"
                  onClick={
                    handleImageUpload
                  }
                  disabled={
                    !selectedImage ||
                    uploadingImage
                  }
                >
                  <Upload size={17} />

                  {uploadingImage
                    ? "Uploading..."
                    : "Upload Image"}
                </button>
              </div>

              <small>
                JPG, PNG or WebP. Maximum
                file size: 5 MB.
              </small>

              {imageError && (
                <p className="admin-field-error">
                  {imageError}
                </p>
              )}

              <label className="admin-image-url-field">
                <span>
                  Or use an external image
                  URL
                </span>

                <input
                  type="url"
                  value={form.image_url}
                  onChange={(event) => {
                    updateField(
                      "image_url",
                      event.target.value
                    );

                    setImagePreview("");
                    setImageError("");
                  }}
                  placeholder="https://..."
                />
              </label>
            </div>

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
              !canSubmit ||
              submitting ||
              uploadingImage
            }
          >
            <Save size={18} />

            {submitting
              ? "Saving..."
              : uploadingImage
                ? "Uploading Image..."
                : isEditing
                  ? "Save Changes"
                  : "Create Property"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminPropertyForm;