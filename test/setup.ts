/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { jest } from "@jest/globals";
import { Headers, Request, Response } from "whatwg-fetch";

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
globalThis.addEventListener = jest.fn(() => {});

Object.defineProperty(globalThis, "Headers", {
  value: Headers,
});

Object.defineProperty(globalThis, "Request", {
  value: Request,
});

Object.defineProperty(globalThis, "Response", {
  value: Response,
});
