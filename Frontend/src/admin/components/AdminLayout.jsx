import {
  Building2,
  Handshake,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  clearAdminSession,
} from "../api/adminApi.js";

function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] =
    useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    clearAdminSession();

    navigate("/admin/login", {
      replace: true,
    });
  }

  return (
    <div className="admin-shell">
      <aside
        className={
          menuOpen
            ? "admin-sidebar admin-sidebar-open"
            : "admin-sidebar"
        }
      >
        <div className="admin-sidebar-header">
          <div>
            <span className="admin-sidebar-brand">
              GOLDENSPICE
            </span>
            <span className="admin-sidebar-subtitle">
              ADMIN
            </span>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={closeMenu}
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>

        <nav
          className="admin-nav"
          aria-label="Admin navigation"
        >
          <NavLink
            to="/admin"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/properties"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Building2 size={19} />
            <span>Properties</span>
          </NavLink>

          <NavLink
            to="/admin/partners"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Handshake size={19} />
            <span>Partners</span>
          </NavLink>

          <NavLink
            to="/admin/properties/new"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Plus size={19} />
            <span>Add Property</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={closeMenu}
          aria-label="Close navigation"
        />
      )}

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-button"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open navigation"
          >
            <Menu size={23} />
          </button>

          <div className="admin-topbar-title">
            <strong>Goldenspice Admin</strong>
            <span>Administration</span>
          </div>

          <button
            type="button"
            className="admin-topbar-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Log Out</span>
          </button>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
