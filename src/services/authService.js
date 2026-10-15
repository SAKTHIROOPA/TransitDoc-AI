/**
 * Simulated Authentication Service
 * Implements fake JWT generation, base64 encoding/decoding, and token validation
 */

const DEMO_USER = {
  email: "admin@transitdoc.ai",
  password: "admin123",
  name: "Er. R. Krishnan",
  role: "Administrator",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  designation: "Chief Mechanical Engineer (CME), TNSTC Operations"
};

/**
 * Base64 URL safe encoding
 */
function base64UrlEncode(obj) {
  const json = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Base64 URL safe decoding
 */
function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const json = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(json);
}

/**
 * Simulates login with credentials check and JWT generation
 */
export async function loginUser(email, password) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600; // 1 hour validity

    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    const payload = {
      sub: DEMO_USER.email,
      name: DEMO_USER.name,
      role: DEMO_USER.role,
      designation: DEMO_USER.designation,
      depot: "State Headquarters (Chennai)",
      iat: now,
      exp: exp,
      jti: "jwt-" + Math.random().toString(36).substring(2, 10)
    };

    const headerB64 = base64UrlEncode(header);
    const payloadB64 = base64UrlEncode(payload);
    // Simulated cryptographic HMAC signature
    const signatureB64 = btoa("transitdoc-secret-hmac-sha256-verified-key")
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const token = `${headerB64}.${payloadB64}.${signatureB64}`;

    return {
      success: true,
      token,
      user: {
        email: DEMO_USER.email,
        name: DEMO_USER.name,
        role: DEMO_USER.role,
        designation: DEMO_USER.designation,
        avatar: DEMO_USER.avatar
      }
    };
  } else {
    throw new Error("Invalid email or password. Please use the demo credentials.");
  }
}

/**
 * Decodes the JWT token for live session inspection
 */
export function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = base64UrlDecode(parts[0]);
    const payload = base64UrlDecode(parts[1]);
    const signature = parts[2];

    const isExpired = payload.exp ? (Date.now() / 1000) > payload.exp : false;

    return {
      rawToken: token,
      header,
      payload,
      signature,
      isExpired,
      expiresAt: new Date(payload.exp * 1000).toLocaleString()
    };
  } catch (err) {
    console.error("JWT decoding error:", err);
    return null;
  }
}

export { DEMO_USER };
