/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { importPKCS8, importX509, jwtVerify, KeyLike, SignJWT } from "jose";

/**
 * Imports a private key from a Google Cloud credentials file.
 *
 * @param credentials - Google Cloud credentials
 */
export function importKey(credentials: Credentials | string) {
  if (!credentials) {
    throw new Error("Missing argument: credentials");
  }

  if (typeof credentials === "string") {
    credentials = JSON.parse(credentials) as Credentials;
  }

  return importPKCS8(credentials.private_key, "RS256");
}

export async function importCert(credentials: Credentials | string) {
  if (!credentials) {
    throw new Error("Missing argument: credentials");
  }

  if (typeof credentials === "string") {
    credentials = JSON.parse(credentials) as Credentials;
  }

  const res = await fetch(credentials.client_x509_cert_url);

  if (!res.ok) {
    const body = await res.json().catch(() => res.text());
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }

  const certificates: Record<string, string> = await res.json();
  const cert = certificates[credentials.private_key_id];

  if (!cert) {
    throw new Error(`Certificate not found: ${credentials.client_email}`);
  }

  return await importX509(cert, "RS256");
}

export async function verifyIdToken(idToken: string, apiKey: string) {
  if (!apiKey) {
    throw new Error("Missing argument: apiKey");
  }

  if (!idToken) {
    return null;
  }

  // Get user data from Google Identity Platform
  // https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
  const accountsLookupUrl = new URL("https://identitytoolkit.googleapis.com/v1/accounts:lookup"); // prettier-ignore
  accountsLookupUrl.searchParams.set("key", apiKey);
  const res = await fetch(accountsLookupUrl, {
    method: "POST",
    headers: { ["Content-Type"]: "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const message = `${res.status} ${res.statusText}: ${await res.text()}`;
    console.error(message);
    throw new Error(message);
  }

  const data = await res.json<AccountsLookupResponse>();

  return data.users[0];
}

export async function createSessionCookie(user: User | null, key: KeyLike) {
  if (!user) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60 * 24 * 30; // 30 days

  return await new SignJWT({ email: user.email })
    .setIssuer("https://chainfuse.com")
    .setSubject(user.localId)
    .setAudience("https://chainfuse.com")
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .setProtectedHeader({ alg: "RS256" })
    .sign(key);
}

export async function createCustomToken(
  sessionCookie: string,
  credentials: Credentials | string
) {
  if (typeof credentials === "string") {
    credentials = JSON.parse(credentials) as Credentials;
  }

  const [key, cert] = await Promise.all([
    importKey(credentials),
    importCert(credentials),
  ]);

  const { payload: token } = await jwtVerify(sessionCookie, cert, {
    issuer: "https://chainfuse.com",
    audience: "https://chainfuse.com",
  });

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 59; // 59 minutes
  const aud = "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit"; // prettier-ignore

  return await new SignJWT({ uid: token.sub })
    .setIssuer(credentials.client_email)
    .setSubject(credentials.client_email)
    .setAudience(aud)
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .setProtectedHeader({ alg: "RS256" })
    .sign(key);
}

// #region TypeScript declarations

export type Credentials = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
};

export type UserInfo = {
  providerId: string;
  displayName: string;
  photoUrl: string;
  federatedId: string;
  email: string;
  rawId: string;
};

export type User = {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
  providerUserInfo: UserInfo[];
  validSince: string;
  lastLoginAt: string;
  createdAt: string;
  lastRefreshAt: string;
};

export type AccountsLookupResponse = {
  kind: string;
  users: User[];
};

// #endregion
