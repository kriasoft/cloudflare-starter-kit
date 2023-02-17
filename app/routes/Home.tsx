/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CircularProgress, Container, Typography } from "@mui/material";
import * as React from "react";
import { usePerson } from "../state/example.js";

export default function Home(): JSX.Element {
  return (
    <Container sx={{ py: 2 }} maxWidth="sm">
      <Typography sx={{ mb: 2 }} variant="h5">
        Welcome to Cloudflare Starter Kit!
      </Typography>

      <Typography>
        Fetching <code>/api/people/1</code> (as an example):
      </Typography>

      <React.Suspense
        children={<Person />}
        fallback={<CircularProgress size={16} />}
      />
    </Container>
  );
}

export function Person(): JSX.Element {
  const person = usePerson(1);

  return (
    <pre>
      <code>{person && JSON.stringify(person, null, "  ")}</code>
    </pre>
  );
}
