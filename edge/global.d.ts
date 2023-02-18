/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

declare module "__STATIC_CONTENT_MANIFEST" {
  const JSON: string;
  export default JSON;
}

declare type Bindings = {
  APP_ENV: "local" | "test" | "prod";
  APP_NAME: string;
  APP_HOSTNAME: string;
  __STATIC_CONTENT: KVNamespace;
};

declare type Env = {
  Bindings: Bindings;
};

declare const bindings: Bindings;

declare function getMiniflareBindings<T = Bindings>(): T;
