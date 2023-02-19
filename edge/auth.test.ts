import dotenv from "dotenv";
import { expect, test } from "vitest";
import { importKey } from "./auth.js";

dotenv.config({ path: "../.env" });

test("importKey(GOOGLE_CLOUD_CREDENTIALS)", async () => {
  const key = await importKey(process.env.GOOGLE_CLOUD_CREDENTIALS ?? "");

  expect(key).toEqual(
    expect.objectContaining({
      type: "private",
    })
  );
});
