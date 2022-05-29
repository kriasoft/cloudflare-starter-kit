/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { str2ab } from "./encoding.js";
import { Env } from "./env.js";

const cache = new Map<symbol, CryptoKey>();

/**
 * Returns a `CryptoKey` object that you can use in the `Web Crypto API`.
 * https://developer.mozilla.org/docs/Web/API/SubtleCrypto
 *
 * @example
 *   const key = await getCryptoKey(env, "sign");
 */
async function getCryptoKey(env: Env, ...usages: Usage[]): Promise<CryptoKey> {
  const key = Symbol.for(usages.join(","));
  let cryptoKey = cache.get(key);

  if (!cryptoKey) {
    const credentialsJson = atob(env.GOOGLE_CLOUD_CREDENTIALS);
    const credentials = JSON.parse(credentialsJson) as Credentials;
    const keyBase64 = credentials.private_key
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\n/g, "");
    const keyData = str2ab(atob(keyBase64));
    cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      keyData,
      { name: "RSASSA-PKCS1-V1_5", hash: { name: "SHA-256" } },
      false,
      usages
    );

    cache.set(key, cryptoKey);
  }

  return cryptoKey;
}

interface Credentials {
  client_email: string;
  private_key: string;
}

type Usage =
  | "encrypt"
  | "decrypt"
  | "sign"
  | "verify"
  | "deriveKey"
  | "deriveBits"
  | "wrapKey"
  | "unwrapKey";

export { getCryptoKey };
