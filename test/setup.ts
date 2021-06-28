/* SPDX-FileCopyrightText: 2020-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { jest } from "@jest/globals";
import { Headers, Request, Response } from "whatwg-fetch";

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
globalThis.addEventListener = jest.fn(() => {});
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;
