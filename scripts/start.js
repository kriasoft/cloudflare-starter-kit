/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { execa } from "execa";
import path from "node:path";

await execa("yarn", ["vite"], {
  stdio: "inherit",
  cwd: path.resolve(__dirname, "../app"),
});
