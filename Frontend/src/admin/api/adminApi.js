const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

const TOKEN_KEY = "goldenspice_admin_token";
const TOKEN_EXPIRY_KEY = "goldenspice_admin_token_expiry";

export function getAdminToken() {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiresAt = Number(
    sessionStorage.getItem(TOKEN_EXPIRY_KEY)
  );

  if (!token || !expiresAt) {
    clearAdminSession();
    return null;
  }

  if (Date.now() >= expiresAt) {
    clearAdminSession();
    return null;
  }

  return token;
}

export function saveAdminSession({
  access_token,
  expires_in,
}) {
  const expiresAt =
    Date.now() + Number(expires_in) * 1000;

  sessionStorage.setItem(
    TOKEN_KEY,
    access_token
  );

  sessionStorage.setItem(
    TOKEN_EXPIRY_KEY,
    String(expiresAt)
  );
}

export function clearAdminSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
}

async function readError(response) {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") {
      return data.detail;
    }
  } catch {
    // Fall through to the generic message.
  }

  return `Request failed with status ${response.status}.`;
}

export async function loginAdmin(email, password) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  const session = await response.json();

  saveAdminSession(session);

  return session;
}

export async function adminFetch(path, options = {}) {
  const token = getAdminToken();

  if (!token) {
    throw new Error("AUTHENTICATION_REQUIRED");
  }

  const headers = new Headers(
    options.headers || {}
  );

  headers.set(
    "Authorization",
    `Bearer ${token}`
  );

  if (
    options.body &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers,
    }
  );

  if (response.status === 401) {
    clearAdminSession();
    throw new Error("AUTHENTICATION_REQUIRED");
  }

  return response;
}

export async function getAdminProperties() {
  const response = await adminFetch(
    "/api/properties"
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}
export async function getAdminProperty(slug) {
  const response = await adminFetch(
    `/api/properties/${encodeURIComponent(slug)}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function createAdminProperty(propertyData) {
  const response = await adminFetch(
    "/api/properties",
    {
      method: "POST",
      body: JSON.stringify(propertyData),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function updateAdminProperty(
  slug,
  propertyData
) {
  const response = await adminFetch(
    `/api/properties/${encodeURIComponent(slug)}`,
    {
      method: "PATCH",
      body: JSON.stringify(propertyData),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}