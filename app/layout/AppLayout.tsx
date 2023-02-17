/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Toolbar } from "@mui/material";
import * as React from "react";
import { useOutlet } from "react-router-dom";
import { AppToolbar } from "./components/AppToolbar.js";

export function AppLayout(): JSX.Element {
  const outlet = useOutlet();

  return (
    <React.Fragment>
      <AppToolbar />
      <Toolbar />

      <React.Suspense>{outlet}</React.Suspense>
    </React.Fragment>
  );
}
