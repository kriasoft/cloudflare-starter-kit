import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { useFirebase } from "../state/firebase.js";
import { useCurrentUser } from "../state/user.js";

export function AppToolbar(): JSX.Element {
  const me = useCurrentUser();
  const fb = useFirebase();

  return (
    <AppBar>
      <Toolbar>
        <Typography sx={{ fontSize: "1.5rem" }} variant="h1">
          App Name
        </Typography>

        <Box sx={{ flexGrow: 1 }} component="span" />

        {me === null && (
          <Button color="inherit" onClick={fb?.signIn} children="Sign In" />
        )}

        {me && (
          <Button color="inherit" onClick={fb?.signOut} children="Sign Out" />
        )}
      </Toolbar>
    </AppBar>
  );
}
