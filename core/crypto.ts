/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/* @ts-expect-error TODO: Fix types resolution for this module */
import { base64, base64url } from "rfc4648";
import { Env } from "./env.js";

const cache = new Map<
  symbol,
  CryptoKey | Credentials | AccessToken | IdToken
>();

/**
 * Decodes a base64 encoded JSON key into an object memoizing the return value.
 * https://cloud.google.com/iam/docs/creating-managing-service-account-keys
 */
function decodeCredentials(value: string): Credentials {
  const key = Symbol.for(`credentials:${value}`);
  let credentials = cache.get(key) as Credentials | undefined;

  if (!credentials) {
    credentials = JSON.parse(self.atob(value)) as Credentials;
    const keyBase64 = (credentials.private_key as unknown as string)
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\n/g, "");
    credentials.private_key = base64.parse(keyBase64);
    cache.set(key, credentials);
  }

  return credentials;
}

/**
 * Returns a `CryptoKey` object that you can use in the `Web Crypto API`.
 * https://developer.mozilla.org/docs/Web/API/SubtleCrypto
 *
 * @example
 *   const credentials = decodeCredentials(env.GOOGLE_CLOUD_CREDENTIALS);
 *   const signKey = await importKey(credentials, ["sign"]);
 */
async function importKey(
  credentials: Credentials,
  usages: Usage[]
): Promise<CryptoKey> {
  const key = Symbol.for(`cryptoKey:${usages.sort().join(",")}`);
  let cryptoKey = cache.get(key) as CryptoKey | undefined;

  if (!cryptoKey) {
    cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      credentials.private_key,
      { name: "RSASSA-PKCS1-V1_5", hash: "SHA-256" },
      false,
      usages
    );

    cache.set(key, cryptoKey);
  }

  return cryptoKey;
}

async function sign(credentials: Credentials, data: string): Promise<string> {
  const dataArray = new TextEncoder().encode(data);
  const key = await importKey(credentials, ["sign"]);
  const buff = await self.crypto.subtle.sign(key.algorithm, key, dataArray);
  return base64url.stringify(new Uint8Array(buff), { pad: false });
}

/**
 * Retrieves an authentication token from OAuth 2.0 authorization server.
 * https://developers.google.com/identity/protocols/oauth2/service-account
 *
 * @example
 *   const scope = "https://www.googleapis.com/auth/cloud-platform";
 *   const token = await getAuthToken(env, scope);
 *   const headers = { Authorization: `Bearer ${token.accessToken}` };
 *   const res = await fetch(url, { headers });
 */
async function getAuthToken<T extends AccessToken | IdToken = AccessToken>(
  env: Env,
  scope: string | string[]
): Promise<T> {
  const credentials = decodeCredentials(env.GOOGLE_CLOUD_CREDENTIALS);
  const scopes = Array.isArray(scope) ? scope.join(",") : scope;
  const cacheKey = Symbol.for(`token:${credentials.private_key_id}:${scopes}`);
  const issued = Math.floor(Date.now() / 1000);
  let authToken = cache.get(cacheKey) as T | undefined;

  if (!authToken || authToken.expires < issued - 10) {
    const expires = issued + 3600; // Max 1 hour
    const claims = self
      .btoa(
        JSON.stringify({
          iss: credentials.client_email,
          scope: scopes,
          aud: credentials.token_uri,
          exp: expires,
          iat: issued,
        })
      )
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const header = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9`; // {"alg":"RS256","typ":"JWT"}
    const payload = `${header}.${claims}`;
    const signature = await sign(credentials, payload);

    const body = new FormData();
    body.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
    body.append("assertion", `${payload}.${signature}`);

    const res = await fetch(credentials.token_uri, { method: "POST", body });

    if (res.status !== 200) {
      const data = await res.json<{ error_description: string }>();
      throw new Error(data.error_description);
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const data = await res.json<any>();
    authToken = data.access_token
      ? ({
          accessToken: data.access_token.replace(/\.+$/, ""),
          type: data.token_type,
          expires,
        } as T)
      : ({
          idToken: data.id_token.replace(/\.+$/, ""),
          audience: scope,
          expires,
        } as T);

    cache.set(cacheKey, authToken);
  }

  return authToken;
}

interface Credentials {
  client_email: string;
  private_key: ArrayBuffer;
  private_key_id: string;
  token_uri: string;
}

type AccessToken = {
  accessToken: string;
  type: string;
  expires: number;
};

type IdToken = {
  idToken: string;
  audience: string;
  expires: number;
};

type Usage =
  | "encrypt"
  | "decrypt"
  | "sign"
  | "verify"
  | "deriveKey"
  | "deriveBits"
  | "wrapKey"
  | "unwrapKey";

export {
  decodeCredentials,
  getAuthToken,
  importKey,
  sign,
  AccessToken,
  IdToken,
};
