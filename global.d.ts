/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/**
 * TypeScript definitions for CloudFlare Worker bindings.
 *
 * @see https://developers.cloudflare.com/workers/
 */

declare const EXAMPLE: string;

declare module "whatwg-fetch";

declare module "__STATIC_CONTENT_MANIFEST" {
  export default typeof string;
}
