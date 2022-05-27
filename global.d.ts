/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

declare type Env = {
  APP_ENV: "dev" | "test" | "prod";
  __STATIC_CONTENT: Record<string, string>;
};

declare module "__STATIC_CONTENT_MANIFEST" {
  export default typeof string;
}

declare module "whatwg-fetch";
