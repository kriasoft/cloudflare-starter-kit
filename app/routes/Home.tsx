/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/material";
import { useCurrentUser } from "../state/firebase.js";

export default function Home(): JSX.Element {
  const me = useCurrentUser();

  return (
    <Container sx={{ py: 2 }} maxWidth="sm">
      <Typography sx={{ mb: 2 }} variant="h5">
        Welcome{me ? `, ${me.displayName}` : ""}!
      </Typography>
    </Container>
  );
}
