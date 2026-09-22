import {
  ArrowLeft,
  ImagePlus,
  Save,
  Upload,
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
  createAdminPartner,
  getAdminPartners,
  updateAdminPartner,
  uploadAdminPartnerLogo,
} from "../api/adminApi.js";


const INITIAL_FORM = {
  name: "",
  website_url: "",
  logo_url: "",
  is_active: true,
  display_order: "0",
};


function AdminPartnerForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { partnerId } = useParams();

  const isEditing = Boolean(partnerId);

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [loading, setLoading] =
    useState(isEditing);
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedLogo, setSelectedLogo] =
    useState(null);
  const [logoPreview, setLogoPreview] =
    useState("");
  const [uploadingLogo, setUploadingLogo] =
    useState(false);
  const [logoError, setLogoError] =
    useState("");


  useEffect(() => {
    if (!isEditing) {
      return undefined;
    }

    let cancelled = false;

    async function loadPartner() {
      try {
        const partners =
          await getAdminPartners();

        if (cancelled) {
          return;
        }

        const partner = partners.find(
          (item) =>
            String(item.id) ===
            String(partnerId)
        );

        if (!partner) {
          setError("Partner not found.");
          return;
        }

        setForm({
          name: partner.name || "",
          website_url:
            partner.website_url || "",
          logo_url: partner.logo_url || "",
          is_active: Boolean(
            partner.is_active
          ),
          display_order: String(
            partner.display_order ?? 0
          ),
        });

        setLogoPreview(
          partner.logo_url || ""
        );
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
            "Unable to load partner."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPartner();

    return () => {
      cancelled = true;
    };
  }, [
    isEditing,
    partnerId,
    navigate,
    location.pathname,
  ]);


  const canSubmit = useMemo(() => {
    return Boolean(
      form.name.trim() &&
      form.logo_url.trim() &&
      form.display_order !== ""
    );
  }, [form]);


  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }


  function handleLogoSelection(event) {
    const file = event.target.files?.[0];

    setLogoError("");

    if (!file) {
      setSelectedLogo(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSelectedLogo(null);
      event.target.value = "";

      setLogoError(
        "Please choose a JPG, PNG or WebP image."
      );

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setSelectedLogo(null);
      event.target.value = "";

      setLogoError(
        "Logo must be 5 MB or smaller."
      );

      return;
    }

    setSelectedLogo(file);

    setLogoPreview(
      URL.createObjectURL(file)
    );
  }


  async function handleLogoUpload() {
    if (!selectedLogo || uploadingLogo) {
      return;
    }

    setUploadingLogo(true);
    setLogoError("");

    try {
      const result =
        await uploadAdminPartnerLogo(
          selectedLogo
        );

      updateField(
        "logo_url",
        result.image_url
      );

      setSelectedLogo(null);
      setLogoPreview(result.image_url);
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

      setLogoError(
        requestError.message ||
          "Unable to upload logo."
      );
    } finally {
      setUploadingLogo(false);
    }
  }


  function validateForm() {
    if (!form.name.trim()) {
      return "Partner name is required.";
    }

    if (!form.logo_url.trim()) {
      return "Please upload a partner logo.";
    }

    const displayOrder = Number(
      form.display_order
    );

    if (
      !Number.isInteger(displayOrder) ||
      displayOrder < 0
    ) {
      return (
        "Display order must be a whole " +
        "number greater than or equal to 0."
      );
    }

    if (form.website_url.trim()) {
      try {
        const website = new URL(
          form.website_url.trim()
        );

        if (
          website.protocol !== "http:" &&
          website.protocol !== "https:"
        ) {
          return (
            "Website URL must begin with " +
            "http:// or https://."
          );
        }
      } catch {
        return "Please enter a valid website URL.";
      }
    }

    return "";
  }


  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting || uploadingLogo) {
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name.trim(),
      website_url:
        form.website_url.trim() || null,
      logo_url: form.logo_url.trim(),
      is_active: form.is_active,
      display_order: Number(
        form.display_order
      ),
    };

    try {
      if (isEditing) {
        await updateAdminPartner(
          partnerId,
          payload
        );

        setSuccess(
          "Partner updated successfully."
        );
      } else {
        await createAdminPartner(payload);

        navigate("/admin/partners", {
          replace: true,
        });

        return;
      }
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
          "Unable to save partner."
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
          Loading partner...
        </div>
      </section>
    );
  }


  return (
    <section className="admin-page">
      <div className="admin-form-page-heading">
        <Link
          to="/admin/partners"
          className="admin-back-link"
        >
          <ArrowLeft size={17} />
          Back to Partners
        </Link>

        <div className="admin-page-heading">
          <div>
            <p className="admin-page-eyebrow">
              PARTNER MANAGEMENT
            </p>

            <h1>
              {isEditing
                ? "Edit Partner"
                : "Add Partner"}
            </h1>

            <p>
              {isEditing
                ? "Update this partner's details, logo and visibility."
                : "Add an organization to the Goldenspice Partners page."}
            </p>
          </div>
        </div>
      </div>

      <form
        className="admin-property-form"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="admin-form-alert admin-form-alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="admin-form-alert admin-form-alert-success">
            {success}
          </div>
        )}

        <section className="admin-form-section">
          <div className="admin-form-section-heading">
            <h2>Partner details</h2>
            <p>
              Enter the organization's basic
              information.
            </p>
          </div>

          <div className="admin-form-grid">
            <label className="admin-form-field">
              <span>
                Partner name <b>*</b>
              </span>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  updateField(
                    "name",
                    event.target.value
                  )
                }
                placeholder="Partner name"
                maxLength={255}
                required
              />
            </label>

            <label className="admin-form-field">
              <span>Website</span>

              <input
                type="url"
                value={form.website_url}
                onChange={(event) =>
                  updateField(
                    "website_url",
                    event.target.value
                  )
                }
                placeholder="https://example.com"
              />

              <small>
                Optional. Link visitors to the
                partner's website.
              </small>
            </label>

            <label className="admin-form-field">
              <span>
                Display order <b>*</b>
              </span>

              <input
                type="number"
                min="0"
                step="1"
                value={form.display_order}
                onChange={(event) =>
                  updateField(
                    "display_order",
                    event.target.value
                  )
                }
                required
              />

              <small>
                Lower numbers appear first.
              </small>
            </label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="admin-form-section-heading">
            <h2>Partner logo</h2>
            <p>
              Upload a JPG, PNG or WebP logo,
              up to 5 MB.
            </p>
          </div>

          {logoPreview ? (
            <div className="admin-partner-logo-preview">
              <img
                src={logoPreview}
                alt="Partner logo preview"
              />
            </div>
          ) : (
            <div className="admin-partner-logo-placeholder">
              <ImagePlus size={30} />
              <span>No logo uploaded</span>
            </div>
          )}

          <div className="admin-image-upload">
            <label className="admin-image-picker">
              <ImagePlus size={18} />

              <span>
                {selectedLogo
                  ? "Choose another logo"
                  : "Choose logo"}
              </span>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={
                  handleLogoSelection
                }
              />
            </label>

            {selectedLogo && (
              <>
                <span className="admin-image-filename">
                  {selectedLogo.name}
                </span>

                <button
                  type="button"
                  className="admin-image-upload-button"
                  onClick={handleLogoUpload}
                  disabled={uploadingLogo}
                >
                  <Upload size={17} />

                  {uploadingLogo
                    ? "Uploading..."
                    : "Upload Logo"}
                </button>
              </>
            )}
          </div>

          {logoError && (
            <p className="admin-field-error">
              {logoError}
            </p>
          )}
        </section>

        <section className="admin-form-section">
          <div className="admin-form-section-heading">
            <h2>Visibility</h2>

            <p>
              Control whether this organization
              appears on the public Partners
              page.
            </p>
          </div>

          <label className="admin-featured-toggle">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) =>
                updateField(
                  "is_active",
                  event.target.checked
                )
              }
            />

            <span>
              <strong>
                Show on Partners page
              </strong>

              <small>
                Turn this off to temporarily
                hide the partner without
                deleting it.
              </small>
            </span>
          </label>
        </section>

        <div className="admin-form-actions">
          <Link
            to="/admin/partners"
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
              uploadingLogo
            }
          >
            <Save size={18} />

            {submitting
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Add Partner"}
          </button>
        </div>
      </form>
    </section>
  );
}


export default AdminPartnerForm;