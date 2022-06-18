/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

declare type Env = {
  APP_ENV: "local" | "test" | "prod";
  APP_NAME: string;
  APP_HOSTNAME: string;
  GOOGLE_CLOUD_CREDENTIALS: string;
  __STATIC_CONTENT: Record<string, string>;
};

declare function getMiniflareBindings<Bindings = Env>(): Bindings;
