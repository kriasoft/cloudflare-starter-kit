/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const environments = [
  { name: "local", description: "development" },
  { name: "test", description: "staging/QA" },
  { name: "prod", description: "production" },
];

// Create environment variable override files
// such as `env/.prod.override.env`.
for (const env of environments) {
  const filename = join(__dirname, `../env/.${env.name}.override.env`);

  if (!existsSync(filename)) {
    await writeFile(
      filename,
      [
        `# Overrides for the "${env.name}" (${env.description}) environment`,
        `# CLOUDFLARE_API_TOKEN=xxxxx`,
        `# GOOGLE_CLOUD_CREDENTIALS=xxxxx`,
        ``,
      ].join(EOL),
      "utf-8"
    );
  }
}
