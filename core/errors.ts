/* SPDX-FileCopyrightText: 2020-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, Error.prototype);
  }
}
