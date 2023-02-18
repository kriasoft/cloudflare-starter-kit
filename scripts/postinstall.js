/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create `.env` file from the template
const filename = join(__dirname, `../.env`);

if (!existsSync(filename)) {
  await writeFile(
    filename,
    [
      "# Environment variables",
      "#",
      "# CLOUDFLARE_API_TOKEN=xxxxx",
      "# GOOGLE_CLOUD_CREDENTIALS=xxxxx",
      "",
    ].join(EOL),
    "utf-8"
  );
}
