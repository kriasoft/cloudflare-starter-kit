/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth, useCurrentUser } from "../../state/firebase.js";

export function AppToolbar(): JSX.Element {
  const me = useCurrentUser();
  const auth = useAuth();

  return (
    <AppBar>
      <Toolbar>
        <Typography sx={{ fontSize: "1.5rem" }} variant="h1">
          App Name
        </Typography>

        <Box sx={{ flexGrow: 1 }} component="span" />

        {me === null && (
          <Button color="inherit" onClick={auth.signIn} children="Sign In" />
        )}

        {me && (
          <Button color="inherit" onClick={auth.signOut} children="Sign Out" />
        )}
      </Toolbar>
    </AppBar>
  );
}
