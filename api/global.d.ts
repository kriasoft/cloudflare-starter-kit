/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

declare type Bindings = {
  APP_ENV: "local" | "test" | "prod";
  APP_NAME: string;
  APP_HOSTNAME: string;
  GOOGLE_CLOUD_CREDENTIALS: string;
  __STATIC_CONTENT: Record<string, string>;
};

declare type Env = {
  Bindings: Bindings;
};

declare function getMiniflareBindings<T = Bindings>(): T;
