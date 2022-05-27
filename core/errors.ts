/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

export function handleError<Env = unknown>(
  handler: ExportedHandlerFetchHandler<Env>
): ExportedHandlerFetchHandler<Env> {
  return async function (req, res, ctx) {
    try {
      return await handler(req, res, ctx);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Application error";
      return new Response(message, { status: 500 });
    }
  };
}
