/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssBaseline, Toolbar } from "@mui/material";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../routes/Home.js";
import { AppToolbar } from "./Toolbar.js";

export function App(): JSX.Element {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppToolbar />
      <Toolbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}
