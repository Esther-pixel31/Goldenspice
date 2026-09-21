import { useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LockKeyhole,
  Mail,
} from "lucide-react";

import logo from "../../assets/admin-logo.png";
import {
  getAdminToken,
  loginAdmin,
} from "../api/adminApi.js";

import "../admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionExpired =
    location.state?.reason ===
    "session-expired";

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  if (getAdminToken()) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError(
        "Enter your email address and password."
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await loginAdmin(
        normalizedEmail,
        password
      );

      const destination =
        location.state?.from || "/admin";

      navigate(destination, {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to sign in."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section
        className="admin-login-card"
        aria-labelledby="admin-login-title"
      >
        <div className="admin-login-brand">
          <img
            src={logo}
            alt="Goldenspice"
            className="admin-login-logo"
          />

          <p>Property Administration</p>
        </div>

        <div className="admin-login-heading">
          <h1 id="admin-login-title">
            Admin Login
          </h1>

          <p>
            Sign in to manage Goldenspice
            property listings.
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          {sessionExpired && !error && (
            <div
              className="admin-login-message"
              role="status"
            >
              Your session expired. Sign in
              again to continue.
            </div>
          )}

          {error && (
            <div
              className="admin-login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <label className="admin-field">
            <span>Email address</span>

            <div className="admin-input-wrap">
              <Mail
                size={19}
                aria-hidden="true"
              />

              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@example.com"
                disabled={isSubmitting}
                required
              />
            </div>
          </label>

          <label className="admin-field">
            <span>Password</span>

            <div className="admin-input-wrap">
              <LockKeyhole
                size={19}
                aria-hidden="true"
              />

              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                disabled={isSubmitting}
                required
              />
            </div>
          </label>

          <button
            className="admin-login-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <p className="admin-login-footer">
          Authorized Goldenspice administrators
          only.
        </p>
      </section>
    </main>
  );
}

export default AdminLogin;