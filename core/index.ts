/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  type DurableObjectId,
  type DurableObjectStorage,
} from "@miniflare/durable-objects";
import { type Env } from "./env.js";

export * from "./env.js";
export * from "./errors.js";
export * from "./transform.js";

declare global {
  // jest-environment-miniflare
  function getMiniflareBindings<Bindings = Env>(): Bindings;
  function getMiniflareDurableObjectStorage(
    id: DurableObjectId
  ): Promise<DurableObjectStorage>;
}
